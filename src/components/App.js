import "../App.css";
import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { auth } from "firebaseClient";
import { onAuthStateChanged } from "firebase/auth";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (userData) => {
            if (userData) {
                setIsLoggedIn(true);
                setUser({
                    displayName: userData.displayName,
                    uid: userData.uid,
                    updateProfile: (args) => userData.updateProfile(args),
                });
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    const refreshUser = () => {
        const user = auth.currentUser;
        setUser({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
        });
    };

    if (!init) return <div>로딩중 입니다.</div>;

    return (
        <AppRouter
            isLoggedIn={isLoggedIn}
            user={user}
            refreshUser={refreshUser}
        />
    );
}

export default App;
