import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../authentication/Register";
import Home from "../Home/Home";
import Login from "../authentication/Login";
import UserRole from "../User/UserRole";
import AdditonPlayerInfo from "../User/AdditonPlayerInfo";
import AdditionalAuctioneerInfo from "../User/AdditionalAuctioneerInfo";
import PrivateRoutes from "./PrivateRoutes";
import AuctionnerDashboard from "../Dashbaord/AuctionnerDashboard";
import NewAuction from "../Auctions/NewAuction";
import SingleAuction from "../pages/Home/SingleAuction";
import PlayerSingleAuction from "../PlayerComponents/PlayerSingleAuction";
import PlayerDashboard from "../PlayerComponents/PlayerDashboard";
const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<UserRole />} />
        <Route path="/additionalPlayerInfo" element={<AdditonPlayerInfo />} />
        <Route
          path="/additionalAuctioneerInfo"
          element={<AdditionalAuctioneerInfo />}
        />
        <Route path="/auctioneerDashboard" element={<AuctionnerDashboard />} />
        <Route path="/auction/:auctionId" element={<SingleAuction />} />
        <Route path="/playerauction/:auctionId" element={<PlayerSingleAuction />} />
        <Route path="/playerDashboard" element={<PlayerDashboard />} />
        <Route path="/role" element={<UserRole />} />
        <Route path="/newAuction" element={<NewAuction />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
