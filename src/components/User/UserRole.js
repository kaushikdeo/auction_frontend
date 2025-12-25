import React, {memo} from "react";
import './userStyles.scss'
import { useNavigate } from 'react-router-dom';
import Constants from "../../Constants";
import { useAuthContext } from "../../hooks/useAuthContext";
import GavelIcon from '@mui/icons-material/Gavel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupsIcon from '@mui/icons-material/Groups';

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
      <div className="header-section">
        <h1 className="brand-title">FANTASY HAMMER</h1>
        <p className="brand-subtitle">Executive Auction Engine</p>
      </div>
      
      <div className="role-selection-area">
        <h2 className="section-title">Select Your Role</h2>
        <div className="roleContainer">
          
          <div className="role-card" onClick={() => handleRoleSelect(0)}>
            <div className="icon-wrapper">
              <GavelIcon className="role-icon" />
            </div>
            <div className="content-wrapper">
              <h3>Auctioneer</h3>
              <p className="role-desc">Conduct auctions, manage bids, and control the floor.</p> 
            </div>
            <div className="hover-indicator"></div>
          </div>

          <div className="role-card" onClick={() => handleRoleSelect(1)}>
            <div className="icon-wrapper">
              <GroupsIcon className="role-icon" />
            </div>
            <div className="content-wrapper">
              <h3>Bidder</h3>
              <p className="role-desc">Captain your team, manage budget, and secure players.</p> 
            </div>
            <div className="hover-indicator"></div>
          </div>

          <div className="role-card" onClick={() => handleRoleSelect(2)}>
            <div className="icon-wrapper">
              <VisibilityIcon className="role-icon" />
            </div>
            <div className="content-wrapper">
              <h3>Viewer</h3>
              <p className="role-desc">Monitor auction progress and analyze team compositions.</p> 
            </div>
            <div className="hover-indicator"></div>
          </div>

        </div>
      </div>
    </div>
  )
};

export default memo(UserRole);
