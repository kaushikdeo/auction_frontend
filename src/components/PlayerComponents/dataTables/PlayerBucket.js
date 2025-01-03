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

const PlayerBucket = ({unsoldPlayers, soldPlayers, currentAuction, setDrawerSelectedPlayerb}) => {
  console.log("aksjnxkjansxkajnsxxxx", currentAuction.players);
  let uniquePlayers = currentAuction.players.filter(({ userId: id1 }) => !soldPlayers.some(({player}) => player.userId === id1));
  let finalUniquePlayers = uniquePlayers.filter(({ userId: id1 }) => !currentAuction.unallocatedPlayers.some(({userId: id2}) => id2 === id1));
    const [searchInput, setSearchInput] = useState('');
    const [fetchedUnsoldPlayers, setFetchedUnsoldPlayers] = useState(finalUniquePlayers);
    let rows = fetchedUnsoldPlayers.map(up => {
        return {
          playerName: `${up.firstName} ${up.lastName}`,
          userId: up.userId,
          playerType: up.playerType,
        }
    })
    console.log("uniquePlayers", rows)
    const handleCheckStats = (i) => {
      let selectedPlayer = finalUniquePlayers.find(e => e.userId === i.userId);
      console.log("betterr", i.userId, selectedPlayer);
      setDrawerSelectedPlayerb(selectedPlayer)
    }

    useEffect(() => {
        let filtered = finalUniquePlayers.filter(ele => ele.firstName?.toLowerCase().includes(searchInput.toLowerCase()))
        setFetchedUnsoldPlayers(filtered);
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
            <TableCell style={{fontSize: 12}}><b>{`Player Type`}</b></TableCell>
            <TableCell style={{fontSize: 12}} align="right"><b>Action</b></TableCell>
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
              <TableCell style={{fontSize: 12}} component="th" scope="row">
                {row.playerType}
              </TableCell>
              <TableCell align="right"><Button onClick={() => handleCheckStats(row)} variant="contained">Check Stats</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default PlayerBucket;