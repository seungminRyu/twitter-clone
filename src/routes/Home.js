import React, { useState } from "react";

function Home() {
    const [twitter, setTwitter] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
    };

    const onChange = (e) => {
        const value = e.target.value;
        setTwitter(value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="현재 무슨 생각을 하고 계신가요?"
                    value={twitter}
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
