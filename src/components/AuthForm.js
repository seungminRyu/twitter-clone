import { authService } from "firebaseClient";
import { useState } from "react";

function AuthForm() {
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

    return (
        <>
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
            <button onClick={toggleAccount}>
                {isNewAccount ? "로그인 하기" : "계정생성 하기"}
            </button>
        </>
    );
}

export default AuthForm;
