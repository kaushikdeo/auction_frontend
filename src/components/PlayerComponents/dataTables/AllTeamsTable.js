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

const AllTeamsTable = ({soldPlayers}) => {
const [searchInput, setSearchInput] = useState('');
const [fetchedSoldPlayers, setFetchedSoldPlayers] = useState(soldPlayers);
let reduced = fetchedSoldPlayers.reduce((r, a) => {
    r[a.team.teamName] = r[a.team.teamName] || [];
    r[a.team.teamName].push(a);
    return r;
}, Object.create(null));
let allKeys = Object.keys(reduced);
let allTeamArrays = allKeys.map(t => {
    return {
        teamName: t,
        teamMates: reduced[t].length - 1,
    }
})
  useEffect(() => {
        let filtered = soldPlayers.filter(ele => ele.player.firstName?.toLowerCase().includes(searchInput.toLowerCase()))
        setFetchedSoldPlayers(filtered);
  }, [searchInput])

    return (
    <TableContainer component={Paper}>
      <Table size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontSize: 12}}><b>Team Name</b></TableCell>
            <TableCell style={{fontSize: 12}} align="right"><b>Players Bought</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allTeamArrays.map((row) => (
            <TableRow
              key={row.teamName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{fontSize: 12}} component="th" scope="row">
                {row.teamName}
              </TableCell>
              <TableCell style={{fontSize: 12}} align="right">{row.teamMates}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default AllTeamsTable;