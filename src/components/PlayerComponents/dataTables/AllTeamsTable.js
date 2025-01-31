import React, { useEffect, useState } from 'react';
import './playerSoldTableStyle.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import { StyledTableRow, StyledTableCell } from '../../Common/StylizedTableRow';

const AllTeamsTable = ({soldPlayers, allTeamPlayerData, walletBal}) => {
  console.log("SOLDPLAYERRAGHVGHSXB", walletBal);
const [searchInput, setSearchInput] = useState('');
const [fetchedSoldPlayers, setFetchedSoldPlayers] = useState(soldPlayers);
// let reduced = fetchedSoldPlayers.reduce((r, a) => {
//     r[a.team.teamName] = r[a.team.teamName] || [];
//     r[a.team.teamName].push(a);
//     return r;
// }, Object.create(null));
// let allKeys = Object.keys(reduced);
// let allTeamArrays = allKeys.map(t => {
//     return {
//         teamName: t,
//         teamMates: reduced[t].length - 1,
//     }
// })

// TODO: NEW LOGIC
  let allTeamArrays = allTeamPlayerData.map(tl => {
    // {teamName: 'Test1', teamMates: 1, total: 0}
    let total = 0;
    tl?.teamPlayers.map(tp => {
      total = total + tp.soldFor;
    })
    return {
      teamName: tl?.team?.teamName, 
      teamMates: tl?.teamPlayers.length, 
      balance: total,
      total: walletBal-total
    }
  })
// TODO: NEW LOGIC

  useEffect(() => {
        let filtered = soldPlayers.filter(ele => ele.player.firstName?.toLowerCase().includes(searchInput.toLowerCase()))
        setFetchedSoldPlayers(filtered);
  }, [searchInput])
    return (
    <TableContainer component={Paper}>
      <Table size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{fontSize: 12}}><b>{`Team Name (${allTeamArrays.length})`}</b></StyledTableCell>
            <StyledTableCell style={{fontSize: 12}}><b>{`Total Spent`}</b></StyledTableCell>
            <StyledTableCell style={{fontSize: 12}}><b>{`Balance Amount`}</b></StyledTableCell>
            <StyledTableCell style={{fontSize: 12}} align="right"><b>Players Bought</b></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allTeamArrays.map((row) => {
            console.log("ALLTEAMSDATA", row)
            return (
            <StyledTableRow
              key={row.teamName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell style={{fontSize: 12}} component="th" scope="row">
                {row.teamName}
              </StyledTableCell>
              <StyledTableCell style={{fontSize: 12}} align="center">{row.balance}</StyledTableCell>
              <StyledTableCell style={{fontSize: 12}} align="center">{row.total}</StyledTableCell>
              <StyledTableCell style={{fontSize: 12}} align="center">{row.teamMates}</StyledTableCell>
            </StyledTableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default AllTeamsTable;