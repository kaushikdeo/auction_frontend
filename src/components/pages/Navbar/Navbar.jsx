import React, {useContext} from "react";
import './navbar.scss';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ChatIcon from '@mui/icons-material/Chat';
import { AuthContext } from "../../../Context/AuthContext";

const NavBar = () => {
    const {user: {user}} = useContext(AuthContext);
    console.log("USERUSER", user);
    const onHandleLogout = () => {

    }
    
    return (
        <div className="navbar">
            <div className="wrapper">
                <div>
                    {/* <input type="text" placeholder="Search..." />
                    <SearchIcon className="icon"/> */}
                </div>
                <div className="items">
                <div className="item">
                        <p>{`Welcome ${user?.firstName ? user?.firstName : "Auctioneer" }`}</p>
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