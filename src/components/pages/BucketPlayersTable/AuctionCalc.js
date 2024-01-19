import React, { useState } from "react";
import { Button } from "@mui/material";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const AuctionCalc = ({handleConfirmAuctionPlayer, currentAuction, selectedPlayer, setCurrentBid, currentBid}) => {
    const [selectedTeam, setSelectedteam] = useState(null)
    const items = currentAuction.teams.map((team,i) =>{ 
        console.log("teamteamteam", team)
        return { value: i+1, label: team.teamName }
    })

    const [confirmSell, setConfirmSell] = useState(false);

    const handleIncreaseBid = () => {
        setCurrentBid(currentBid+100000)
    }

    const handleOnTeamSelect = (value) => {
        console.log(value)
        setSelectedteam(value.label)
    }

    const handlePlayerAuction = () => {
        handleConfirmAuctionPlayer({playerId: selectedPlayer.userId, currentBid, selectedTeam})
    }

    return (
        <div>
            {selectedPlayer && <>
                <input type="number" value={currentBid}/>
                    <Button variant="contained" onClick={() => handleIncreaseBid()}>Increase Bid</Button>
                    <Button variant="contained" onClick={() => setConfirmSell(true)}>Confirm Sell</Button>
                </>
            }
            {
                confirmSell && <>
                    <div>
                        <div>{`${selectedPlayer.firstName} ${selectedPlayer.lastName}`}</div>
                        <div>Auctioned For</div>
                        <div>{currentBid}</div>
                        <div>To</div>
                        <Dropdown options={items} onChange={handleOnTeamSelect} value={selectedTeam} placeholder="Select an option" />;
                        <Button variant="contained" onClick={() =>handlePlayerAuction()}>Confirm Auction Player</Button>
                    </div>
                </>
            }
        </div>
    )
}

export default AuctionCalc