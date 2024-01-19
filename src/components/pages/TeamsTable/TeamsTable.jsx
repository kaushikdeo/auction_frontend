import React from "react";
import './teamsTable.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TeamsTable = ({currentAuction}) => {

  let rows = currentAuction.teams.map(team => {
    return { 
      teamId: team.teamId, 
      teamName: team.teamName, 
      captainName: `${team.teamCaptain.firstName} ${team.teamCaptain.lastName}`, 
      playersBought: 0, 
      balanceAmount: 0, 
      amountSpent: 0, 
      allocatedFunds: currentAuction.bucketWalletBalance
    }
  })

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
            {rows.map((row) => (
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TeamsTable