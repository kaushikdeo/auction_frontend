import React from 'react';
import { Button, Drawer } from 'antd';

const AuctionPlayerDrawer = ({drawerSelectedPlayer, onClose, open}) => {
    return (
        <Drawer title="Player Details" placement="right" onClose={onClose} open={open}>
            {
                drawerSelectedPlayer && <>
                <div>
                    <div><h1>{`${drawerSelectedPlayer.firstName} ${drawerSelectedPlayer.lastName}`}</h1></div>
                    <div>
                    <h3>Batting Stats</h3>
                    <p>Innings : {drawerSelectedPlayer.stats.battingStats.innings}</p>
                    <p>Runs : {drawerSelectedPlayer.stats.battingStats.runs}</p>
                    <p>Strike Rate : {parseFloat(drawerSelectedPlayer.stats.battingStats.strikeRate).toFixed(2)}</p>
                    <h3>Bowling Stats</h3>
                    <p>Overs : {drawerSelectedPlayer.stats.bowlingStats.overs}</p>
                    <p>Wickets : {drawerSelectedPlayer.stats.bowlingStats.wickets}</p>
                    <p>Economy : {parseFloat(drawerSelectedPlayer.stats.bowlingStats.economy).toFixed(2)}</p>
                    </div>
                </div>
                </>
            }
        </Drawer>
    )
}

export default AuctionPlayerDrawer;