import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "firebaseClient";
import React, { useState } from "react";

function TweetItem(props) {
    const { tweet, isOwner } = props;
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweet.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("트위터를 삭제하시겠습니까?");
        if (ok) {
            const targetTweetRef = doc(db, "tweets", tweet.id);
            const targetPhotoRef = ref(storage, tweet.photoUrl);
            await deleteDoc(targetTweetRef);
            await deleteObject(targetPhotoRef);
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    const onChange = (e) => {
        const value = e.target.value;
        setNewTweet(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(doc(db, "tweets", tweet.id), {
            text: newTweet,
        });
        setEditing(false);
    };

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="트위트 수정하기"
                            onChange={onChange}
                            value={newTweet}
                        />
                        <input type="submit" value="수정하기" />
                    </form>
                    <button onClick={toggleEditing}>취소</button>
                </>
            ) : (
                <>
                    <h4>{tweet.text}</h4>
                    {tweet.photoUrl && (
                        <img src={tweet.photoUrl} width="50px" height="50px" />
                    )}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>삭제</button>
                            <button onClick={toggleEditing}>수정</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default TweetItem;
