import React, { useEffect, useState } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
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
import { HANDLE_BID_FEED, HANDLE_MOVE_PLAYER_TO_UNALLOCATED, HANDLE_PLAYER_BUY_FEED, HANDLE_PLAYER_SELECT_SUBSCRIPTION, PLAYER_RESET_FEED } from "../../graphql/subscriptions/auctionSubscriptions";
import TableTabs from "../UtilityComponents/TableTabs";
import LoadingPage from "../UtilityComponents/LoadingPage";

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
  const [soldPlayers, setSoldPlayers] = useState([]);
  const [playerBucketCount, setPlayerBucketCount] = useState(0);
  const [unallocatedPlayerBucketCount, setUnallocatedPlayerBucket] = useState(0);
  const [playerSoldBucketCount, setPlayerSoldBucketCount] = useState(0);
  // player selected for bid
  const { data: selectedPlayerSubData, loading: selectedPlayerSubLoading, error: selectedPlayerSubError } = useSubscription(HANDLE_PLAYER_SELECT_SUBSCRIPTION);
  // bid update for a selected player
  const { data: bidFeedData, loading: bidFeedLoading, error: bidFeedError } = useSubscription(HANDLE_BID_FEED);
  // player bought update
  const { data: buyFeedData, loading: buyFeedLoading, error: buyFeedError } = useSubscription(HANDLE_PLAYER_BUY_FEED);
  const { data: moveToUnAllocatedFeedData, loading: moveToUnAllocatedFeedLoading, error: moveToUnAllocatedFeedError } = useSubscription(HANDLE_MOVE_PLAYER_TO_UNALLOCATED);
  const { data: playerResetFeedData, loading: playerResetFeedLoading, error: playerResetFeedDataError } = useSubscription(PLAYER_RESET_FEED);
  // auction data for current logged in player
  const { loading, error, data, refetch } = useQuery(
    GET_SINGLE_AUCTION_FOR_PLAYER,
    { variables: { auctionId: params.auctionId } }
  );

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log("TESRTINF UNALOCATED", moveToUnAllocatedFeedData);
    if (moveToUnAllocatedFeedData && moveToUnAllocatedFeedData.playerMovedToUnallocatedFeed && !moveToUnAllocatedFeedLoading && !moveToUnAllocatedFeedError) {
      refetch();
      setSelectedPlayer(null)
      setCurrentBid(currentAuction?.minimumBid)
    }
  }, [moveToUnAllocatedFeedData, moveToUnAllocatedFeedLoading, moveToUnAllocatedFeedError])
  
  useEffect(() => {
      console.log("SUBSCRIPTION --- buy feed", currentAuction?.minimumBid, buyFeedData);
      if (buyFeedData && !buyFeedLoading, !buyFeedError) {
        if (currentAuction?.auctionId === buyFeedData?.buyFeed?.auctionId) {
          refetch();
          setCurrentBid(currentAuction?.minimumBid)
          setSelectedPlayer(null)
        }
      }
  }, [buyFeedData, buyFeedLoading, buyFeedError])

  // TODO: increase bid feed done
  useEffect(() => {
    console.log("SUBSCRIPTION --- bid feed", bidFeedData);
    if (bidFeedData && bidFeedData.bidFeed && bidFeedData.bidFeed.auctionId && bidFeedData.bidFeed.auctionId === currentAuction.auctionId) {
      console.log("SUBSCRIPTION --- bid feed", bidFeedData.bidFeed);
      refetch();
      setCurrentBid(bidFeedData.bidFeed.bidAmount)
    }
  }, [bidFeedData, bidFeedLoading, bidFeedError])
  // TODO: player select feed done
  useEffect(() => {
    if(selectedPlayerSubData && selectedPlayerSubData.auctionFeed && !selectedPlayerSubLoading && !selectedPlayerSubError && selectedPlayerSubData.auctionFeed.auctionId === currentAuction.auctionId) {
        console.log("selectedPlayerSubDataselectedPlayerSubDataselectedPlayerSubData", selectedPlayerSubData)
        setSelectedPlayer(selectedPlayerSubData.auctionFeed.user)
        toast.info('NEW PLAYER SELECTED FOR BIDDING', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
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

  const setDrawerSelectedPlayerb = (player) => {
    console.log("PLAPLAPLA", player)
    setDrawerSelectedPlayer(player);
    setOpen(true)
  }

  useEffect(() => {
    console.log("DHGVJBNKML", data);
    if (
      !loading &&
      !error &&
      data &&
      data.getAuctionDetailsForCaptain &&
      data.getAuctionDetailsForCaptain.auctionData &&
      data.getAuctionDetailsForCaptain.auctionData.auctionId
    ) {
      setCurrentAuction(data.getAuctionDetailsForCaptain.auctionData);
      setSoldPlayers(data.getAuctionDetailsForCaptain.playersBought);
      setCurrentBid(data.getAuctionDetailsForCaptain.currentPlayerBid)
      setSelectedPlayer(data.getAuctionDetailsForCaptain.selectedPlayer)
    }
  }, [data, error, loading]);
  console.log("currewwwntAuction", drawerSelectedPlayer);
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
                  <h2 style={{display:"flex", justifyContent: "center"}}>Selected Player</h2>
                  <Item><PlayerProfileCard selectedPlayer={selectedPlayer}/></Item>
                </Grid>
                <Grid xs={4}>
                  <h2 style={{display:"flex", justifyContent: "center"}}>Current Auction Details</h2>
                  <Item><CurrentBidDetails currentBid={currentBid} currentAuction={currentAuction}/></Item>
                </Grid>
                <Grid xs={4}>
                  <h2 style={{display:"flex", justifyContent: "center"}}>Current Auction Data</h2>
                  <Item>
                      <TableTabs
                      playerSoldBucketCount={playerSoldBucketCount}
                      setPlayerSoldBucketCount={setPlayerSoldBucketCount}
                      unallocatedPlayerBucketCount={unallocatedPlayerBucketCount}
                      setUnallocatedPlayerBucket={setUnallocatedPlayerBucket}
                      playerBucketCount={playerBucketCount} 
                      setPlayerBucketCount={setPlayerBucketCount}
                      setDrawerSelectedPlayerb={setDrawerSelectedPlayerb} 
                      currentAuction={currentAuction} 
                      soldPlayers={soldPlayers}/>
                  </Item>
                </Grid>
              </Grid>
            </div>
          </div>
        </>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default PlayerSingleAuction;
