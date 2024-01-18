import React, { useState } from "react";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import './playerwidget.scss'
import BucketPlayerTable from "./BucketPlayerTable";
import PlayerCard from "./PlayerCard";
import PlayerProfileCard from "../../playerProfile/PlayerProfile";

const PlayersWidget = ({ showDrawer, currentAuction, selectPlayer, selectedPlayer, setDrawerSelectedPlayer }) => {
    const [isAutoSelection, setIsAutoSelection] = useState(true);

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
                    <h3>WE NEEED TO DESIGN THIS PART. THIS PART WILL HANDLE ALL THE AUCTION AUCTIONS</h3>
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