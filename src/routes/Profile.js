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
            <button onClick={onLogoutBtnClick}>๋ก๊ทธ์์</button>
        </>
    );
}

export default Profile;
