import { db } from "firebaseClient";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore/lite";

function Home() {
    const [tweet, setTweet] = useState("");
    const ref = collection(db, "tweet");

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(ref, {
                tweet,
                createdAt: Date.now(),
            });
            alert("트위터 생성 완료");
            setTweet("");
        } catch (e) {
            alert("트위터 생성중 에러 발생: ", e.message);
        }
    };

    const onChange = (e) => {
        const value = e.target.value;
        setTweet(value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="현재 무슨 생각을 하고 계신가요?"
                    value={tweet}
                    maxLength={120}
                ></input>
                <input
                    type="submit"
                    value="
                    트위터 생성"
                ></input>
            </form>
        </div>
    );
}

export default Home;
