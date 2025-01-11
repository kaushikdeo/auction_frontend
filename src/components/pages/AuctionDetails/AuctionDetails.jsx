import React, {memo} from "react";
import './auctionDetails.scss'
import TeamsTable from "../TeamsTable/TeamsTable";
import BucketPlayerTable from "../BucketPlayersTable/BucketPlayerTable";
import UnallocatedplayerTable from "../BucketPlayersTable/UnallocatedplayerTable";
import { Divider } from "antd";
import { UserDeleteOutlined } from "@ant-design/icons"

const AuctionDetails = ({selectPlayer, isRandomSelection, handleRevertBuy, teamCalc, currentBid, boughtPlayers, currentAuction,showDrawer, currentPlayers, handleDrawerSelectedPlayer}) => {
    console.log("askjxnakjsnxkjasx", currentAuction.teams.length);
    return (
        <div className="auctionDetailsWidget">
        <div className="right">
            <div className="featuredRight">
            <BucketPlayerTable selectPlayer={selectPlayer} isRandomSelection={isRandomSelection} currentAuction={currentAuction} boughtPlayers={boughtPlayers} showDrawer={showDrawer} currentPlayers={currentAuction.players} handleDrawerSelectedPlayer={handleDrawerSelectedPlayer}/>
            </div>
            <Divider variant="dashed" style={{ borderColor: '#7cb305' }} dashed><UserDeleteOutlined /></Divider>
            <div className="featuredRight">
            <UnallocatedplayerTable selectPlayer={selectPlayer} isRandomSelection={isRandomSelection} currentAuction={currentAuction} boughtPlayers={boughtPlayers} showDrawer={showDrawer} currentPlayers={currentAuction.players} handleDrawerSelectedPlayer={handleDrawerSelectedPlayer}/>
            </div>
        </div>
        <div className="right">
            <span className="title">{`Team Details (${currentAuction.teams.length})`}</span>
            <div className="featuredRight">
                <TeamsTable handleRevertBuy={handleRevertBuy} teamCalc={teamCalc} currentBid={currentBid} currentAuction={currentAuction}/>
            </div>
        </div>
    </div>
    )
}

export default memo(AuctionDetails)