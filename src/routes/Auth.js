import { authService, firebaseInstance } from "firebaseClient";
import React, { useState } from "react";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isNewAccount, setIsNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (e) => {
        const { name, value } = e.target;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isNewAccount) {
                await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            } else {
                await authService.signInWithEmailAndPassword(email, password);
            }
        } catch (e) {
            console.error(e);
            setError(e.message);
        }
    };

    const toggleAccount = () => setIsNewAccount((prev) => !prev);

    const onSnsLoginBtnClick = async (e) => {
        const snsName = e.target.name;
        let provider;

        if (snsName === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (snsName === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        await authService.signInWithPopup(provider);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="example@example.com"
                    value={email}
                    onChange={onChange}
                    required
                ></input>
                <input
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={onChange}
                    required
                ></input>
                <input
                    type="submit"
                    value={isNewAccount ? "계정 생성" : "로그인"}
                ></input>
            </form>
            <p>{error}</p>
            <p onClick={toggleAccount}>
                {isNewAccount ? "로그인" : "계정 생성"}
            </p>
            <button onClick={onSnsLoginBtnClick} name="google">
                구글 계정으로 로그인
            </button>
            <button onClick={onSnsLoginBtnClick} name="github">
                깃허브 계정으로 로그인
            </button>
        </div>
    );
}

export default Auth;
