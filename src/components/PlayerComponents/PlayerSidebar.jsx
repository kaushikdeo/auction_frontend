import React from "react";
import '../pages/Sidebar/sidebar.scss'; // Reusing the sidebar styles
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { clearItem } from "../../utils/localStore";

const PlayerSidebar = () => {
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();

    const handleLogout = () => {
        clearItem("auth_token");
        dispatch({ type: 'LOGOUT', payload: { user: null } });
        navigate("/");
    }

    return (
        <div className="sidebar">
            <div className="top"><span className="logo">Fantasy Hammer</span></div>
            <div className="center">
                <div className="menu-group">
                    <span className="title">MAIN</span>
                    <ul>
                        <li onClick={() => navigate("/playerDashboard")}>
                            <SpaceDashboardIcon className="icon"/>
                            <span>Dashboard</span>
                        </li>
                    </ul>
                </div>
                
                <div className="menu-group">
                    <span className="title">YOUR TEAMS</span>
                    <ul>
                        <li onClick={() => navigate("/#")}>
                            <GroupsIcon className="icon"/>
                            <span>My Teams</span>
                        </li>
                    </ul>
                </div>

                <div className="menu-group">
                    <span className="title">ACCOUNT</span>
                    <ul>
                        <li onClick={handleLogout}>
                            <LogoutIcon className="icon"/>
                            <span>Logout</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PlayerSidebar;

