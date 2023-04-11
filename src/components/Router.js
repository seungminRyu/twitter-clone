import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import NotFound from "./NotFound";

function AppRouter(props) {
    const { isLoggedIn, user, refreshUser } = props;

    return (
        <>
            {isLoggedIn && <Navigation user={user} />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route index element={<Home user={user} />} />
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
                    <Route index element={<Auth />} />
                )}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default AppRouter;
