import { authService } from "firebaseClient";
import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();

    const onLogoutBtnClick = async () => {
        await authService.signOut();
        navigate("/");
    };

    return (
        <>
            <button onClick={onLogoutBtnClick}>로그아웃</button>
        </>
    );
}

export default Profile;
