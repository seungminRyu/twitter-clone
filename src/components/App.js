import "../App.css";
import { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "firebaseClient";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

    return <AppRouter isLoggedIn={isLoggedIn} />;
}

export default App;
