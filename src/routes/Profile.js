import TweetItem from "components/TweetItem";
import { signOut } from "firebase/auth";
import { getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { auth, tweetCollectionRef } from "firebaseClient";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile(props) {
    const { user, refreshUser } = props;
    const [userTweets, setUserTweets] = useState([]);
    const [newDisplayName, setNewDisPlayName] = useState(user.displayName);
    const navigate = useNavigate();

    const onLogoutBtnClick = async () => {
        await signOut(auth);
        navigate("/");
    };

    const getTweets = async () => {
        let loadedUserTweets = [];
        const _query = query(
            tweetCollectionRef,
            where("creatorId", "==", user.uid),
            orderBy("createdAt")
        );
        const querySnapshot = await getDocs(_query);

        querySnapshot.forEach((doc) => {
            loadedUserTweets.push({
                ...doc.data(),
                id: doc.id,
            });
        });

        setUserTweets(loadedUserTweets);
    };

    const onChange = (e) => {
        const value = e.target.value;
        setNewDisPlayName(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (newDisplayName !== user.displayName) {
            await user.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    };

    useEffect(() => {
        getTweets();
    }, []);

    useEffect(() => {
        const initSubscribingTweets = () => {
            try {
                const _query = query(
                    tweetCollectionRef,
                    where("creatorId", "==", user.uid),
                    orderBy("createdAt")
                );

                onSnapshot(_query, (docs) => {
                    let loadedUserTweets = [];

                    docs.forEach((aDoc) => {
                        loadedUserTweets.push({
                            ...aDoc.data(),
                            id: aDoc.id,
                        });
                    });
                    setUserTweets(loadedUserTweets);
                });
            } catch (e) {
                console.error(e);
                alert("네트워크 에러");
            }
        };

        initSubscribingTweets();
    }, []);

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="활동명 입력"
                    value={newDisplayName}
                    onChange={onChange}
                />
                <input type="submit" value="활동명 변경" />
            </form>
            <button onClick={onLogoutBtnClick}>로그아웃</button>
            <h3>나의 트윗</h3>
            <div>
                {userTweets.map((aTweet, i) => (
                    <TweetItem key={aTweet.id} tweet={aTweet} isOwner={true} />
                ))}
            </div>
        </>
    );
}

export default Profile;
