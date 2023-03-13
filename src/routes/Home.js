import { db } from "firebaseClient";
import React, { useEffect, useState } from "react";
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";

const tweetCollectionRef = collection(db, "tweets");

function Home(props) {
    const { user } = props;
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        const initSubscribingTweets = () => {
            try {
                const q = query(tweetCollectionRef);
                onSnapshot(q, (docs) => {
                    let nextTweets = [];
                    docs.forEach((aDoc) => {
                        nextTweets = [
                            {
                                ...aDoc.data(),
                                id: aDoc.id,
                            },
                            ...nextTweets,
                        ];
                    });
                    setTweets(nextTweets);
                });
            } catch (e) {
                console.error(e);
                alert("네트워크 에러");
            }
        };

        initSubscribingTweets();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(tweetCollectionRef, {
                text: tweet,
                createdAt: Date.now(),
                creatorId: user.uid,
            });
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
                <input type="submit" value="트위터 생성"></input>
            </form>
            <div>
                {tweets.map((aTweet, i) => (
                    <h4 key={`tweet-item-${i}`}>{aTweet.text}</h4>
                ))}
            </div>
        </div>
    );
}

export default Home;
