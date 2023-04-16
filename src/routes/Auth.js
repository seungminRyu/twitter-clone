import AuthForm from "components/AuthForm";
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "firebaseClient";
import React from "react";

function Auth() {
    const onSnsLoginBtnClick = async (e) => {
        const snsName = e.target.name;
        let provider;

        if (snsName === "google") {
            provider = new GoogleAuthProvider();
        } else if (snsName === "github") {
            provider = new GithubAuthProvider();
        }

        await signInWithPopup(auth, provider);
    };

    return (
        <div>
            <AuthForm />
            <div>
                <button onClick={onSnsLoginBtnClick} name="google">
                    구글 계정으로 로그인
                </button>
                <button onClick={onSnsLoginBtnClick} name="github">
                    깃허브 계정으로 로그인
                </button>
            </div>
        </div>
    );
}

export default Auth;
