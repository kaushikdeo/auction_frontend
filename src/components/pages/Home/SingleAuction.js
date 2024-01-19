import React, { useState, useEffect } from 'react';
import './singleAuction.scss';
import SideBar from '../Sidebar/Sidebar';
import NavBar from '../Navbar/Navbar';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import AuctionDetails from '../AuctionDetails/AuctionDetails';
import RandomSelectButton from '../RandomSelectButton/RandomSelectButton';
import PlayersWidget from '../BucketPlayersTable/PlayersWidget';
import { useParams } from 'react-router-dom';
import { GET_SINGLE_AUCTION } from '../../../graphql/queries/auctionQueries';
import AuctionPlayerDrawer from '../../Dashbaord/AuctionPlayerDrawer';
import { HANDLE_PLAYER_SELECT } from '../../../graphql/mutations/auctionMutations';
import { HANDLE_PLAYER_SELECT_SUBSCRIPTION } from '../../../graphql/subscriptions/auctionSubscriptions';

const SingleAuction = () => {
    const params = useParams();
    console.log("PARAMS", params)
    const { data: selectedPlayerSubData, loading: selectedPlayerSubLoading, error: selectedPlayerSubError } = useSubscription(HANDLE_PLAYER_SELECT_SUBSCRIPTION);
    const [handlePlayerSelectMutation, { data: playerSelectData, loading: playerSelectLoading, error: playerSelectError }] = useMutation(HANDLE_PLAYER_SELECT);
    const { loading, error, data, refetch } = useQuery(GET_SINGLE_AUCTION, {
        variables: { auctionId: params.auctionId },
    });
    const [open, setOpen] = useState(false);
    const [currentAuction, setCurrentAuction] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [drawerSelectedPlayer, setDrawerSelectedPlayer] = useState(null);
    const [currentBid, setCurrentBid] = useState(null);

    

    useEffect(() => {
        if(selectedPlayerSubData && selectedPlayerSubData.auctionFeed && !selectedPlayerSubLoading && !selectedPlayerSubError) {
            console.log("selectedPlayerSubDataselectedPlayerSubDataselectedPlayerSubData", selectedPlayerSubData.auctionFeed)
        }
    }, [selectedPlayerSubData, selectedPlayerSubLoading, selectedPlayerSubError])

    useEffect(() => {
        console.log("handlePlayerSelectMutation", playerSelectData, playerSelectLoading, playerSelectError);
        if (playerSelectData && playerSelectData.handlePlayerSelect && playerSelectData.handlePlayerSelect.userId && !playerSelectLoading && !playerSelectError) {
            setSelectedPlayer(playerSelectData.handlePlayerSelect)
        }
      }, [playerSelectData, playerSelectLoading, playerSelectError])

    useEffect(() => {
        console.log("AUCTIONDATA", data)
        if (!loading && !error && data && data.getAuction && data.getAuction.auctionId) {
            setCurrentAuction(data.getAuction)
            setCurrentBid(data.getAuction.minimumBid)
        }
    }, [data, error, loading])

    const handleConfirmAuctionPlayer = (auctionDetails) => {
        console.log(auctionDetails)
        refetch();
    }

    const showDrawer = () => {
        console.log("asdnaslkxmaklsmx")
        setOpen(true);
    };

    const selectPlayer = async (userData) => {
        console.log("SELECTEDPLAYER", userData)
        await handlePlayerSelectMutation({
            variables: {
              playerId: userData.userId,
              auctionId: currentAuction.auctionId
            },
          });
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

    console.log("currentAuction", currentAuction);
    return (
        <div className='home'>
            {
                currentAuction ? (
                    <>
                        <AuctionPlayerDrawer drawerSelectedPlayer={drawerSelectedPlayer} onClose={onClose} open={open}/>
                        <SideBar />
                        <div className='homeContainer'>
                            <NavBar />
                            <div className="widgets">
                                <AuctionDetails currentAuction={currentAuction} showDrawer={showDrawer} currentPlayers={currentAuction.players} handleDrawerSelectedPlayer={handleDrawerSelectedPlayer}/>
                                <RandomSelectButton selectPlayer={selectPlayer} currentAuction={currentAuction}/>
                                <PlayersWidget handleConfirmAuctionPlayer={handleConfirmAuctionPlayer} showDrawer={showDrawer} currentBid={currentBid} setCurrentBid={setCurrentBid} currentAuction={currentAuction} selectPlayer={selectPlayer} selectedPlayer={selectedPlayer} setDrawerSelectedPlayer={setDrawerSelectedPlayer}/>
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