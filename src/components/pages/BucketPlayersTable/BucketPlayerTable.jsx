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

function createData(playerId, playerImage, playerName, basePrice, playerType) {
    return { playerId, playerImage, playerName, basePrice, playerType };
  }

const rows = [
    createData("918273", 'https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80', "Vishal Rane", 0, "Bowler"),
    createData("9128734",'https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80', "Vishal Delwadia", 0, "Batsman"),
    createData("912378",'https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80', "Sumeel Parab", 0, "Batsman"),
    createData("1231",'https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80', "Kaushik Deo", 0, "Batsman"),
    createData("08379187",'https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80', "Nitesh Mandal", 0, "Batsman"),
  ];

const BucketPlayerTable = ({showDrawer, currentPlayers, handleDrawerSelectedPlayer}) => {
    let rows = currentPlayers.map(player => {
        return { 
            playerId: player.userId, 
            playerImage: "", 
            playerName: `${player.firstName} ${player.lastName}`, 
            playerType: player.playerType
        }
    })
    return (
        <div>
             <div style={{overflowY: "scroll"}} className="playertableContainer">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell><h3>Player Name</h3></TableCell>
                        <TableCell align="left"><h3>Player Name</h3></TableCell>
                        <TableCell align="left"><h3>Player Type</h3></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
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
                        <TableCell className="tableCellStyle" onClick={() => console.log('Hello')} align="right"><Button variant="contained">Select Player</Button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        </div>
        </div>
    )
}

export default BucketPlayerTable;