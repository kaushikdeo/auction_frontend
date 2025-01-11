import React, {memo} from "react";
import { Card } from "antd";
import './userStyles.scss'
import { useNavigate } from 'react-router-dom';
import Constants from "../../Constants";
import { useAuthContext } from "../../hooks/useAuthContext";
import AddConnections from "./AddConnections";
import UploadWidget from "../UtilityComponents/UploadWidget";

const { Meta } = Card;

const UserRole = () => {

  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();
console.log("USERROLEDATA", user);
  const handleRoleSelect = (i) => {
    console.log("IIIII", i);
    if (i === 0) {
      dispatch({type: 'UPDATEROLE', payload: Constants.Auctioneer})
      navigate("/");
    } else if(i === 2) {
      dispatch({type: 'UPDATEROLE', payload: Constants.Viewer})
      navigate("/");
    } else {
      dispatch({type: 'UPDATEROLE', payload: Constants.Player})
      navigate("/");
    }
  }

  return (
    <div className="userRoleContainer">
      <h1 className="roleHeader">Select Role</h1>
      <div className="roleContainer">
        <div className="card" onClick={() => handleRoleSelect(0)}>
            <h1>Auctioneer</h1>
          <p className="body-text">Select this role if you want to conduct auctions</p> 
        </div>
        <div className="card" onClick={() => handleRoleSelect(2)}>
            <h1>Viewer</h1>
          <p className="body-text">Select this role if you want to view in a auction as a player</p> 
        </div>
        <div className="card" onClick={() => handleRoleSelect(1)}>
            <h1>Bidder</h1>
          <p className="body-text">Select this role if you want to login as a Captain or a Bidder in the Auction</p> 
        </div>
      </div>
      <div className="upload widget">
      <UploadWidget />
      </div>
      {/* <h1 className="connectionHeader">Add Connections</h1> */}
      {/* <div className="connectionsContainer">
        <AddConnections />
      </div> */}
    </div>
  )
};

export default memo(UserRole);
