import React from "react";
import './teamsTable.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(teamId, teamName, captainName, playersBought, balanceAmount, amountSpent, allocatedFunds) {
    return { teamId, teamName, captainName, playersBought, balanceAmount, amountSpent, allocatedFunds };
  }

const rows = [
    createData("918273", 'Aryavarta Club', "Vishal Rane", 2, 1000000, 100000, 1100000),
    createData("9128734",'Dominators', "Vishal Rane", 2, 1000000, 100000, 1100000),
    createData("912378",'Superkings', "Vishal Rane", 2, 1000000, 100000, 1100000),
    createData("1231",'team 2', "Vishal Rane", 2, 1000000, 100000, 1100000),
    createData("08379187",'Team 3', "Vishal Rane", 2, 1000000, 100000, 1100000),
    createData("182736",'Team4', "Vishal Rane", 2, 1000000, 100000, 1100000),
  ];

const TeamsTable = () => {
    return (
        <div className="tableContainer">
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Team Name</TableCell>
            <TableCell align="right">Captain</TableCell>
            <TableCell align="right">Players Bought</TableCell>
            <TableCell align="right">Balance Amount</TableCell>
            <TableCell align="right">Spent Amount</TableCell>
            <TableCell align="right">Allocated Funds</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.teamId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.teamName}
              </TableCell>
              <TableCell align="right"><b>{row.captainName}</b></TableCell>
              <TableCell align="right">{row.playersBought}</TableCell>
              <TableCell align="right">{row.balanceAmount}</TableCell>
              <TableCell align="right">{row.amountSpent}</TableCell>
              <TableCell align="right">{row.allocatedFunds}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}

export default TeamsTable