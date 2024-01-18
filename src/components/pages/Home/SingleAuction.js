import React, { useState, useEffect } from 'react';
import './singleAuction.scss';
import SideBar from '../Sidebar/Sidebar';
import NavBar from '../Navbar/Navbar';
import { Button, Drawer } from 'antd';
import { useQuery } from '@apollo/client';
import AuctionDetails from '../AuctionDetails/AuctionDetails';
import RandomSelectButton from '../RandomSelectButton/RandomSelectButton';
import PlayersWidget from '../BucketPlayersTable/PlayersWidget';
import { useParams } from 'react-router-dom';
import { GET_SINGLE_AUCTION } from '../../../graphql/queries/auctionQueries';

const SingleAuction = () => {
    const params = useParams();
    console.log("PARAMS", params)
    const { loading, error, data, refetch } = useQuery(GET_SINGLE_AUCTION, {
        variables: { auctionId: params.auctionId },
    });
    const [open, setOpen] = useState(false);
    const [currentAuction, setCurrentAuction] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [drawerSelectedPlayer, setDrawerSelectedPlayer] = useState(null);

    useEffect(() => {
        console.log("AUCTIONDATA", data)
        if (!loading && !error && data && data.getAuction && data.getAuction.auctionId) {
            setCurrentAuction(data.getAuction)
        }
    }, [data, error, loading])

    const showDrawer = () => {
        console.log("asdnaslkxmaklsmx")
        setOpen(true);
    };

    const selectPlayer = (userData) => {
        setSelectedPlayer(userData)
        
    }

    const handleDrawerSelectedPlayer = (player) => {
        let selectedPlayer = currentAuction.players.find(p => p.userId === player.playerId);
        console.log("player", selectedPlayer)
        setDrawerSelectedPlayer(selectedPlayer)
        showDrawer();
    }

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div className='home'>
            {
                currentAuction ? (
                    <>
                        <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
                            {
                                drawerSelectedPlayer && <>
                                <div>
                                    <div><h1>{`${drawerSelectedPlayer.firstName} ${drawerSelectedPlayer.lastName}`}</h1></div>
                                    <div>
                                    <h3>Batting Stats</h3>
                                    <p>Innings : {drawerSelectedPlayer.stats.battingStats.innings}</p>
                                    <p>Runs : {drawerSelectedPlayer.stats.battingStats.runs}</p>
                                    <p>Strike Rate : {drawerSelectedPlayer.stats.battingStats.strikeRate}</p>
                                    <h3>Bowling Stats</h3>
                                    <p>Overs : {drawerSelectedPlayer.stats.bowlingStats.overs}</p>
                                    <p>Wickets : {drawerSelectedPlayer.stats.bowlingStats.wickets}</p>
                                    <p>Economy : {drawerSelectedPlayer.stats.bowlingStats.economy}</p>
                                    </div>
                                </div>
                                </>
                            }
                        </Drawer>
                        <SideBar />
                        <div className='homeContainer'>
                            <NavBar />
                            <div className="widgets">
                                <AuctionDetails currentAuction={currentAuction} showDrawer={showDrawer} currentPlayers={currentAuction.players} handleDrawerSelectedPlayer={handleDrawerSelectedPlayer}/>
                                <RandomSelectButton selectPlayer={selectPlayer} currentAuction={currentAuction}/>
                                <PlayersWidget showDrawer={showDrawer} currentAuction={currentAuction} selectPlayer={selectPlayer} selectedPlayer={selectedPlayer} setDrawerSelectedPlayer={setDrawerSelectedPlayer}/>
                                {/* <BucketPlayerTable /> */}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h1>LOADING .. . . .. </h1>
                    </>
                )
            }
        </div>
    )
}

export default SingleAuction