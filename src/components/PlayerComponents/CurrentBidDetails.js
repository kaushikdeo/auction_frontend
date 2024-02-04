import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import './currentBidDetails.scss';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CurrentBidCalculations from "./CurrentBidCalculations";
import { convertNumbers } from "../../utils/utility";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const CurrentBidDetails = ({currentBid, currentAuction}) => {
    let maxPlayersCanBuy = Math.floor(currentAuction.players.length/currentAuction.teams.length)
    let playersBought = currentAuction.auctionDetails.auctionTeams[0].teamPlayers.length - 1;
    let currentSpent = currentAuction.auctionDetails.auctionTeams[0].teamPlayers.reduce((tot, curr) => {
        return tot+=curr.soldFor
    }, 0)
    let currentWalletBalance = currentAuction.bucketWalletBalance - currentSpent
    let allowedToSpend = currentWalletBalance - (currentAuction.minimumBid * (maxPlayersCanBuy-playersBought - 1))
    console.log("ajshbxcurrentAuction", maxPlayersCanBuy - playersBought - 1);
    return (
        <>
        <Grid container spacing={1}>
        <Grid xs={4}>
            {/* <Item>Initial Wallet Balance : {currentAuction.bucketWalletBalance}</Item> */}
            <div className="number-card number-card-content1">
                <h3 className="number-card-number">{convertNumbers(currentWalletBalance)}</h3>
                <div className="number-card-divider"></div>
                <div className="number-card-dollars">Wallet Balance</div>
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
        <div className="number-card-divider"></div>
        <Grid container spacing={1}>
        <Grid xs={6}>
            {/* <Item>Initial Wallet Balance : {currentAuction.bucketWalletBalance}</Item> */}
            <div className={allowedToSpend <= currentBid ? "number-card number-card-content2" : "number-card number-card-content1" }>
                <h3 className="number-card-number">{convertNumbers(allowedToSpend)}</h3>
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
        </Grid>
        <div className="number-card-divider"></div>
        <Grid container spacing={1}>
        <Grid xs={6}>
                    <div style={{margin: 17}} className="number-card number-card-content1">
                        <h3 className="number-card-number">{convertNumbers(currentAuction.bucketWalletBalance)}</h3>
                        <div className="number-card-divider"></div>
                        <div className="number-card-dollars">Initial Wallet Balance</div>
                    </div>
                </Grid>
                <Grid xs={6}>
                    <div style={{margin: 17}} className="number-card number-card-content1">
                        <h3 className="number-card-number">{maxPlayersCanBuy}</h3>
                        <div className="number-card-divider"></div>
                        <div className="number-card-dollars">Min. Players To Be Bought</div>
                    </div>
                </Grid>
        </Grid>
        </>

    )
}

export default CurrentBidDetails;