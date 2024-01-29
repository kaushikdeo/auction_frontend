import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
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
    return (
        <Grid container spacing={2}>
        <Grid xs={4}>
            <Item>Initial Wallet Balance : {currentAuction.bucketWalletBalance}</Item>
        </Grid>
        <Grid xs={4}>
            <Item>Current Player Bid : {currentBid}</Item>
        </Grid>
        <Grid xs={4}>
            <Item>Min. Players To Be Bought : {Math.floor(currentAuction.players.length/currentAuction.teams.length) - 1}</Item>
        </Grid>
        <Grid xs={12}>
            <Item><CurrentBidCalculations /></Item>
        </Grid>
        </Grid>
    )
}

export default CurrentBidDetails;