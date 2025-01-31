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
import { StyledTableRow, StyledTableCell } from '../../Common/StylizedTableRow';
import { Input } from 'antd';

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
        let filtered = soldPlayers.filter(ele => ele.player.firstName?.toLowerCase().includes(searchInput.toLowerCase()) || ele.player.lastName?.toLowerCase().includes(searchInput.toLowerCase()))
        setFetchedSoldPlayers(filtered);
  }, [searchInput])

    return (
    <TableContainer component={Paper}>
        <div class="search-box">
        <Input style={{marginBottom: 20, marginTop: 20, marginLeft: 10}} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type="text" class="search-input" placeholder="Search By Player Name" />
        </div>
      <Table size="medium" aria-label="a dense table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell style={{fontSize: 12}}><b>{`Player Name (${rows.length})`}</b></StyledTableCell>
            <StyledTableCell style={{fontSize: 12}} align="right"><b>Team</b></StyledTableCell>
            {/* <StyledTableCell align="right">Action</StyledTableCell> */}
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
              <StyledTableCell style={{fontSize: 12}} align="right">{row.team}</StyledTableCell>
              {/* <StyledTableCell align="right"><Button variant="contained">Check Stats</Button></StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default PlayersSoldTable;