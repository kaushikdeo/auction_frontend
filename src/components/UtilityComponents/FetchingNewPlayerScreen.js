import React from "react";
import "./loadingPage.scss";
import { Button } from "antd";

const FetchingNewPlayerScreen = () => {
  return (
    <div className="auctionBody">
      <div className="boxes">
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="loadingText">Waiting for a New Player . . .</div>
      <Button type="primary" size={'large'} ghost>Primary</Button>
    </div>
  );
};

export default FetchingNewPlayerScreen;
