import { db } from "firebaseClient";
import React, { useEffect, useState } from "react";
import { collection, addDoc, query, getDocs } from "firebase/firestore";

const tweetCollectionRef = collection(db, "tweet");

function Home() {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        const getTweets = async () => {
            let nextTweets = [];
            try {
                const q = query(tweetCollectionRef);
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    nextTweets = [
                        {
                            ...doc.data(),
                            id: doc.id,
                        },
                        ...nextTweets,
                    ];
                });
                setTweets(nextTweets);
            } catch (e) {
                console.error(e);
                alert("네트워크 에러");
            }
        };

        getTweets();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(tweetCollectionRef, {
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
            <div>
                {tweets.map((aTweet) => (
                    <h4>{aTweet.tweet}</h4>
                ))}
            </div>
        </div>
    );
}

export default Home;
