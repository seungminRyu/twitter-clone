import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

function AppRouter(props) {
    const { isLoggedIn, user, refreshUser } = props;

    return (
        <>
            {isLoggedIn && <Navigation user={user} />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<Home user={user} />} />
                        <Route
                            path="/profile"
                            element={
                                <Profile
                                    user={user}
                                    refreshUser={refreshUser}
                                />
                            }
                        />
                    </>
                ) : (
                    <Route path="/" element={<Auth />} />
                )}
            </Routes>
        </>
    );
}

export default AppRouter;
