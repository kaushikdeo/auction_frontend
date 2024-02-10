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

const UnallocatedplayerTable = ({selectPlayer, isRandomSelection, currentAuction, boughtPlayers, showDrawer, currentPlayers, handleDrawerSelectedPlayer}) => {
    let allPlayers = currentAuction.unallocatedPlayers.map(player => {
        return { 
            playerId: player.userId, 
            playerImage: "", 
            playerName: `${player.firstName} ${player.lastName}`, 
            playerType: player.playerType
        }
    })

    const handleManualSelectPlayer = (selected) => {
        console.log("SELECTEDMANUALPLAYER", selected)
        selectPlayer({
            playerId: selected.playerId
        })
    }

    // let uniquePlayers = allPlayers.filter(({ playerId: id1 }) => !boughtPlayers.some((id2) => id2 === id1));
    return (
        <div>
            <span className="title">{`Unsold Player Bucket (${allPlayers.length})`}</span>
             <div style={{overflowY: "scroll"}} className="playertableContainer">
            <TableContainer component={Paper}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell><h6>Player Name</h6></TableCell>
                        <TableCell align="left"><h6>Player Name</h6></TableCell>
                        <TableCell align="left"><h6>Player Type</h6></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {allPlayers.map((row) => (
                        <TableRow
                        key={row.playerId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            <Avatar sx={{ bgcolor: "rebeccapurple" }}>{`${row.playerName.split(" ")[0].split("")[0]}${row.playerName.split(" ")[1].split("")[0]}`}</Avatar>
                        </TableCell>
                        <TableCell className="tableCellStyle" align="left"><b>{row.playerName}</b></TableCell>
                        <TableCell className="tableCellStyle" align="left">{row.playerType}</TableCell>
                        <TableCell className="tableCellStyle" onClick={() => handleDrawerSelectedPlayer(row)} align="right"><Button variant="contained">Check Stats</Button></TableCell>
                        {isRandomSelection ? <></> : <TableCell className="tableCellStyle" onClick={() => handleManualSelectPlayer(row)} align="right"><Button variant="contained">Select Player</Button></TableCell>}
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        </div>
        </div>
    )
}

export default UnallocatedplayerTable;