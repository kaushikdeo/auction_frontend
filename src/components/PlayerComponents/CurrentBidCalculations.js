import React from "react";
import { convertNumbers } from "../../utils/utility"
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useAuthContext } from "../../hooks/useAuthContext";

const CurrentBidCalculations = ({currentBid, playersBought, maxPlayersCanBuy, currentAuction}) => {
    const { user, dispatch } = useAuthContext();
    let currentTeam = currentAuction.auctionDetails.auctionTeams.find((team) => {
        console.log("UYXSBKXNS", team.teamPlayers[0].player.userId === user.user.userId, team.teamPlayers[0].player.userId, user.user.userId)
        return team.teamPlayers[0].player.userId === user.user.userId
      });
    let currentSpent = currentTeam.teamPlayers.reduce((tot, curr) => {
        return tot+=curr.soldFor
    }, 0)
    let currentWalletBalance = currentAuction.bucketWalletBalance - currentSpent
    let allowedToSpend = currentWalletBalance - (currentAuction.minimumBid * (maxPlayersCanBuy-playersBought - 2))
    console.log("currentSpentcurrentSpent", currentWalletBalance - (currentAuction.minimumBid * (maxPlayersCanBuy-playersBought)))
    return (
        <div>
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <div style={{margin: 17}} className={allowedToSpend <= currentBid ? "number-card number-card-content2" : "number-card number-card-content1" }>
                        <h3 className="number-card-number">{convertNumbers(allowedToSpend)}</h3>
                        <div className="number-card-divider"></div>
                        <div className="number-card-dollars">Initial Wallet Balance</div>
                    </div>
                </Grid>
                <Grid xs={6}>
                    <div style={{margin: 17}} className={allowedToSpend <= currentBid ? "number-card number-card-content2" : "number-card number-card-content1" }>
                        <h3 className="number-card-number">{convertNumbers(allowedToSpend)}</h3>
                        <div className="number-card-divider"></div>
                        <div className="number-card-dollars">Initial Wallet Balance</div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default CurrentBidCalculations;