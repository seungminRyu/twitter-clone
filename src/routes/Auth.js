import { authService } from "firebaseClient";
import React, { useState } from "react";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isNewAccount, setIsNewAccount] = useState(true);

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
            let res;
            if (isNewAccount) {
                res = await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            } else {
                res = await authService.signInWithEmailAndPassword(
                    email,
                    password
                );
            }
            console.log(res);
        } catch (e) {
            console.error(e);
        }
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
            <button>구글 계정으로 로그인</button>
            <button>깃허브 계정으로 로그인</button>
        </div>
    );
}

export default Auth;
