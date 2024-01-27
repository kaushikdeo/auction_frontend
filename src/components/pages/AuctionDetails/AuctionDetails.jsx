import React from "react";
import './auctionDetails.scss'
import TeamsTable from "../TeamsTable/TeamsTable";
import BucketPlayerTable from "../BucketPlayersTable/BucketPlayerTable";
import UnallocatedplayerTable from "../BucketPlayersTable/UnallocatedplayerTable";

const AuctionDetails = ({handleRevertBuy, teamCalc, currentBid, boughtPlayers, currentAuction,showDrawer, currentPlayers, handleDrawerSelectedPlayer}) => {
    console.log("askjxnakjsnxkjasx", currentAuction.teams.length);
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
            <BucketPlayerTable currentAuction={currentAuction} boughtPlayers={boughtPlayers} showDrawer={showDrawer} currentPlayers={currentAuction.players} handleDrawerSelectedPlayer={handleDrawerSelectedPlayer}/>
            </div>
            <span className="title">Unallocated Player Bucket</span>
            <div className="featuredRight">
            <UnallocatedplayerTable currentAuction={currentAuction} boughtPlayers={boughtPlayers} showDrawer={showDrawer} currentPlayers={currentAuction.players} handleDrawerSelectedPlayer={handleDrawerSelectedPlayer}/>
            </div>
        </div>
        <div className="right">
            <span className="title">Team Details</span>
            <div className="featuredRight">
                <TeamsTable handleRevertBuy={handleRevertBuy} teamCalc={teamCalc} currentBid={currentBid} currentAuction={currentAuction}/>
            </div>
        </div>
    </div>
    )
}

export default AuctionDetails