import React from "react";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import './playerwidget.scss'
import PlayerProfileCard from "../../playerProfile/PlayerProfile";
import AuctionCalc from "./AuctionCalc";

const PlayersWidget = ({ handleConfirmAuctionPlayer, showDrawer, currentAuction, selectPlayer, selectedPlayer, setDrawerSelectedPlayer, setCurrentBid, currentBid }) => {
    // const [isAutoSelection, setIsAutoSelection] = useState(true);

    return (
        <div className="playerDetailsWidget">
            <div className="left">
                <div className="playertoggle">
                    <span className="title">Auction</span>
                    <span className="sliderTextAfter">Auto Selection</span>
                    <Switch
                        checked
                        onChange={(checked, event) => console.log(checked, event)}
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked
                    />
                </div>
                <div className="featuredLeft">
                <AuctionCalc handleConfirmAuctionPlayer={handleConfirmAuctionPlayer} currentAuction={currentAuction} selectedPlayer={selectedPlayer} setCurrentBid={setCurrentBid} currentBid={currentBid}/>
                </div>
            </div>
            <div className="right">
                {
                    selectedPlayer && <>
                        <span className="title">Current Player</span>
                        <div className="featuredRight">
                            <PlayerProfileCard selectedPlayer={selectedPlayer}/>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default PlayersWidget