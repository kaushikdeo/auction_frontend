import React, { useEffect, useState } from "react";
import './bucketplayertable.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button } from "@mui/material";
import { Input } from "antd";
import { CloseOutlined, UserOutlined } from '@ant-design/icons';

const UnallocatedplayerTable = ({selectPlayer, isRandomSelection, currentAuction, boughtPlayers, showDrawer, currentPlayers, handleDrawerSelectedPlayer}) => {
    const [allUnsoldPlayersData, setAllUnsoldPlayersData] = useState([]);
    const [allUnsoldPlayersInitialData, setAllUnsoldPlayersInitialData] = useState([]);
    useEffect(() => {
        let allPlayers = currentAuction.unallocatedPlayers.map(player => {
            return { 
                playerId: player.userId, 
                playerImage: "", 
                playerName: `${player.firstName} ${player.lastName}`, 
                playerType: player.playerType
            }
        })
        setAllUnsoldPlayersData(allPlayers)
        setAllUnsoldPlayersInitialData(allPlayers)
    }, [currentAuction])

    const handleManualSelectPlayer = (selected) => {
        console.log("SELECTEDMANUALPLAYER", selected)
        selectPlayer({
            playerId: selected.playerId
        })
    }

    const onSearchChange = (e) => {
        if (e.target.value.length) {
          let filtered = allUnsoldPlayersInitialData.filter((ele) =>
            ele.playerName?.toLowerCase().includes(e.target.value.toLowerCase())
          );
          console.log("SERAKDJCN", filtered);
          setAllUnsoldPlayersData(filtered);
        } else {
            setAllUnsoldPlayersData(allUnsoldPlayersInitialData);
        }
      };

    // let uniquePlayers = allPlayers.filter(({ playerId: id1 }) => !boughtPlayers.some((id2) => id2 === id1));
    if (allUnsoldPlayersData && allUnsoldPlayersData.length) {
        return (
            <div>
                <span className="title">{`Unsold Player Bucket (${allUnsoldPlayersData.length})`}</span>
                <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} className="searchInputStyle" placeholder="Search" onChange={onSearchChange} />
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
                        {allUnsoldPlayersData.map((row) => (
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
    } else {
        return (
            <div>
                <span className="title">{`Unsold Player Bucket (${allUnsoldPlayersData.length})`}</span>
                <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} className="searchInputStyle" placeholder="Search" onChange={onSearchChange} />
            </div>
        )
    }
}

export default UnallocatedplayerTable;