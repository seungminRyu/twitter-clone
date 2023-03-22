import React, { useEffect, useState } from "react";
import { addDoc, query, onSnapshot } from "firebase/firestore";
import TweetItem from "components/TweetItem";
import { storage, tweetCollectionRef } from "firebaseClient";
import { ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

function Home(props) {
    const { user } = props;
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const [photo, setPhoto] = useState(null);

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
            const storageRef = ref(storage, `${user.uid}/${uuidv4()}`);
            const res = await uploadString(storageRef, photo, "data_url");
            // await addDoc(tweetCollectionRef, {
            //     text: tweet,
            //     createdAt: Date.now(),
            //     creatorId: user.uid,
            // });
            // setTweet("");
        } catch (e) {
            console.error(e);
            alert("트위터 생성중 에러 발생: ", e.message);
        }
    };

    const onTweetChange = (e) => {
        const value = e.target.value;
        setTweet(value);
    };

    const onPhotoChange = (e) => {
        const {
            target: { files },
        } = e;
        if (files[0]) {
            const aFile = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(aFile);
            reader.onloadend = (e) => {
                const {
                    currentTarget: { result },
                } = e;
                setPhoto(result);
            };
        }
    };

    const onPhotoRemove = () => setPhoto(null);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onTweetChange}
                    type="text"
                    placeholder="현재 무슨 생각을 하고 계신가요?"
                    value={tweet}
                    maxLength={120}
                ></input>
                <input type="file" accept="image/*" onChange={onPhotoChange} />
                {photo && (
                    <div>
                        <img
                            src={photo}
                            alt="트위터 이미지"
                            width="50px"
                            height="50px"
                        />
                        <button onClick={onPhotoRemove}>삭제</button>
                    </div>
                )}
                <input type="submit" value="트위터 생성"></input>
            </form>
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
