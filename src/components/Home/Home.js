import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Constants from '../../Constants';
import { useQuery} from '@apollo/client';
import { useAuthContext } from '../../hooks/useAuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  console.log("STATETTETE", user);

  const handleNavigation = () => {
    console.log("USER FROM LOGIN / REGISTER", user);
    if (user && user.user) {
      let loggedInUser = user;
      console.log("logged in user", loggedInUser);
      if (loggedInUser.currentRole){
        if (loggedInUser && loggedInUser.currentRole === Constants.Auctioneer) {
          console.log("I am in auctioneer")
          navigate('/auctioneerDashboard');
        } else if (loggedInUser && loggedInUser.currentRole === Constants.Player) {
          console.log("I am in player")
          navigate('/playerDashboard');
        } else if (loggedInUser && loggedInUser.currentRole === Constants.Viewer) {
          console.log("I am in Viewer")
          navigate('/viewerAuctionList');
        } 
      } else {
        navigate('/role');
      }
    } else {
      console.log("NO USER");
      navigate('/login')
    }
  }

  useEffect(() => {
    console.log("STATETTETE inside useEffect", user);
    handleNavigation();
    // if (user && user.user) {
    //   navigate('/dashboard')
    // } else {
    //   navigate('/login')
    // }
  }, [user])
  
  return (
    <div>Home</div>
  )
}

export default Home;
