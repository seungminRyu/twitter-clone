import React, { useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { addDoc } from "firebase/firestore";
import { storage, tweetCollectionRef } from "firebaseClient";

function TweetForm(props) {
    const { user } = props;
    const [tweet, setTweet] = useState("");
    const [photo, setPhoto] = useState("");

    const uploadPhoto = async () => {
        const storageRef = ref(storage, `${user.uid}/${uuidv4()}`);
        const photoUrl = await uploadString(storageRef, photo, "data_url").then(
            (result) => getDownloadURL(result.ref)
        );
        return photoUrl;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const photoUrl = photo ? await uploadPhoto() : "";
            await addDoc(tweetCollectionRef, {
                text: tweet,
                createdAt: Date.now(),
                creatorId: user.uid,
                photoUrl,
            });
            setTweet("");
            setPhoto("");
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
    );
}

export default TweetForm;
