import React, { useEffect, useState } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { useParams } from "react-router-dom";
import BucketPlayerTable from "../pages/BucketPlayersTable/BucketPlayerTable";
import { GET_SINGLE_AUCTION_FOR_PLAYER } from "../../graphql/queries/auctionQueries";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TeamsTable from "../pages/TeamsTable/TeamsTable";
import AuctionPlayerDrawer from "../Dashbaord/AuctionPlayerDrawer";
import SideBar from "../pages/Sidebar/Sidebar";
import NavBar from "../pages/Navbar/Navbar";
import PlayerAuctionDetails from "../pages/AuctionDetails/PlayerAuctionDetails/PlayerAuctionDetails";
import AuctionDetailsStrip from "./AuctionDetailsStrip";
import PlayerProfileCard from "../playerProfile/PlayerProfile";
import CurrentBidDetails from "./CurrentBidDetails";
import { HANDLE_BID_FEED, HANDLE_PLAYER_BUY_FEED, HANDLE_PLAYER_SELECT_SUBSCRIPTION } from "../../graphql/subscriptions/auctionSubscriptions";
import TableTabs from "../UtilityComponents/TableTabs";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const PlayerSingleAuction = () => {
  const params = useParams();
  console.log("PARAMS", params);
  const [currentAuction, setCurrentAuction] = useState(null);
  const [drawerSelectedPlayer, setDrawerSelectedPlayer] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentBid, setCurrentBid] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  // player selected for bid
  const { data: selectedPlayerSubData, loading: selectedPlayerSubLoading, error: selectedPlayerSubError } = useSubscription(HANDLE_PLAYER_SELECT_SUBSCRIPTION);
  // bid update for a selected player
  const { data: bidFeedData, loading: bidFeedLoading, error: bidFeedError } = useSubscription(HANDLE_BID_FEED);
  // player bought update
  const { data: buyFeedData, loading: buyFeedLoading, error: buyFeedError } = useSubscription(HANDLE_PLAYER_BUY_FEED);
  // auction data for current logged in player
  const { loading, error, data, refetch } = useQuery(
    GET_SINGLE_AUCTION_FOR_PLAYER,
    { variables: { auctionId: params.auctionId } }
  );

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log("SUBSCRIPTION --- bid feed", buyFeedData);
  }, [buyFeedData, buyFeedLoading, buyFeedError])

  // TODO: done
  useEffect(() => {
    console.log("SUBSCRIPTION --- bid feed", bidFeedData);
    if (bidFeedData && bidFeedData.bidFeed && bidFeedData.bidFeed.auctionId && bidFeedData.bidFeed.auctionId === currentAuction.auctionId) {
      console.log("SUBSCRIPTION --- bid feed", bidFeedData.bidFeed);
      setCurrentBid(bidFeedData.bidFeed.bidAmount)
      refetch();
    }
  }, [bidFeedData, bidFeedLoading, bidFeedError])
  // TODO: done
  useEffect(() => {
    if(selectedPlayerSubData && selectedPlayerSubData.auctionFeed && !selectedPlayerSubLoading && !selectedPlayerSubError && selectedPlayerSubData.auctionFeed.auctionId === currentAuction.auctionId) {
        console.log("selectedPlayerSubDataselectedPlayerSubDataselectedPlayerSubData", selectedPlayerSubData.auctionFeed)
        setSelectedPlayer(selectedPlayerSubData.auctionFeed.user)
        refetch();
    }
}, [selectedPlayerSubData, selectedPlayerSubLoading, selectedPlayerSubError])

  const handleDrawerSelectedPlayer = (player) => {
    let selectedPlayer = currentAuction.players.find(
      (p) => p.userId === player.playerId
    );
    console.log("player", selectedPlayer);
    setDrawerSelectedPlayer(selectedPlayer);
    showDrawer();
  };

  const showDrawer = () => {
    console.log("asdnaslkxmaklsmx");
    setOpen(true);
  };

  //TODO: we need subscription for
  // 1. player selected for bidding (done) 
  // 2. player bought, 
  // 3. player reset, 
  // 4. player bid action (done), 
  // 5. player moved to unallocated bucket action

  useEffect(() => {
    console.log("AUCTIONDATA", data);
    if (
      !loading &&
      !error &&
      data &&
      data.getAuction &&
      data.getAuction.auctionId
    ) {
      setCurrentAuction(data.getAuction);
    }
  }, [data, error, loading]);
  console.log("currewwwntAuction", currentAuction);
  return (
    <div className="home">
      {currentAuction ? (
        <>
          <AuctionPlayerDrawer
            drawerSelectedPlayer={drawerSelectedPlayer}
            onClose={onClose}
            open={open}
          />
          {/* <SideBar /> */}
          <div className="homeContainer">
            {/* <NavBar /> */}
            <div className="widgets" style={{fontSize: 20}}>
              <Grid container spacing={2}>
              <Grid xs={12}>
                  <Item><AuctionDetailsStrip currentAuction={currentAuction} /></Item>
                </Grid>
                <Grid xs={4}>
                  <Item><PlayerProfileCard selectedPlayer={selectedPlayer}/></Item>
                </Grid>
                <Grid xs={4}>
                  <Item><CurrentBidDetails currentBid={currentBid} currentAuction={currentAuction}/></Item>
                </Grid>
                <Grid xs={4}>
                  <Item>
                    <div>
                      <h3>Auction Data</h3>
                      <TableTabs />
                    </div>
                  </Item>
                </Grid>
              </Grid>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>LOADING .. . . .. </h1>
        </>
      )}
    </div>
  );
};

export default PlayerSingleAuction;
