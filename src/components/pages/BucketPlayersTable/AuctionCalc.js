import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Dropdown from "react-dropdown";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import "react-dropdown/style.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { convertNumbers } from "../../../utils/utility";

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
  let zeroBalTeams = [];
  console.log("currentBidcurrentBidcurrentBid", teamCalc);
  teamCalc.map((team, i) => {
    console.log("teamCalcteamCalc", team.teamName, team.players);
    if (team.players.isBalanceZero) {
      zeroBalTeams.push({ value: i + 1, label: team.teamName });
    }
    if (team.players.isAllowedToBuyForThisBid) {
      items.push({ value: i + 1, label: team.teamName })
      if (!team.players.canBuy) {
        notAllowed.push({ value: i + 1, label: team.teamName })
      }
    } else {
      notAllowed.push({ value: i + 1, label: team.teamName })
    }
  });

  const confirmShiftPlayerToUnsold = () => {
    confirmAlert({
      title: 'Attention',
      message: 'Are you sure you want to move this player to unsold ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {shiftPlayerToUnallocatedTable()}
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => {},
      afterClose: () => {},
      onClickOutside: () => {},
      onKeypress: () => {},
      onKeypressEscape: () => {},
      overlayClassName: "overlay-custom-class-name"
    })
  }

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
    if (selectedPlayer && currentBid && currentAuction) {
      console.log("akjsxjaksbxjhabsx", selectedPlayer);
      setCurrentBid(currentBid + currentAuction.stepPrice);
      await handlePlayerIncreaseBidMutation({
        variables: {
          bidAmount: currentBid + currentAuction.stepPrice,
          playerId: selectedPlayer.userId,
          auctionId: currentAuction.auctionId
        },
      });
    }
  };

  const handleDecreaseBid = async () => {
    if (selectedPlayer && currentBid && currentAuction) {
      console.log("minBidminBidminBidminBid", (Number(currentBid)-currentAuction.stepPrice ));
      if ((Number(currentBid)-currentAuction.stepPrice ) >= minBid) {
        console.log("akjsxjaksbxjhabsx", selectedPlayer);
        setCurrentBid(currentBid - currentAuction.stepPrice);
        await handlePlayerIncreaseBidMutation({
          variables: {
            bidAmount: currentBid - currentAuction.stepPrice,
            playerId: selectedPlayer.userId,
            auctionId: currentAuction.auctionId
          },
        });
        console.log("akjsxjaksbxjhabsx", currentBid-currentAuction.stepPrice);
        setCurrentBid(currentBid-currentAuction.stepPrice);
      }
    }
  };

  const handleOnTeamSelect = (value) => {
    if (value.label !== "Select Team") {
      console.log(value);
      setSelectedteam(value.label);
    }
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
        setSelectedteam(null);
    }
  };

  const handleResetBuyPlayer = () => {
        setCurrentBid(minBid);
        setSelectedPlayer(null)
        setSelectedteam(null);
  };

  const renderChips = () => {
    return notAllowed.map(team => {
        return (<Stack direction="column" spacing={1}>
        <Chip style={{fontSize: 20, backgroundColor: 'red'}} label={team.label} variant="outlined" />
      </Stack>)
    })
  }

  const renderZeroBalChips = () => {
    return zeroBalTeams.map(team => {
        return (<Stack direction="column" spacing={1}>
        <Chip style={{fontSize: 20, backgroundColor: '#023970', color: 'white'}} label={team.label} variant="outlined" />
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
              type="text"
              value={convertNumbers(currentBid)}
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
            Sell
          </Button>
          <Button
            style={{ flex: 1, padding: 10, margin: 20 }}
            variant="contained"
            onClick={() => confirmShiftPlayerToUnsold()}
          >
            Shift Player To Unsold
          </Button>
        </div>
      )}
      {confirmSell && selectedPlayer &&  (
        <>
          <div>
            <div style={{margin: 10, fontSize: 20}}><b>{`${selectedPlayer.firstName} ${selectedPlayer.lastName} Auctioned For ${convertNumbers(currentBid)} To`}</b></div>
            <div style={{paddingBottom: 10}}>
            <Dropdown
              options={items}
              onChange={handleOnTeamSelect}
              defaultValue={{ label: "Select Team", value: 0 }}
              value={selectedTeam}
              placeholder="Select an option"
            />
            </div>
            <div style={{paddingTop: 10, flex: 1}}>
            <Button style={{paddingTop: 10, margin: 10}} variant="contained" onClick={() => handlePlayerAuction()}>
              Confirm Sell
            </Button>
            <Button style={{paddingTop: 10, margin: 10}} variant="contained" onClick={() => handleResetBuyPlayer()}>
              Reset Buy
            </Button>
            </div>
          </div>
        </>
      )}
      {
        notAllowed.length !== 0 && zeroBalTeams.length ? <hr class="solid"></hr> : <></>
      }
      {
        notAllowed.length !== 0 ? <h4 style={{color: 'red'}}>Teams Not Allowed To Bid Anymore</h4> : <></>
      }
      {renderChips()}
      {
        notAllowed.length !== 0 && zeroBalTeams.length ? <hr class="solid"></hr> : <></>
      }
      {
        zeroBalTeams.length !==0 ? <h4 style={{color: '#023970'}}>Teams With 0 Balance</h4> : <></>
      }
      {renderZeroBalChips()}
      {
        notAllowed.length !== 0 && zeroBalTeams.length ? <hr class="solid"></hr> : <></>
      }
    </div>
  );
};

export default AuctionCalc;
