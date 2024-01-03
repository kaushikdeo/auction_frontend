import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./playercard.scss";

function createData(name, value) {
    return { name, value };
  }

const rows = [
    createData('Runs', 159),
    createData('Run Rate', 237),
    createData('Bowls', 262),
    createData('Economy', 2.5),
  ];

const PlayerCard = () => {
    return (
        <div class="card-container">
            <span class="pro">PRO</span>
            <img class="round" width={150} height={150} src="https://res.cloudinary.com/dfrmnqtwi/q5tfadda5ysg3xijpwuu" alt="user" />
            <h3>Vishal Rane</h3>
            <div class="buttons">
            <TableContainer component={Paper} className="selectedPlayertableContainer">
                <Table sx={{ minWidth: 650 }} className="playertable" aria-label="simple table">
                    <TableHead>
                    <TableRow className="tableRowStyle">
                        <TableCell className="tableRowStyle">Stats</TableCell>
                        <TableCell className="tableRowStyle" align="left">Value</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        className="tableRowStyle"
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell className="tableRowStyle" component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell className="tableRowStyle" align="left">{row.value}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>
            <div class="skills">
                <h6>Skills</h6>
                <ul>
                    <li>Batsman</li>
                    <li>Bowler</li>
                </ul>
            </div>
        </div>
    )
}

export default PlayerCard