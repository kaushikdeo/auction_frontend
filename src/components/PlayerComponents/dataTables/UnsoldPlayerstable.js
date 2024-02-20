import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";

const UnsoldPlayerstable = ({unsoldPlayers, setDrawerSelectedPlayerb}) => {
  const [searchInput, setSearchInput] = useState('');
  const [unsoldPlayersBucket, setFetchedUnsoldPlayersBucket] = useState(unsoldPlayers);
  console.log("unsoldPlayersunsoldPlayers", unsoldPlayers);
  let rows = unsoldPlayersBucket.map(up => {
    return {
      playerName: `${up.firstName} ${up.lastName}`,
      playerType: up.playerType,
      userId: up.userId,
    }
  })
  const handleCheckStats = (i) => {
    let selectedPlayer = unsoldPlayers.find(e => e.userId === i.userId);
      console.log("betterr", i);
      setDrawerSelectedPlayerb(selectedPlayer)
  }
  useEffect(() => {
    let filtered = unsoldPlayersBucket.filter(ele => ele.firstName?.toLowerCase().includes(searchInput.toLowerCase()))
    setFetchedUnsoldPlayersBucket(filtered);
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
            <TableCell style={{fontSize: 12}}><b>{`Player Name (${rows.length})`}</b></TableCell>
            <TableCell style={{fontSize: 12}} align="right"><b>Player Type</b></TableCell>
            <TableCell align="right">Action</TableCell>
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
              <TableCell style={{fontSize: 12}} align="right">{row.playerType}</TableCell>
              <TableCell align="right"><Button onClick={() => handleCheckStats(row)} variant="contained">Check Stats</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default UnsoldPlayerstable;