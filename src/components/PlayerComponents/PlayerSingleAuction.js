import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import BucketPlayerTable from "../pages/BucketPlayersTable/BucketPlayerTable";
import { GET_SINGLE_AUCTION_FOR_PLAYER } from "../../graphql/queries/auctionQueries";
import TeamsTable from "../pages/TeamsTable/TeamsTable";
import AuctionPlayerDrawer from "../Dashbaord/AuctionPlayerDrawer";
import SideBar from "../pages/Sidebar/Sidebar";
import NavBar from "../pages/Navbar/Navbar";
import PlayerAuctionDetails from "../pages/AuctionDetails/PlayerAuctionDetails/PlayerAuctionDetails";

const PlayerSingleAuction = () => {
  const params = useParams();
  console.log("PARAMS", params);
  const [currentAuction, setCurrentAuction] = useState(null);
  const [drawerSelectedPlayer, setDrawerSelectedPlayer] = useState(null);
  const [open, setOpen] = useState(false)
  const { loading, error, data, refetch } = useQuery(
    GET_SINGLE_AUCTION_FOR_PLAYER,
    {
      variables: { auctionId: params.auctionId },
    }
  );

  const onClose = () => {
    setOpen(false);
};

  const handleDrawerSelectedPlayer = (player) => {
    let selectedPlayer = currentAuction.players.find(p => p.userId === player.playerId);
    console.log("player", selectedPlayer)
    setDrawerSelectedPlayer(selectedPlayer)
    showDrawer();
}

const showDrawer = () => {
  console.log("asdnaslkxmaklsmx")
  setOpen(true);
};

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

  return (
    <div className='home'>
    {
        currentAuction ? (
            <>
                <div className='homeContainer'>
                    <div className="widgets">
                        <PlayerAuctionDetails currentAuction={currentAuction} showDrawer={showDrawer} currentPlayers={currentAuction.players} handleDrawerSelectedPlayer={handleDrawerSelectedPlayer}/>
                        {/* <RandomSelectButton selectPlayer={selectPlayer} currentAuction={currentAuction}/> */}
                        {/* <PlayersWidget minBid={currentAuction.minimumBid} handleConfirmAuctionPlayer={handleConfirmAuctionPlayer} showDrawer={showDrawer} currentBid={currentBid} setCurrentBid={setCurrentBid} currentAuction={currentAuction} selectPlayer={selectPlayer} setSelectedPlayer={setSelectedPlayer} selectedPlayer={selectedPlayer} setDrawerSelectedPlayer={setDrawerSelectedPlayer}/> */}
                        {/* <BucketPlayerTable /> */}
                    </div>
                </div>
            </>
        ) : (
            <>
                <h1>LOADING .. . . .. </h1>
            </>
        )
    }
</div>
  );
};

export default PlayerSingleAuction;
