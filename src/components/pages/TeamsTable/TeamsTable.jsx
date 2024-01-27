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
  return (
    <div className="tableContainer">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><h4>Team Name</h4></TableCell>
              <TableCell align="right"><h4>Captain</h4></TableCell>
              <TableCell align="right"><h4>Players Bought</h4></TableCell>
              <TableCell align="right"><h4>Balance Amount</h4></TableCell>
              <TableCell align="right"><h4>Spent Amount</h4></TableCell>
              <TableCell align="right"><h4>Allocated Funds</h4></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              let maxPlayersCanBuy = Math.floor(currentAuction.players.length/currentAuction.teams.length)
              let maxAmountAllowedForBid = (maxPlayersCanBuy - row.playersBought) * currentAuction.minimumBid
              let balAfterBid = row.balanceAmount - maxAmountAllowedForBid
              // let balAfterBid = ((maxPlayersCanBuy - row.playersBought) * currentAuction.minimumBid) - currentBid
              console.log("balAfterBidbalAfterBidbalAfterBid", balAfterBid, currentBid)
              if (balAfterBid <= currentBid) {
                return (
                  <TableRow
                    key={row.teamId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "rgb(255, 0, 0)", opacity: 1 }}
                  >
                    <TableCell className="tableCellStyle" component="th" scope="row">
                      {row.teamName}
                    </TableCell>
                    <TableCell className="tableCellStyle" align="right"><b>{row.captainName}</b></TableCell>
                    <TableCell className="tableCellStyle" align="right"><b>{row.playersBought}</b></TableCell>
                    <TableCell className="tableCellStyle" align="right"><b>{row.balanceAmount}</b></TableCell>
                    <TableCell className="tableCellStyle" align="right"><b>{row.amountSpent}</b></TableCell>
                    <TableCell className="tableCellStyle" align="right"><b>{row.allocatedFunds}</b></TableCell>
                  </TableRow>
                )
              } else {
                return (
                  <TableRow
                    key={row.teamId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="tableCellStyle" component="th" scope="row">
                      {row.teamName}
                    </TableCell>
                    <TableCell className="tableCellStyle" align="right"><b>{row.captainName}</b></TableCell>
                    <TableCell className="tableCellStyle" align="right"><b>{row.playersBought}</b></TableCell>
                    <TableCell className="tableCellStyle" align="right"><b>{row.balanceAmount}</b></TableCell>
                    <TableCell className="tableCellStyle" align="right"><b>{row.amountSpent}</b></TableCell>
                    <TableCell className="tableCellStyle" align="right"><b>{row.allocatedFunds}</b></TableCell>
                  </TableRow>
                )
              }
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TeamsTable