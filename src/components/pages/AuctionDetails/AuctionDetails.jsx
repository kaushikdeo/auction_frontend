import React from "react";
import './auctionDetails.scss'
import TeamsTable from "../TeamsTable/TeamsTable";
import BucketPlayerTable from "../BucketPlayersTable/BucketPlayerTable";
import UnallocatedplayerTable from "../BucketPlayersTable/UnallocatedplayerTable";

const AuctionDetails = ({selectPlayer, isRandomSelection, handleRevertBuy, teamCalc, currentBid, boughtPlayers, currentAuction,showDrawer, currentPlayers, handleDrawerSelectedPlayer}) => {
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
            <div className="featuredRight">
            <BucketPlayerTable selectPlayer={selectPlayer} isRandomSelection={isRandomSelection} currentAuction={currentAuction} boughtPlayers={boughtPlayers} showDrawer={showDrawer} currentPlayers={currentAuction.players} handleDrawerSelectedPlayer={handleDrawerSelectedPlayer}/>
            </div>
            <div className="featuredRight">
            <UnallocatedplayerTable selectPlayer={selectPlayer} isRandomSelection={isRandomSelection} currentAuction={currentAuction} boughtPlayers={boughtPlayers} showDrawer={showDrawer} currentPlayers={currentAuction.players} handleDrawerSelectedPlayer={handleDrawerSelectedPlayer}/>
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