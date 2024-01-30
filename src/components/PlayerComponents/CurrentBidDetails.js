import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import './currentBidDetails.scss';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CurrentBidCalculations from "./CurrentBidCalculations";

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
    console.log("ajshbxcurrentAuction", maxPlayersCanBuy - playersBought);
    return (
        <Grid container spacing={2}>
        <Grid xs={4}>
            {/* <Item>Initial Wallet Balance : {currentAuction.bucketWalletBalance}</Item> */}
            <div class="number-card number-card-content1">
                <h3 class="number-card-number">{currentAuction.bucketWalletBalance}</h3>
                <div class="number-card-divider"></div>
                <div class="number-card-dollars">Initial Wallet Balance</div>
            </div>
        </Grid>
        <Grid xs={4}>
            <div class="number-card number-card-content1">
                <h3 class="number-card-number">{currentBid}</h3>
                <div class="number-card-divider"></div>
                <div class="number-card-dollars">Current Player Bid</div>
            </div>
        </Grid>
        <Grid xs={4}>
            <div class="number-card number-card-content1">
                <h3 class="number-card-number">{maxPlayersCanBuy}</h3>
                <div class="number-card-divider"></div>
                <div class="number-card-dollars">Min. Players To Be Bought</div>
            </div>
        </Grid>
        <Grid xs={12}>
            <Item><CurrentBidCalculations currentAuction={currentAuction} maxPlayersCanBuy={maxPlayersCanBuy} playersBought={playersBought}/></Item>
        </Grid>
        </Grid>
    )
}

export default CurrentBidDetails;