import React from "react";
import { useAuth } from "./AuthContext";
import { HiOutlineLogout } from "react-icons/hi";

const LogoutButton: React.FC = () => {
    const { logout } = useAuth();

    return <button onClick={logout}><HiOutlineLogout size={25} /></button>;
};

export default LogoutButton;
