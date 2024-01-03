import React from "react";
import './auctionDetails.scss'
import TeamsTable from "../TeamsTable/TeamsTable";
import CardComponent from "../Card/CardComponent";

const AuctionDetails = () => {
    return (
        <div className="auctionDetailsWidget">
        <div className="left">
            <span className="title">Auction Details</span>
            <div className="featuredLeft">
                <CardComponent />
            </div>
        </div>
        <div className="right">
            <span className="title">Team Details</span>
            <div className="featuredRight">
                <TeamsTable />
            </div>
        </div>
    </div>
    )
}

export default AuctionDetails