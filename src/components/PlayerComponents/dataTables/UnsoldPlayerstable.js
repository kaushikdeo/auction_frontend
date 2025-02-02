import React, {useEffect, useState} from 'react';
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

const UnsoldPlayerstable = ({unsoldPlayers, setDrawerSelectedPlayerb, currentAuction}) => {
  const [searchInput, setSearchInput] = useState('');
  const [unsoldPlayersBucket, setFetchedUnsoldPlayersBucket] = useState([]);
  const [intialUnsoldBucket, setInitialUnsoldBucket] = useState([]);
  useEffect(() => {
    console.log("unsoldPlayersunsoldPlayers", unsoldPlayers);
    let rows = unsoldPlayers.map(up => {
      return {
        playerName: `${up.firstName} ${up.lastName}`,
        playerType: up.playerType,
        userId: up.userId,
      }
    })
    console.log("rowsrowsrows", rows)
    setFetchedUnsoldPlayersBucket(rows);
    setInitialUnsoldBucket(rows);
  }, [unsoldPlayers])

  const handleCheckStats = (i) => {
    let selectedPlayer = unsoldPlayers.find(e => e.userId === i.userId);
      console.log("betterr", i);
      setDrawerSelectedPlayerb(selectedPlayer)
  }

  useEffect(() => {
    if (searchInput && searchInput.length) {
      let filtered = intialUnsoldBucket.filter(ele => ele.playerName?.toLowerCase().includes(searchInput.toLowerCase()))
      setFetchedUnsoldPlayersBucket(filtered);
    }
  }, [searchInput])

  console.log("CURRENTDATA", unsoldPlayersBucket, intialUnsoldBucket)
    return (
        <TableContainer component={Paper}>
          <div class="search-box">
          <Input style={{marginBottom: 20, marginTop: 20, marginLeft: 10}} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type="text" class="search-input" placeholder="Search By Player Name" />
        </div>
      <Table size="medium" aria-label="a dense table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell style={{fontSize: 12}}><b>{`Player Name (${unsoldPlayersBucket.length})`}</b></StyledTableCell>
            <StyledTableCell style={{fontSize: 12}} align="right"><b>Player Type</b></StyledTableCell>
            {currentAuction?.showPlayerStats &&<StyledTableCell align="right">Action</StyledTableCell>}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {unsoldPlayersBucket.map((row, i) => (
            <StyledTableRow
              key={row.playerName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell style={{fontSize: 12}} component="th" scope="row">
                {row.playerName}
              </StyledTableCell>
              <StyledTableCell style={{fontSize: 12}} align="right">{row.playerType}</StyledTableCell>
              {currentAuction?.showPlayerStats && <StyledTableCell align="right"><Button onClick={() => handleCheckStats(row)} variant="contained">Check Stats</Button></StyledTableCell>}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default UnsoldPlayerstable;