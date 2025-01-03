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

const MyTeamsTable = ({currentAuction}) => {
console.log("currentAuctionggg", currentAuction.auctionDetails.auctionTeams[0].teamPlayers);
let currentTeam = currentAuction.auctionDetails.auctionTeams[0].team.teamName;
let row = currentAuction.auctionDetails.auctionTeams[0].teamPlayers.map(tp=> {
    return {
        playerName: `${tp.player.firstName} ${tp.player.lastName} ${tp.soldFor === 0 ? '(C)' : ''}`,
        playerType: tp.player.playerType,
        boughtFor: tp.soldFor,
    }
})
    return (
    <TableContainer component={Paper}>
        <h2>{currentTeam}</h2>
      <Table size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontSize: 12}}><b>{`Player Name (${row.length})`}</b></TableCell>
            <TableCell style={{fontSize: 12}} align="right"><b>Players Type</b></TableCell>
            <TableCell style={{fontSize: 12}} align="right"><b>Bought For</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((row) => (
            <TableRow
              key={row.playerName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{fontSize: 12}} component="th" scope="row">
                {row.playerName}
              </TableCell>
              <TableCell style={{fontSize: 12}} align="right">{row.playerType}</TableCell>
              <TableCell style={{fontSize: 12}} align="right">{convertNumbers(row.boughtFor)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default MyTeamsTable;