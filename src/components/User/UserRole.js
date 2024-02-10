import React from "react";
import { Card } from "antd";
import './userStyles.scss'
import { useNavigate } from 'react-router-dom';
import Constants from "../../Constants";
import { useAuthContext } from "../../hooks/useAuthContext";
import AddConnections from "./AddConnections";

const { Meta } = Card;

const UserRole = () => {

  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const handleRoleSelect = (i) => {
    console.log("IIIII", i);
    if (i === 0) {
      dispatch({type: 'UPDATEROLE', payload: Constants.Auctioneer})
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
        {/* <div className="card" onClick={() => handleRoleSelect(0)}>
            <h1>Captain</h1>
          <p className="body-text">Select this role if you want to participate in a auction as a captain</p> 
        </div> */}
        <div className="card" onClick={() => handleRoleSelect(1)}>
            <h1>Bidder</h1>
          <p className="body-text">Select this role if you want to login as a Captain or a Bidder in the Auction</p> 
        </div>
      </div>
      {/* <h1 className="connectionHeader">Add Connections</h1> */}
      {/* <div className="connectionsContainer">
        <AddConnections />
      </div> */}
    </div>
  )
};

export default UserRole;
