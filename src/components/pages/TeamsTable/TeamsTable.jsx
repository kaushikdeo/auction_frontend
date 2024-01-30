import React from "react";
import './teamsTable.scss';
import './teamsTable.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {CAPTAIN} from '../../../Constants/index.js'
import ExpandableTable from "../../UtilityComponents/ExpandableTable";

const TeamsTable = ({handleRevertBuy, teamCalc, currentBid, currentAuction}) => {
  let rows = currentAuction.auctionDetails.auctionTeams.map(team => {
    let captainData = team.teamPlayers.find(e => e.role.includes("Captain"))
    let totalSpent = team.teamPlayers.reduce((total, num) => {
      return total += num.soldFor
    }, 0)
    // console.log("PROPS", currentAuction.bucketWalletBalance - totalSpent);
    return { 
      teamId: team.team.teamId, 
      teamName: team.team.teamName, 
      captainName: `${captainData.player.firstName} ${captainData.player.lastName}`, 
      playersBought: team.teamPlayers.length - 1, 
      balanceAmount: currentAuction.bucketWalletBalance - totalSpent, 
      amountSpent: totalSpent, 
      allocatedFunds: currentAuction.bucketWalletBalance,
      players: team.teamPlayers.map(player => {
        console.log("askxjnaksjnxttttt", player);
        return {
          playerId: player.player.userId,
          playerName: `${player.player.firstName} ${player.player.lastName} ${!player.soldFor ? '(C)' : ''}`,
          boughtFor: player.soldFor,
        }
      })
    }
  })
  return (
    <ExpandableTable handleRevertBuy={handleRevertBuy} teamCalc={teamCalc} intialRows={rows} currentAuction={currentAuction} currentBid={currentBid}/>
  )
}

export default TeamsTable