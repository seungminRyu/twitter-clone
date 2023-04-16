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
            <h1>트위터</h1>
            <button>테스트 버튼</button>
            {isLoggedIn && <Navigation user={user} />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route
                            // path="/twitter-clone"
                            index
                            element={<Home user={user} />}
                        />
                        <Route
                            // path="/twitter-clone/profile"
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
