import React, { useEffect, useState } from "react";
import { query, onSnapshot } from "firebase/firestore";
import TweetItem from "components/TweetItem";
import { tweetCollectionRef } from "firebaseClient";
import TweetForm from "components/TweetForm";

function Home(props) {
    const { user } = props;
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

    return (
        <div>
            <TweetForm user={user} />
            <div>
                {tweets.map((aTweet, i) => (
                    <TweetItem
                        key={aTweet.id}
                        tweet={aTweet}
                        isOwner={aTweet.creatorId === user.uid}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
