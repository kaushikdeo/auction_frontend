import React from "react";
import './auctionDetails.scss'
import TeamsTable from "../TeamsTable/TeamsTable";
import BucketPlayerTable from "../BucketPlayersTable/BucketPlayerTable";

const AuctionDetails = ({currentAuction,showDrawer, currentPlayers, handleDrawerSelectedPlayer}) => {
    return (
        <div className="auctionDetailsWidget">
        {/* <div className="left">
            <span className="title">Auction Details</span>
            <div className="featuredLeft">
                <CardComponent currentAuction={currentAuction}/>
            </div>
        </div> */}
        <div className="right">
            <span className="title">Player Bucket</span>
            <div className="featuredRight">
            <BucketPlayerTable showDrawer={showDrawer} currentPlayers={currentAuction.players} handleDrawerSelectedPlayer={handleDrawerSelectedPlayer}/>
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