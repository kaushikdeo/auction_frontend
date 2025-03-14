import React, { useEffect, useState } from 'react';
import './playerSoldTableStyle.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import { convertNumbers } from '../../../utils/utility';
import { StyledTableRow, StyledTableCell } from '../../Common/StylizedTableRow';
import { useAuthContext } from '../../../hooks/useAuthContext';

const MyTeamsTable = ({currentAuction}) => {
  const { user, dispatch } = useAuthContext();
  let currentTeam = currentAuction.auctionDetails.auctionTeams.find((team) => {
    console.log("UYXSBKXNS", team.teamPlayers[0].player.userId === user.user.userId, team.teamPlayers[0].player.userId, user.user.userId)
    return team.teamPlayers[0].player.userId === user.user.userId
  });
  // let currentTeam = currentAuction.auctionDetails.auctionTeams.find((team) => {
  //   console.log("UYXSBKXNS", team.teamPlayers[0].player.userId, user.user.userId)
  // });
  console.log("asjnkjasnxkjansxkjansxkjansx",currentTeam)
  let row = currentTeam.teamPlayers.map(tp=> {
      return {
          playerName: `${tp.player.firstName} ${tp.player.lastName} ${tp.soldFor === 0 ? '(C)' : ''}`,
          playerType: tp.player.playerType,
          boughtFor: tp.soldFor,
      }
  })
    return (
    <TableContainer component={Paper}>
        <h3>{currentTeam.team.teamName}</h3>
      <Table size="medium" aria-label="a dense table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell style={{fontSize: 12}}><b>{`Player Name (${row.length})`}</b></StyledTableCell>
            <StyledTableCell style={{fontSize: 12}} align="right"><b>Players Type</b></StyledTableCell>
            <StyledTableCell style={{fontSize: 12}} align="right"><b>Bought For</b></StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {row.map((row) => (
            <StyledTableRow
              key={row.playerName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell style={{fontSize: 12}} component="th" scope="row">
                {row.playerName}
              </StyledTableCell>
              <StyledTableCell style={{fontSize: 12}} align="right">{row.playerType}</StyledTableCell>
              <StyledTableCell style={{fontSize: 12}} align="right">{convertNumbers(row.boughtFor)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default MyTeamsTable;