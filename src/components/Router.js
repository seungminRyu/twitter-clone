import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

function AppRouter(props) {
    const { isLoggedIn } = props;

    return (
        <Routes>
            {isLoggedIn ? (
                <Route path="/" element={<Home />} />
            ) : (
                <Route path="/" element={<Auth />} />
            )}
        </Routes>
    );
}

export default AppRouter;
