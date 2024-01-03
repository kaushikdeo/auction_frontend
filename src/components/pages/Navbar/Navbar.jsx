import React from "react";
import './navbar.scss';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ChatIcon from '@mui/icons-material/Chat';

const NavBar = () => {
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder="Search..." />
                    <SearchIcon className="icon"/>
                </div>
                <div className="items">
                <div className="item">
                        <p>Welcome Kaushik</p>
                    </div>
                    <div className="item">
                        <LanguageIcon className="icon"/>
                    </div>
                    <div className="item">
                        <AccountCircleIcon className="icon"/>
                    </div>
                    <div className="item">
                        <NotificationsActiveIcon className="icon"/>
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <ChatIcon className="icon"/>
                        <div className="counter">2</div>
                    </div>
                    <div className="item">
                        <LogoutIcon className="icon"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar