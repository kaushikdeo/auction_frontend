import React from "react";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import './playerwidget.scss'
import PlayerProfileCard from "../../playerProfile/PlayerProfile";
import AuctionCalc from "./AuctionCalc";
import BoughtPlayersTable from "./BoughtPlayersTable";

const PlayersWidget = ({ setIsRandomSelection, isRandomSelection, teamCalc, shiftPlayerToUnallocatedTable, minBid, handleConfirmAuctionPlayer, showDrawer, currentAuction, selectPlayer, selectedPlayer, setDrawerSelectedPlayer, setSelectedPlayer, handlePlayerIncreaseBidMutation, setCurrentBid, currentBid }) => {
    // const [isAutoSelection, setIsAutoSelection] = useState(true);

    return (
        <div className="playerDetailsWidget">
            <div className="left">
                <div className="playertoggle">
                    <span className="title">{currentAuction.auctionName}</span>
                    <span className="sliderTextAfter">Auto Selection</span>
                    <Switch
                        checked={isRandomSelection}
                        onChange={(checked, event) => setIsRandomSelection(!isRandomSelection)}
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked
                    />
                </div>
                <div className="featuredLeft">
                    <AuctionCalc teamCalc={teamCalc} shiftPlayerToUnallocatedTable={shiftPlayerToUnallocatedTable} minBid={minBid} handleConfirmAuctionPlayer={handleConfirmAuctionPlayer} currentAuction={currentAuction} selectedPlayer={selectedPlayer} setSelectedPlayer={setSelectedPlayer} handlePlayerIncreaseBidMutation={handlePlayerIncreaseBidMutation} setCurrentBid={setCurrentBid} currentBid={currentBid}/>
                    <BoughtPlayersTable currentAuction={currentAuction} />
                </div>
            </div>
            <div className="right">
                {
                    selectedPlayer ? (<>
                        <span className="title">Current Player</span>
                        <div className="featuredRight">
                            <PlayerProfileCard selectedPlayer={selectedPlayer}/>
                        </div>
                    </>) : (<div style={{margin: "auto"}} ><h1>SELECT PLAYER TO POPULATE</h1></div>)
                }
            </div>
        </div>
    )
}

export default PlayersWidget