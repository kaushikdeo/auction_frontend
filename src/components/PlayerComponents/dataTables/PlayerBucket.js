import React, { useEffect, useState } from 'react';
import './playerSoldTableStyle.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { Input } from 'antd';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import { StyledTableRow, StyledTableCell } from '../../Common/StylizedTableRow';

const PlayerBucket = ({unsoldPlayers, soldPlayers, currentAuction, setDrawerSelectedPlayerb}) => {
  const { Search } = Input;
  console.log("aksjnxkjansxkajnsxxxx", currentAuction);
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
        let filtered = finalUniquePlayers.filter(ele => ele.firstName?.toLowerCase().includes(searchInput.toLowerCase()) || ele.lastName?.toLowerCase().includes(searchInput.toLowerCase()))
        setFetchedUnsoldPlayers(filtered);
  }, [searchInput])

    return (
    <TableContainer component={Paper}>
        <div className="search-box">
            <Input style={{marginBottom: 20, marginTop: 20, marginLeft: 10}} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type="text" className="search-input" placeholder="Search By Player Name" />
        </div>
      <Table size="medium" aria-label="a dense table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell style={{fontSize: 12}}><b>{`Player Name (${rows.length})`}</b></StyledTableCell>
            <StyledTableCell style={{fontSize: 12}}><b>{`Player Type`}</b></StyledTableCell>
            {currentAuction?.showPlayerStats &&<StyledTableCell style={{fontSize: 12}} align="right"><b>Action</b></StyledTableCell>}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <StyledTableRow
              key={row.playerName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell style={{fontSize: 12}} component="th" scope="row">
                {row.playerName}
              </StyledTableCell>
              <StyledTableCell style={{fontSize: 12}} component="th" scope="row">
                {row.playerType}
              </StyledTableCell>
              {currentAuction?.showPlayerStats && <StyledTableCell align="right"><Button onClick={() => handleCheckStats(row)} variant="contained">Check Stats</Button></StyledTableCell>}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default PlayerBucket;