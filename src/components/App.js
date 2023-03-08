import "../App.css";
import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "firebaseClient";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    if (!init) return <div>로딩중 입니다.</div>;

    return <AppRouter isLoggedIn={isLoggedIn} />;
}

export default App;
