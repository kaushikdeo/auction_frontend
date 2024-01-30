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

const PlayersSoldTable = ({soldPlayers, setDrawerSelectedPlayerb}) => {
const [searchInput, setSearchInput] = useState('');
const [fetchedSoldPlayers, setFetchedSoldPlayers] = useState(soldPlayers);
  console.log("unsoldPlayersunsoldPlayers", soldPlayers);
  let rows = fetchedSoldPlayers.map(up => {
    return {
      playerName: `${up.player.firstName} ${up.player.lastName}`,
      team: up.team.teamName,
    }
  })

  const handleCheckStats = (i) => {
    // console.log("betterr", fetchedSoldPlayers[i]);
    // setDrawerSelectedPlayerb(fetchedSoldPlayers[i])
  }

  useEffect(() => {
        let filtered = soldPlayers.filter(ele => ele.player.firstName?.toLowerCase().includes(searchInput.toLowerCase()))
        setFetchedSoldPlayers(filtered);
  }, [searchInput])

    return (
    <TableContainer component={Paper}>
        <div class="search-box">
            <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type="text" class="search-input" placeholder="Search By Player Name" />
            <button class="search-button">
                <i class="fas fa-search"></i>
            </button>
        </div>
      <Table size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontSize: 12}}><b>Player Name</b></TableCell>
            <TableCell style={{fontSize: 12}} align="right"><b>Team</b></TableCell>
            {/* <TableCell align="right">Action</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={row.playerName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{fontSize: 12}} component="th" scope="row">
                {row.playerName}
              </TableCell>
              <TableCell style={{fontSize: 12}} align="right">{row.team}</TableCell>
              {/* <TableCell align="right"><Button variant="contained">Check Stats</Button></TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default PlayersSoldTable;