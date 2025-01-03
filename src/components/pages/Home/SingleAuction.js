import React, { useState, useEffect } from "react";
import "./singleAuction.scss";
import SideBar from "../Sidebar/Sidebar";
import NavBar from "../Navbar/Navbar";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import AuctionDetails from "../AuctionDetails/AuctionDetails";
import RandomSelectButton from "../RandomSelectButton/RandomSelectButton";
import PlayersWidget from "../BucketPlayersTable/PlayersWidget";
import { useParams } from "react-router-dom";
import { GET_SINGLE_AUCTION } from "../../../graphql/queries/auctionQueries";
import Button from "@mui/material/Button";
import AuctionPlayerDrawer from "../../Dashbaord/AuctionPlayerDrawer";
import {
  HANDLE_BID_FOR_PLAYER,
  HANDLE_BUY_PLAYER,
  HANDLE_PLAYER_SELECT,
  HANDLE_RESET_BUY_PLAYER,
  HANDLE_SHIFT_PLAYER_TO_UNALLOCATED_BUCKET,
} from "../../../graphql/mutations/auctionMutations";
import { HANDLE_PLAYER_SELECT_SUBSCRIPTION } from "../../../graphql/subscriptions/auctionSubscriptions";
import dayjs from "dayjs";
import {
  makeRoundRobinPairings,
  makeSingleEliminationParing,
} from "../../mobileScreens/roundrobinAlgo";
import LoadingPage from "../../UtilityComponents/LoadingPage";

const SingleAuction = () => {
  const params = useParams();
  console.log("PARAMS", params);
  const {
    data: selectedPlayerSubData,
    loading: selectedPlayerSubLoading,
    error: selectedPlayerSubError,
  } = useSubscription(HANDLE_PLAYER_SELECT_SUBSCRIPTION);
  const [
    handlePlayerSelectMutation,
    {
      data: playerSelectData,
      loading: playerSelectLoading,
      error: playerSelectError,
    },
  ] = useMutation(HANDLE_PLAYER_SELECT);
  const [
    handlePlayerIncreaseBidMutation,
    {
      data: handlePlayerIncreaseBidData,
      loading: handlePlayerIncreaseBidLoading,
      error: handlePlayerIncreaseBidError,
    },
  ] = useMutation(HANDLE_BID_FOR_PLAYER);
  const [
    handlePlayerShiftToUnAllocatedMutation,
    {
      data: handlePlayerShiftToUnAllocatedData,
      loading: handlePlayerShiftToUnAllocatedLoading,
      error: handlePlayerShiftToUnAllocatedError,
    },
  ] = useMutation(HANDLE_SHIFT_PLAYER_TO_UNALLOCATED_BUCKET);
  const [
    handleBuyPlayer,
    { data: playerBuyData, loading: playerBuyLoading, error: playerBuyError },
  ] = useMutation(HANDLE_BUY_PLAYER);
  const [
    handleRevertBuyMutation,
    {
      data: handleRevertBuyMutationData,
      loading: handleRevertBuyMutationLoading,
      error: handleRevertBuyMutationError,
    },
  ] = useMutation(HANDLE_RESET_BUY_PLAYER);
  const { loading, error, data, refetch } = useQuery(GET_SINGLE_AUCTION, {
    variables: { auctionId: params.auctionId },
  });
  const [scheduledMatches, setScheduledMatches] = useState();
  const [teamCalc, setTeamCalc] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentAuction, setCurrentAuction] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [drawerSelectedPlayer, setDrawerSelectedPlayer] = useState(null);
  const [currentBid, setCurrentBid] = useState(null);
  const [boughtPlayers, setBoughtPlayers] = useState([]);
  const [biddablePlayers, setBiddablePlayers] = useState([]);
  const [isRandomSelection, setIsRandomSelection] = useState(true);

  useEffect(() => {
    if (
      handleRevertBuyMutationData &&
      !handleRevertBuyMutationLoading &&
      !selectedPlayerSubError
    ) {
      console.log(
        "selectedPlayerSubDataselectedPlayerSubDataselectedPlayerSubData",
        handleRevertBuyMutationData
      );
    }
  }, [
    handleRevertBuyMutationData,
    handleRevertBuyMutationLoading,
    handleRevertBuyMutationError,
  ]);

  useEffect(() => {
    if (
      selectedPlayerSubData &&
      selectedPlayerSubData.auctionFeed &&
      !selectedPlayerSubLoading &&
      !selectedPlayerSubError
    ) {
      console.log(
        "selectedPlayerSubDataselectedPlayerSubDataselectedPlayerSubData",
        selectedPlayerSubData.auctionFeed
      );
    }
  }, [selectedPlayerSubData, selectedPlayerSubLoading, selectedPlayerSubError]);

  useEffect(() => {
    console.log(
      "handlePlayerSelectMutation",
      playerSelectData,
      playerSelectLoading,
      playerSelectError
    );
    if (
      playerSelectData &&
      playerSelectData.handlePlayerSelect &&
      playerSelectData.handlePlayerSelect.userId &&
      !playerSelectLoading &&
      !playerSelectError
    ) {
      setSelectedPlayer(playerSelectData.handlePlayerSelect);
    }
  }, [playerSelectData, playerSelectLoading, playerSelectError]);

  useEffect(() => {
    if (
      !loading &&
      !error &&
      data &&
      data.getAuction &&
      data.getAuction.auctionId
    ) {
      console.log(
        "AUCTIONJHXSJHB",
        data.getAuction.auctionDetails.auctionTeams
      );
      let addedPlayers = [];
      if (
        data?.getAuction?.auctionDetails?.auctionTeams &&
        data.getAuction.auctionDetails.auctionTeams.length
      ) {
        data.getAuction.auctionDetails.auctionTeams.map((team) => {
          team.teamPlayers.map((tp) => {
            addedPlayers.push(tp.player.userId);
          });
        });
      }
      setBoughtPlayers(addedPlayers);
      setCurrentAuction(data.getAuction);
      setCurrentBid(data.getAuction.minimumBid);
    }
  }, [data, error, loading]);

  const generateSchedule = () => {
    let teamSchedule = makeSingleEliminationParing(
      currentAuction.teams.map((t) => t.teamId)
    );
    // let teamSchedule = makeRoundRobinPairings(currentAuction.teams.map(t => t.teamId));
    console.log("teamSchedule", teamSchedule);
    setScheduledMatches(teamSchedule);
  };

  const renderMatchSchedule = () => {
    return scheduledMatches.map((sm) => {
      console.log("asjxnsjnxsjxnjsGGGGG");
      return (
        <div style={{ display: "flex", flex: 1 }}>
          <div style={{ display: "flex", flex: 2, justifyContent: "center" }}>
            {currentAuction.teams.find((e) => e.teamId === sm[0])?.teamName
              ? currentAuction.teams.find((e) => e.teamId === sm[0])?.teamName
              : "BYE"}
          </div>
          <div style={{ display: "flex", flex: 2, justifyContent: "center" }}>
            VS
          </div>
          <div style={{ display: "flex", flex: 2, justifyContent: "center" }}>
            {currentAuction.teams.find((e) => e.teamId === sm[1])?.teamName
              ? currentAuction.teams.find((e) => e.teamId === sm[1])?.teamName
              : "BYE"}
          </div>
        </div>
      );
    });
  };

  const handleConfirmAuctionPlayer = async ({
    playerId,
    currentBid,
    currentTeam,
  }) => {
    await handleBuyPlayer({
      variables: {
        playerId,
        teamId: currentTeam,
        bidAmount: currentBid,
        auctionId: currentAuction.auctionId,
      },
    });
    setSelectedPlayer(null);
    console.log(playerId, currentBid, currentTeam);
    refetch();
  };

  const showDrawer = () => {
    console.log("asdnaslkxmaklsmx");
    setOpen(true);
  };

  const shiftPlayerToUnallocatedTable = async () => {
    console.log(
      "asjnxakjsnxas",
      selectedPlayer.userId,
      currentAuction.auctionId
    );
    await handlePlayerShiftToUnAllocatedMutation({
      variables: {
        playerId: selectedPlayer.userId,
        auctionId: currentAuction.auctionId,
      },
    });
    setSelectedPlayer(null);
    refetch();
  };

  const selectPlayer = async (userData) => {
    console.log("SELECTEDPLAYER", userData);
    await handlePlayerSelectMutation({
      variables: {
        playerId: userData.playerId,
        auctionId: currentAuction.auctionId,
      },
    });
  };

  const handleDrawerSelectedPlayer = (player) => {
    let selectedPlayer = currentAuction.players.find(
      (p) => p.userId === player.playerId
    );
    console.log("player", selectedPlayer);
    setDrawerSelectedPlayer(selectedPlayer);
    showDrawer();
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleRevertBuy = async (playerId, teamId) => {
    console.log("boom", playerId, teamId);
    await handleRevertBuyMutation({
      variables: {
        playerId,
        teamId,
        auctionId: currentAuction.auctionId,
      },
    });
    console.log(playerId, teamId, currentAuction.auctionId);
    refetch();
  };

  const downloadAuctionDetails = () => {
    if (currentAuction) {
      console.log("curremnt", currentAuction);
      let headers = [
        { header: "Player Name", key: "playerName", width: 40, height: 7 },
        { header: "Player Type", key: "playerType", width: 40, height: 7 },
        { header: "Auctioned For", key: "auctionFor", width: 40, height: 7 },
        { header: "Team Name", key: "teamName", width: 40, height: 7 },
      ];
      let rowsData = [];
      currentAuction?.auctionDetails?.auctionTeams.map((team) => {
        let teamName = team.team.teamName;
        team.teamPlayers.map((player) => {
          rowsData.push({
            playerName: `${player.player.firstName} ${player.player.lastName} ${
              player.soldFor === 0 ? "(C)" : ""
            }`,
            teamName,
            playerType: player.player.playerType,
            auctionFor: player.soldFor,
          });
        });
      });
      console.log("rowsDatarowsData", rowsData);
      const workBook = new ExcelJS.Workbook();
      workBook.creator = "Auctions App";
      const workSheet = workBook.addWorksheet("AuctionData", {
        properties: { tabColor: { argb: "FF00FF00" } },
        views: [{ showGridLines: true }],
      });
      workSheet.columns = headers;
      workSheet.addRows(rowsData);
      workSheet.getRow(1).font = { size: 20, bold: true };

      const ext = ".xlsx";
      const fileType = "application/vnd.ms-excel";
      workBook.xlsx.writeBuffer().then((buffer) => {
        const blobn = new Blob([buffer], {
          type: "vdn.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
        });
        const fileName = `${currentAuction.auctionName}-${dayjs(
          new Date()
        ).format("DD/MM/YYY_HH:mm:ss")}.xlsx`;
        saveAs(blobn, fileName);
      });
    }
  };

  useEffect(() => {
    let allTeamsData = currentAuction?.auctionDetails?.auctionTeams;
    if (allTeamsData && allTeamsData.length) {
      let teamsD = allTeamsData.map((team) => {
        let amountSpent = team.teamPlayers.reduce((total, num) => {
          return (total += num.soldFor);
        }, 0);
        let maxPlayersCanBuy = Math.floor(
          currentAuction.players.length / currentAuction.teams.length
        );
        let maxAmountAllowedForBid =
          (maxPlayersCanBuy - team.teamPlayers.length - 1) *
            currentAuction.minimumBid +
          currentAuction.minimumBid;
        let balAfterBid =
          currentAuction.bucketWalletBalance -
          amountSpent -
          maxAmountAllowedForBid;
        console.log(
          "PROPS 1",
          team.team.teamName,
          balAfterBid <= currentBid - currentAuction.minimumBid,
          balAfterBid < currentBid - currentAuction.minimumBid ||
            team.teamPlayers.length - 1 === maxPlayersCanBuy
        );
        return {
          teamId: team.team.teamId,
          teamName: team.team.teamName,
          players: {
            playersBought: team.teamPlayers.length,
            amountSpent,
            canBuy:
              balAfterBid <= currentBid - currentAuction.minimumBid ||
              team.teamPlayers.length - 1 === maxPlayersCanBuy
                ? false
                : true,
            isAllowedToBuyForThisBid:
              balAfterBid + 1 <= currentBid - currentAuction.minimumBid ||
              team.teamPlayers.length - 1 === maxPlayersCanBuy
                ? false
                : true,
            isBalanceZero:
              amountSpent >= currentAuction.bucketWalletBalance ? true : false,
          },
        };
      });
      console.log("teamsDteamsDteamsD", teamsD);
      setTeamCalc(teamsD);
    }
    console.log("ALL TEAMS DATA", allTeamsData);
  }, [currentBid]);
  return (
    <div className="home">
      {currentAuction ? (
        <>
          <AuctionPlayerDrawer
            drawerSelectedPlayer={drawerSelectedPlayer}
            onClose={onClose}
            open={open}
          />
          <SideBar />
          <div className="homeContainer">
            <NavBar />
            <div className="widgets">
              <PlayersWidget
                isRandomSelection={isRandomSelection}
                setIsRandomSelection={setIsRandomSelection}
                teamCalc={teamCalc}
                shiftPlayerToUnallocatedTable={shiftPlayerToUnallocatedTable}
                minBid={currentAuction.minimumBid}
                handleConfirmAuctionPlayer={handleConfirmAuctionPlayer}
                showDrawer={showDrawer}
                currentBid={currentBid}
                setCurrentBid={setCurrentBid}
                handlePlayerIncreaseBidMutation={
                  handlePlayerIncreaseBidMutation
                }
                currentAuction={currentAuction}
                selectPlayer={selectPlayer}
                setSelectedPlayer={setSelectedPlayer}
                selectedPlayer={selectedPlayer}
                setDrawerSelectedPlayer={setDrawerSelectedPlayer}
              />
              {isRandomSelection && (
                <RandomSelectButton
                  boughtPlayers={boughtPlayers}
                  selectPlayer={selectPlayer}
                  currentAuction={currentAuction}
                />
              )}
              <AuctionDetails
                selectPlayer={selectPlayer}
                isRandomSelection={isRandomSelection}
                handleRevertBuy={handleRevertBuy}
                teamCalc={teamCalc}
                currentBid={currentBid}
                boughtPlayers={boughtPlayers}
                currentAuction={currentAuction}
                showDrawer={showDrawer}
                currentPlayers={currentAuction.players}
                handleDrawerSelectedPlayer={handleDrawerSelectedPlayer}
              />
              {/* <BucketPlayerTable /> */}
              <Button variant="outlined" onClick={downloadAuctionDetails}>
                Export Auction Details
              </Button>
              {currentAuction?.teams && (
                <Button variant="outlined" onClick={generateSchedule}>
                  Generate Match Schedule
                </Button>
              )}
              {scheduledMatches &&
                scheduledMatches.length &&
                renderMatchSchedule()}
            </div>
          </div>
        </>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default SingleAuction;
