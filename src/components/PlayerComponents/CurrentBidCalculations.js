const CurrentBidCalculations = ({currentBid, playersBought, maxPlayersCanBuy, currentAuction}) => {
    let currentSpent = currentAuction.auctionDetails.auctionTeams[0].teamPlayers.reduce((tot, curr) => {
        return tot+=curr.soldFor
    }, 0)
    let currentWalletBalance = currentAuction.bucketWalletBalance - currentSpent
    let allowedToSpend = currentWalletBalance - (currentAuction.minimumBid * (maxPlayersCanBuy-playersBought - 1))
    console.log("currentSpentcurrentSpent", currentWalletBalance - (currentAuction.minimumBid * (maxPlayersCanBuy-playersBought)))
    return (
        <div>
            <div style={{margin: 17}} class="number-card number-card-content1">
                <h3 class="number-card-number">{currentWalletBalance}</h3>
                <div class="number-card-divider"></div>
                <div class="number-card-dollars">My Current Wallet Balance</div>
            </div>
            <div style={{margin: 17}} class={allowedToSpend < currentBid ? "number-card number-card-content2" : "number-card number-card-content1" }>
                <h3 class="number-card-number">{allowedToSpend}</h3>
                <div class="number-card-divider"></div>
                <div class="number-card-dollars">My max bid for current player</div>
            </div>
            <div style={{margin: 17}} class="number-card number-card-content1">
                <h3 class="number-card-number">{playersBought}</h3>
                <div class="number-card-divider"></div>
                <div class="number-card-dollars">Players Bought</div>
            </div>
            <div style={{margin: 17}} class="number-card number-card-content1">
                <h3 class="number-card-number">{maxPlayersCanBuy-playersBought - 1}</h3>
                <div class="number-card-divider"></div>
                <div class="number-card-dollars">Players To Be Bought</div>
            </div>
        </div>
    )
}

export default CurrentBidCalculations;