import React from "react";
import './auctionDetails.scss'
import TeamsTable from "../TeamsTable/TeamsTable";
import CardComponent from "../Card/CardComponent";

const AuctionDetails = ({currentAuction}) => {
    return (
        <div className="auctionDetailsWidget">
        <div className="left">
            <span className="title">Auction Details</span>
            <div className="featuredLeft">
                <CardComponent currentAuction={currentAuction}/>
            </div>
        </div>
        <div className="right">
            <span className="title">Team Details</span>
            <div className="featuredRight">
                <TeamsTable currentAuction={currentAuction}/>
            </div>
        </div>
    </div>
    )
}

export default AuctionDetails