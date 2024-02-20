import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { convertNumbers } from '../../utils/utility';

const Row = ({ handleRevertBuy, setTeamCalc, row, currentAuction, currentBid }) => {
  const [open, setOpen] = React.useState(false);
  let maxPlayersCanBuy = Math.floor(currentAuction.players.length/currentAuction.teams.length)
  let maxAmountAllowedForBid = (maxPlayersCanBuy - row.playersBought) * currentAuction.minimumBid
  let balAfterBid = row.balanceAmount - maxAmountAllowedForBid
  console.log("PROPS", balAfterBid <= currentBid - currentAuction.minimumBid || row.playersBought === maxPlayersCanBuy)
  console.log("playerDataplayerDataplayerData", currentAuction.minimumBid);
  const handleResetBuy = (row, historyRow) => {
    
    handleRevertBuy(historyRow.playerId, row.teamId);
    // HANDLE_RESET_BUY_PLAYER
  }
  // TODO: removed condition to check max players can buy
  // if (balAfterBid <= currentBid - currentAuction.minimumBid || row.playersBought === maxPlayersCanBuy) {s
    if (currentBid > balAfterBid) {
    console.log("ISALLOWED", row.balanceAmount, false)
    return (
      <React.Fragment>
        <TableRow style={{backgroundColor: 'red'}} sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell style={{fontSize: 13}} component="th" scope="row">{`${row.teamName}(${row.history.length})`}</TableCell>
          <TableCell style={{fontSize: 13}} align="right">{row.captainName}</TableCell>
          <TableCell style={{fontSize: 13}} align="right">{row.playersBought}</TableCell>
          <TableCell style={{fontSize: 13}} align="right">{maxPlayersCanBuy - row.playersBought - 1}</TableCell>
          <TableCell style={{fontSize: 13}} align="right">{convertNumbers(row.balanceAmount)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h4" gutterBottom component="div">
                  {`Team Members (${row.history.length})`}
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{fontSize: 12}}><b>Player Name</b></TableCell>
                      <TableCell style={{fontSize: 12}}><b>Purchase Price</b></TableCell>
                      <TableCell align="right"></TableCell>
                      {/* <TableCell align="right">Total price ($)</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell style={{fontSize: 13}} component="th" scope="row">{historyRow.playerName}</TableCell>
                        <TableCell style={{fontSize: 13}}>{convertNumbers(historyRow.boughtFor)}</TableCell>
                        <TableCell align="right"><Button onClick={() => handleResetBuy(row, historyRow)} variant="contained">Revert Buy</Button></TableCell>
                        {/* <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) / 100}
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  } else {
    console.log("ISALLOWED", row.teamName, true)
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell style={{fontSize: 13}} component="th" scope="row">{`${row.teamName}(${row.history.length})`}</TableCell>
          <TableCell style={{fontSize: 13}} align="right">{row.captainName}</TableCell>
          <TableCell style={{fontSize: 13}} align="right">{row.playersBought}</TableCell>
          <TableCell style={{fontSize: 13}} align="right">{maxPlayersCanBuy - row.playersBought -1}</TableCell>
          <TableCell style={{fontSize: 13}} align="right">{convertNumbers(row.balanceAmount)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h4" gutterBottom component="div">
                {`Team Members (${row.history.length})`}
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                    <TableCell style={{fontSize: 12}}><b>Player Name</b></TableCell>
                      <TableCell style={{fontSize: 12}}><b>Purchase Price</b></TableCell>
                      <TableCell align="right"></TableCell> 
                      {/*<TableCell align="right">Total price ($)</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell style={{fontSize: 12}} component="th" scope="row">{historyRow.playerName}</TableCell>
                        <TableCell style={{fontSize: 12}}>{convertNumbers(historyRow.boughtFor)}</TableCell>
                        <TableCell align="right"><Button onClick={() => handleResetBuy(row, historyRow)} variant="contained">Revert Buy</Button></TableCell>
                        {/*<TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) / 100}
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

const ExpandableTable = ({handleRevertBuy, teamCalc, intialRows, currentAuction, currentBid}) => {
  let rows = intialRows.map(row => {
    console.log("intialRowsintialRowsintialRows", intialRows);
    return {
      teamId: row.teamId,
      teamName: row.teamName,
      captainName: row.captainName,
      playersBought: row.playersBought,
      balanceAmount: row.balanceAmount,
      amountSpent: row.amountSpent,
      history: row.players,
    };
  })
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{fontSize: 15}}>Team Name</TableCell>
            <TableCell style={{fontSize: 15}} align="right">Captain</TableCell>
            <TableCell style={{fontSize: 15}} align="right">Players Bought</TableCell>
            <TableCell style={{fontSize: 15}} align="right">Players To Be Bought</TableCell>
            <TableCell style={{fontSize: 15}} align="right">Balance Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row handleRevertBuy={handleRevertBuy} teamCalc={teamCalc} key={row.name} row={row} currentAuction={currentAuction} currentBid={currentBid}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExpandableTable;