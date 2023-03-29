import { getDocs, orderBy, query, where } from "firebase/firestore";
import { authService, tweetCollectionRef } from "firebaseClient";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile(props) {
    const { user } = props;
    const navigate = useNavigate();

    const onLogoutBtnClick = async () => {
        await authService.signOut();
        navigate("/");
    };

    const getTweets = async () => {
        const q = query(
            tweetCollectionRef,
            where("creatorId", "==", user.uid),
            orderBy("createdAt")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
        });
    };

    useEffect(() => {
        getTweets();
    }, []);

    return (
        <>
            <button onClick={onLogoutBtnClick}>로그아웃</button>
        </>
    );
}

export default Profile;
