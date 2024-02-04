import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";

const UnsoldPlayerstable = ({unsoldPlayers, setDrawerSelectedPlayerb}) => {
  console.log("unsoldPlayersunsoldPlayers", unsoldPlayers);
  let rows = unsoldPlayers.map(up => {
    return {
      playerName: `${up.firstName} ${up.lastName}`,
      playerType: up.playerType,
    }
  })
  const handleCheckStats = (i) => {
    setDrawerSelectedPlayerb(unsoldPlayers[i])
  }
    return (
        <TableContainer component={Paper}>
      <Table size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontSize: 12}}><b>Player Name</b></TableCell>
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
              <TableCell align="right"><Button onClick={() => handleCheckStats(i)} variant="contained">Check Stats</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default UnsoldPlayerstable;