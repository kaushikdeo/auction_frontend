import React, {memo} from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import './currentBidDetails.scss';
import { convertNumbers } from "../../utils/utility";
import { useAuthContext } from "../../hooks/useAuthContext";

const CurrentBidDetails = ({currentBid, currentAuction}) => {
    const { user } = useAuthContext();
    let currentTeam = currentAuction.auctionDetails.auctionTeams.find((team) => {
        return team.teamPlayers[0].player.userId === user.user.userId
      });
    let maxPlayersCanBuy = Math.floor(currentAuction.players.length/currentAuction.teams.length)
    let playersBought = currentTeam.teamPlayers.length - 1;
    let currentSpent = currentTeam.teamPlayers.reduce((tot, curr) => {
        return tot+=curr.soldFor
    }, 0)
    let currentWalletBalance = currentAuction.bucketWalletBalance - currentSpent
    let allowedToSpend = currentWalletBalance - (currentAuction.minimumBid * (maxPlayersCanBuy-playersBought - 2))
    
    return (
        <div className="current-bid-details-container">
            <Grid container spacing={2}>
                <Grid xs={4}>
                    <div className="number-card number-card-content1">
                        <h3 className="number-card-number">{convertNumbers(currentWalletBalance)}</h3>
                        <div className="number-card-divider"></div>
                        <div className="number-card-dollars">Current Wallet Balance</div>
                    </div>
                </Grid>
                <Grid xs={4}>
                    <div className="number-card number-card-content1">
                        <h3 className="number-card-number">{maxPlayersCanBuy-playersBought - 1}</h3>
                        <div className="number-card-divider"></div>
                        <div className="number-card-dollars">Players To Be Bought</div>
                    </div>
                </Grid>
                <Grid xs={4}>
                    <div className="number-card number-card-content1">
                        <h3 className="number-card-number">{playersBought}</h3>
                        <div className="number-card-divider"></div>
                        <div className="number-card-dollars">Players Bought</div>
                    </div>
                </Grid>
            </Grid>
            
            <div className="number-card-divider" style={{margin: '24px 0'}}></div>
            
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <div className="number-card number-card-content1">
                        <h3 className="number-card-number">{currentWalletBalance === 0 ? 0 : convertNumbers(allowedToSpend)}</h3>
                        <div className="number-card-divider"></div>
                        <div className="number-card-dollars">Allowed To Bid</div>
                    </div>
                </Grid>
                <Grid xs={6}>
                    <div className="number-card number-card-content1">
                        <h3 className="number-card-number">{convertNumbers(currentBid)}</h3>
                        <div className="number-card-divider"></div>
                        <div className="number-card-dollars">Current Player Bid</div>
                    </div>
                </Grid>
                {allowedToSpend <= currentBid && 
                <Grid xs={12}>
                    <div className="number-card number-card-content2">
                        <h3 className="number-card-number">{`You cannot bid for ${convertNumbers(currentBid+currentAuction.stepPrice)}`}</h3>
                    </div>
                </Grid>}
            </Grid>
            
            <div className="number-card-divider" style={{margin: '24px 0'}}></div>
            
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <div className="number-card number-card-content1">
                        <h3 className="number-card-number">{convertNumbers(currentAuction.bucketWalletBalance)}</h3>
                        <div className="number-card-divider"></div>
                        <div className="number-card-dollars">Initial Wallet Balance</div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default memo(CurrentBidDetails);