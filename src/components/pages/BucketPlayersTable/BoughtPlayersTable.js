import React from "react";
import './bucketplayertable.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button } from "@mui/material";

const BoughtPlayersTable = ({currentAuction}) => {
    console.log("akjsnxkajsnxsss", currentAuction.auctionDetails.auctionTeams);
    let tableData = [];
    currentAuction.auctionDetails.auctionTeams.map(team => {
        team.teamPlayers.map(player => {
            console.log("asjxbxbbbx", player.player);
            let ii = {
                teamId: team.team.teamId,
                teamName: team.team.teamName,
                playerid: player.player.playerId,
                playerName: `${player.player.firstName} ${player.player.lastName}`
            }
            tableData.push(ii);
        })
    })
    return (
        <div>
             <div style={{overflowY: "scroll"}} className="playertableContainer">
                <h4>Bought players</h4>
            <TableContainer component={Paper}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell style={{fontSize: 17}}><h4><b>Player Name</b></h4></TableCell>
                        <TableCell style={{fontSize: 17}} align="left"><h4><b>Team Name</b></h4></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {tableData.map((row) => (
                        <TableRow
                        key={row.playerName}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell style={{fontSize: 17}} className="tableCellStyle" align="left">{row.playerName}</TableCell>
                        <TableCell style={{fontSize: 17}} className="tableCellStyle" align="left">{row.teamName}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        </div>
        </div>
    )
}

export default BoughtPlayersTable;