import React from "react";
import './playerwidget.scss'
import BucketPlayerTable from "./BucketPlayerTable";
import PlayerCard from "./PlayerCard";

const PlayersWidget = ({showDrawer}) => {
    return (
        <div className="playerDetailsWidget">
            <div className="left">
                <div className="playertoggle">
                    <span className="title">Players Bucket</span>
                    <span className="sliderTextBefore">Manual Selection</span>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                    </label>
                    <span className="sliderTextAfter">Auto Selection</span>
                </div>
                <div className="featuredLeft">
                    <BucketPlayerTable showDrawer={showDrawer}/>
                </div>
            </div>
            <div className="right">
                <span className="title">Current Player</span>
                <div className="featuredRight">
                    <PlayerCard />
                </div>
            </div>
        </div>
    )
}

export default PlayersWidget