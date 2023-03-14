import React from "react";

function TweetItem(props) {
    const { tweet, isOwner } = props;
    return (
        <div>
            <h4>{tweet.text}</h4>
            {isOwner && (
                <>
                    <button>삭제</button>
                    <button>수정</button>
                </>
            )}
        </div>
    );
}

export default TweetItem;
