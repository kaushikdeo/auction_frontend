import { convertNumbers } from "../../utils/utility"

const CurrentBidCalculations = ({currentBid, playersBought, maxPlayersCanBuy, currentAuction}) => {
    let currentSpent = currentAuction.auctionDetails.auctionTeams[0].teamPlayers.reduce((tot, curr) => {
        return tot+=curr.soldFor
    }, 0)
    let currentWalletBalance = currentAuction.bucketWalletBalance - currentSpent
    let allowedToSpend = currentWalletBalance - (currentAuction.minimumBid * (maxPlayersCanBuy-playersBought - 1))
    console.log("currentSpentcurrentSpent", currentWalletBalance - (currentAuction.minimumBid * (maxPlayersCanBuy-playersBought)))
    return (
        <div>
            <div style={{margin: 17}} className="number-card number-card-content1">
                <h3 className="number-card-number">{convertNumbers(currentWalletBalance)}</h3>
                <div className="number-card-divider"></div>
                <div className="number-card-dollars">My Current Wallet Balance</div>
            </div>
            <div style={{margin: 17}} className={allowedToSpend <= currentBid ? "number-card number-card-content2" : "number-card number-card-content1" }>
                <h3 className="number-card-number">{convertNumbers(allowedToSpend)}</h3>
                <div className="number-card-divider"></div>
                <div className="number-card-dollars">My max bid for current player</div>
            </div>
            <div style={{margin: 17}} className="number-card number-card-content1">
                <h3 className="number-card-number">{playersBought}</h3>
                <div className="number-card-divider"></div>
                <div className="number-card-dollars">Players Bought</div>
            </div>
            <div style={{margin: 17}} className="number-card number-card-content1">
                <h3 className="number-card-number">{maxPlayersCanBuy-playersBought - 1}</h3>
                <div className="number-card-divider"></div>
                <div className="number-card-dollars">Players To Be Bought</div>
            </div>
        </div>
    )
}

export default CurrentBidCalculations;