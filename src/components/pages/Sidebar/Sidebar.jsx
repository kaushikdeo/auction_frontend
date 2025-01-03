import React from "react";
import './sidebar.scss'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import HardwareIcon from '@mui/icons-material/Hardware';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SpokeIcon from '@mui/icons-material/Spoke';

const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="top"><span className="logo">Auction Admin</span></div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                        <SpaceDashboardIcon className="icon"/>
                        <span>Dashboard</span>
                    </li>
                    <p className="title">AUCTIONS</p>
                    <li>
                        <HardwareIcon className="icon"/>
                        <span>Auctions</span>
                    </li>
                    <li>
                        <AddIcon className="icon"/>
                        <span>New Auction</span>
                    </li>

                    <li>
                        <AccountCircleIcon className="icon"/>
                        <span>Profile</span>
                    </li>
                    <li>
                        <SpokeIcon className="icon"/>
                        <span>Connections</span>
                    </li>
                    <li>
                        <LogoutIcon className="icon"/>
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar