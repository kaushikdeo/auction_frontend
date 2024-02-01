import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Dropdown from "react-dropdown";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import "react-dropdown/style.css";
const AuctionCalc = ({
    teamCalc,
    shiftPlayerToUnallocatedTable,
    minBid,
    handleConfirmAuctionPlayer,
    currentAuction,
    setSelectedPlayer,
    selectedPlayer,
    handlePlayerIncreaseBidMutation,
    setCurrentBid,
    currentBid,
}) => {
  const [selectedTeam, setSelectedteam] = useState(null);
  let items = [];
  let notAllowed = [];
  console.log("currentBidcurrentBidcurrentBid", currentAuction);
  teamCalc.map((team, i) => {
    console.log("teamCalcteamCalc", team.players.canBuy);
    if (team.players.canBuy) {
      items.push({ value: i + 1, label: team.teamName })
    } else {
      notAllowed.push({ value: i + 1, label: team.teamName })
    }
  });

  const detectKeyDown = (e) => {
    console.log("akjsxjaksbxjhabsx", e.key === "i" || e.key === "o");
    if (e.key === "i") {
      console.log("Clicked key", e.key);
      handleIncreaseBid();
    } else if (e.key === "o") {
      handleDecreaseBid();
      console.log("Clicked key", e.key);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
  }, []);

  const [confirmSell, setConfirmSell] = useState(false);

  const handleIncreaseBid = async () => {
    console.log("akjsxjaksbxjhabsx", selectedPlayer);
    setCurrentBid(currentBid + currentAuction.stepPrice);
    await handlePlayerIncreaseBidMutation({
      variables: {
        bidAmount: currentBid + currentAuction.stepPrice,
        playerId: selectedPlayer.userId,
        auctionId: currentAuction.auctionId
      },
    });
  };

  const handleDecreaseBid = () => {
    console.log("minBidminBidminBidminBid", (Number(currentBid)-currentAuction.stepPrice ));
    if ((Number(currentBid)-currentAuction.stepPrice ) >= minBid) {
      console.log("akjsxjaksbxjhabsx", currentBid-currentAuction.stepPrice);
      setCurrentBid(currentBid-currentAuction.stepPrice);
    }
  };

  const handleOnTeamSelect = (value) => {
    console.log(value);
    setSelectedteam(value.label);
  };

  const handlePlayerAuction = () => {
    if (selectedTeam) {
        let currentTeam = currentAuction.teams.find((element) => element.teamName === selectedTeam)
        console.log("skdbcajks", currentTeam)
        handleConfirmAuctionPlayer({
          playerId: selectedPlayer.userId,
          currentBid,
          currentTeam: currentTeam.teamId,
        });
        setCurrentBid(minBid);
        setSelectedPlayer(null)
    }
  };

  const renderChips = () => {
    return notAllowed.map(team => {
        return (<Stack direction="column" spacing={1}>
        <Chip style={{fontSize: 20, backgroundColor: 'red'}} label={team.label} variant="outlined" />
      </Stack>)
    })
  }
  console.log("SELECTED PLAYER", selectedPlayer)
  return (
    <div>
      {selectedPlayer && (
        <div style={{ display: "flex", flex: 1, padding: 10 }}>
          <div>
            <input
              style={{ flex: 1, padding: 10, margin: 20 }}
              type="number"
              value={currentBid}
              disabled
            />
            <Button
              style={{ flex: 1, padding: 10, margin: 20 }}
              variant="contained"
              onClick={() => handleIncreaseBid()}
            >
              Increase Bid
            </Button>
            <Button
              style={{ flex: 1, padding: 10, margin: 20 }}
              variant="contained"
              onClick={() => handleDecreaseBid()}
            >
              Decrease Bid
            </Button>
          </div>
          <Button
            style={{ flex: 1, padding: 10, margin: 20 }}
            variant="contained"
            onClick={() => setConfirmSell(true)}
          >
            Confirm Sell
          </Button>
          <Button
            style={{ flex: 1, padding: 10, margin: 20 }}
            variant="contained"
            onClick={() => shiftPlayerToUnallocatedTable()}
          >
            Shift Player To Unallocated
          </Button>
        </div>
      )}
      {confirmSell && selectedPlayer &&  (
        <>
          <div>
            <div style={{margin: 10, fontSize: 20}}><b>{`${selectedPlayer.firstName} ${selectedPlayer.lastName} Auctioned For ${currentBid} To`}</b></div>
            <div style={{paddingBottom: 10}}>
            <Dropdown
              options={items}
              onChange={handleOnTeamSelect}
              value={selectedTeam}
              placeholder="Select an option"
            />
            </div>
            <div style={{paddingTop: 10, flex: 1}}>
            <Button style={{paddingTop: 10, margin: 10}} variant="contained" onClick={() => handlePlayerAuction()}>
              Confirm Buy player
            </Button>
            <Button style={{paddingTop: 10, margin: 10}} variant="contained" onClick={() => handlePlayerAuction()}>
              Reset Buy
            </Button>
            </div>
          </div>
        </>
      )}
      {
        notAllowed.length && <h4>Teams Not Allowed To Bid Anymore</h4>
      }
      {renderChips()}
    </div>
  );
};

export default AuctionCalc;
