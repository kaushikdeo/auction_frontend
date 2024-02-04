import React from "react";
import { convertNumbers } from "../../utils/utility"
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

const CurrentBidCalculations = ({currentBid, playersBought, maxPlayersCanBuy, currentAuction}) => {
    let currentSpent = currentAuction.auctionDetails.auctionTeams[0].teamPlayers.reduce((tot, curr) => {
        return tot+=curr.soldFor
    }, 0)
    let currentWalletBalance = currentAuction.bucketWalletBalance - currentSpent
    let allowedToSpend = currentWalletBalance - (currentAuction.minimumBid * (maxPlayersCanBuy-playersBought - 1))
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