import React, { useState, useEffect, memo } from "react";
import { Button } from "@mui/material";
import Dropdown from "react-dropdown";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import "react-dropdown/style.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { convertNumbers } from "../../../utils/utility";
import "./bucketplayertable.scss";
import { toast } from 'react-toastify';

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
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handlePlayerAuction = async () => {
    // FIX 6: Validate and prevent double submission
    if (!selectedTeam) {
      toast.warning("Please select a team first", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }
    
    if (isProcessing) {
      console.log("Already processing sale");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      let currentTeam = currentAuction.teams.find(
        (element) => element.teamName === selectedTeam
      );
      
      if (!currentTeam) {
        throw new Error("Selected team not found");
      }
      
      console.log("Selling player to team:", currentTeam);
      
      await handleConfirmAuctionPlayer({
        playerId: selectedPlayer.userId,
        currentBid,
        currentTeam: currentTeam.teamId,
      });
      
      // Only reset on success
      setCurrentBid(minBid);
      setSelectedPlayer(null);
      setSelectedteam(null);
      setConfirmSell(false);
      
    } catch (error) {
      console.error("Error in handlePlayerAuction:", error);
      toast.error("Failed to sell player. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      // Don't reset state on error
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetBuyPlayer = () => {
        setCurrentBid(minBid);
        setSelectedPlayer(null);
        setSelectedteam(null);
        setConfirmSell(false);
  };

  const renderChips = () => {
    return notAllowed.map(team => {
        return (<Stack direction="column" spacing={1}>
        <Chip className="chip-not-allowed" label={team.label} variant="outlined" />
      </Stack>)
    })
  }

  const renderZeroBalChips = () => {
    return zeroBalTeams.map(team => {
        return (<Stack direction="column" spacing={1}>
        <Chip className="chip-zero-bal" label={team.label} variant="outlined" />
      </Stack>)
    })
  }
  console.log("SELECTED PLAYER", selectedPlayer)
  return (
    <div>
      {selectedPlayer && (
        <div className="auction-calc-controls">
          <div className="auction-bid-group">
            <input
              className="auction-calc-input"
              type="text"
              value={convertNumbers(currentBid)}
              disabled
            />
            <div className="bid-buttons-group">
              <Button
                className="auction-calc-btn btn-bid-control"
                variant="contained"
                onClick={() => handleIncreaseBid()}
              >
                Increase Bid
              </Button>
              <Button
                className="auction-calc-btn btn-bid-control"
                variant="contained"
                onClick={() => handleDecreaseBid()}
              >
                Decrease Bid
              </Button>
            </div>
          </div>
          <Button
            className="auction-calc-btn btn-sell"
            variant="contained"
            onClick={() => setConfirmSell(true)}
          >
            Sell
          </Button>
          <Button
            className="auction-calc-btn btn-unsold"
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
            <div style={{margin: '16px 0', fontSize: 20, color: '#f4f4f5'}}><b>{`${selectedPlayer.firstName} ${selectedPlayer.lastName} Auctioned For ${convertNumbers(currentBid)} To`}</b></div>
            <div style={{paddingBottom: 10}}>
            <Dropdown
              options={items}
              onChange={handleOnTeamSelect}
              defaultValue={{ label: "Select Team", value: 0 }}
              value={selectedTeam}
              placeholder="Select an option"
              className="custom-dropdown" 
              controlClassName="custom-dropdown-control"
              menuClassName="custom-dropdown-menu"
            />
            </div>
            <div style={{paddingTop: 10, display: 'flex', gap: '10px'}}>
            <Button 
              className="auction-calc-btn btn-sell" 
              variant="contained" 
              onClick={() => handlePlayerAuction()}
              disabled={isProcessing || !selectedTeam}
            >
              {isProcessing ? "Processing..." : "Confirm Sell"}
            </Button>
            <Button className="auction-calc-btn" variant="contained" onClick={() => handleResetBuyPlayer()}>
              Reset Buy
            </Button>
            </div>
          </div>
        </>
      )}
      {
        notAllowed.length !== 0 && zeroBalTeams.length ? <hr className="divider-solid"></hr> : <></>
      }
      {
        notAllowed.length !== 0 ? <h4 className="section-header" style={{color: '#ef4444'}}>Teams Not Allowed To Bid Anymore</h4> : <></>
      }
      {renderChips()}
      {
        notAllowed.length !== 0 && zeroBalTeams.length ? <hr className="divider-solid"></hr> : <></>
      }
      {
        zeroBalTeams.length !==0 ? <h4 className="section-header" style={{color: '#60a5fa'}}>Teams With 0 Balance</h4> : <></>
      }
      {renderZeroBalChips()}
      {
        notAllowed.length !== 0 && zeroBalTeams.length ? <hr className="divider-solid"></hr> : <></>
      }
    </div>
  );
};

export default memo(AuctionCalc);
