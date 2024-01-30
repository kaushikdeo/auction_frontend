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
import { HANDLE_BID_FOR_PLAYER, HANDLE_BUY_PLAYER, HANDLE_PLAYER_SELECT, HANDLE_RESET_BUY_PLAYER, HANDLE_SHIFT_PLAYER_TO_UNALLOCATED_BUCKET } from '../../../graphql/mutations/auctionMutations';
import { HANDLE_PLAYER_SELECT_SUBSCRIPTION } from '../../../graphql/subscriptions/auctionSubscriptions';

const SingleAuction = () => {
    const params = useParams();
    console.log("PARAMS", params)
    const { data: selectedPlayerSubData, loading: selectedPlayerSubLoading, error: selectedPlayerSubError } = useSubscription(HANDLE_PLAYER_SELECT_SUBSCRIPTION);
    const [handlePlayerSelectMutation, { data: playerSelectData, loading: playerSelectLoading, error: playerSelectError }] = useMutation(HANDLE_PLAYER_SELECT);
    const [handlePlayerIncreaseBidMutation, { data: handlePlayerIncreaseBidData, loading: handlePlayerIncreaseBidLoading, error: handlePlayerIncreaseBidError }] = useMutation(HANDLE_BID_FOR_PLAYER);
    const [handlePlayerShiftToUnAllocatedMutation, { data: handlePlayerShiftToUnAllocatedData, loading: handlePlayerShiftToUnAllocatedLoading, error: handlePlayerShiftToUnAllocatedError }] = useMutation(HANDLE_SHIFT_PLAYER_TO_UNALLOCATED_BUCKET);
    const [handleBuyPlayer, { data: playerBuyData, loading: playerBuyLoading, error: playerBuyError }] = useMutation(HANDLE_BUY_PLAYER);
    const [handleRevertBuyMutation, { data: handleRevertBuyMutationData, loading: handleRevertBuyMutationLoading, error: handleRevertBuyMutationError }] = useMutation(HANDLE_RESET_BUY_PLAYER);
    const { loading, error, data, refetch } = useQuery(GET_SINGLE_AUCTION, {
        variables: { auctionId: params.auctionId },
    });
    const [teamCalc, setTeamCalc]= useState([]);
    const [open, setOpen] = useState(false);
    const [currentAuction, setCurrentAuction] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [drawerSelectedPlayer, setDrawerSelectedPlayer] = useState(null);
    const [currentBid, setCurrentBid] = useState(null);
    const [boughtPlayers, setBoughtPlayers] = useState([]);
    const [biddablePlayers, setBiddablePlayers] = useState([]);

    // useEffect(() => {
    //     if(selectedPlayerSubData && selectedPlayerSubData.auctionFeed && !selectedPlayerSubLoading && !selectedPlayerSubError) {
    //         console.log("selectedPlayerSubDataselectedPlayerSubDataselectedPlayerSubData", selectedPlayerSubData.auctionFeed)
    //     }
    // }, [playerBuyData, playerBuyLoading, playerBuyError])

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
        if (!loading && !error && data && data.getAuction && data.getAuction.auctionId) {
            console.log("AUCTIONJHXSJHB", data.getAuction.auctionDetails.auctionTeams)
            let addedPlayers = [];
            if (data?.getAuction?.auctionDetails?.auctionTeams && data.getAuction.auctionDetails.auctionTeams.length) {
                data.getAuction.auctionDetails.auctionTeams.map(team => {
                    team.teamPlayers.map(tp => {
                        addedPlayers.push(tp.player.userId)
                    })
                })
            }
            setBoughtPlayers(addedPlayers)
            setCurrentAuction(data.getAuction)
            setCurrentBid(data.getAuction.minimumBid)
        }
    }, [data, error, loading])

    const handleConfirmAuctionPlayer = async ({playerId, currentBid, currentTeam}) => {
        await handleBuyPlayer({
            variables: {
                playerId,
                teamId: currentTeam,
                bidAmount: currentBid,
                auctionId: currentAuction.auctionId
            },
          });
          setSelectedPlayer(null)
        console.log(playerId, currentBid, currentTeam)
        refetch();
    }

    const showDrawer = () => {
        console.log("asdnaslkxmaklsmx")
        setOpen(true);
    };

    const shiftPlayerToUnallocatedTable = async () => {
        console.log("asjnxakjsnxas", selectedPlayer.userId, currentAuction.auctionId);
        await handlePlayerShiftToUnAllocatedMutation({
            variables: {
                playerId: selectedPlayer.userId,
                auctionId: currentAuction.auctionId
            },
          });
          setSelectedPlayer(null)
        refetch();
    }

    const selectPlayer = async (userData) => {
        console.log("SELECTEDPLAYER", userData)
        await handlePlayerSelectMutation({
            variables: {
              playerId: userData.playerId,
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

    const handleRevertBuy = async (playerId, teamId) => {
        console.log("boom", playerId, teamId);
        await handleRevertBuyMutation({
            variables: {
                playerId,
                teamId,
                auctionId: currentAuction.auctionId
            },
          });
        console.log(playerId, teamId, currentAuction.auctionId)
        refetch();
    }

    useEffect(() => {
        let allTeamsData = currentAuction?.auctionDetails?.auctionTeams;
        if (allTeamsData && allTeamsData.length) {
            let teamsD = allTeamsData.map((team) => {
                let amountSpent = team.teamPlayers.reduce((total, num) => {
                    return total += num.soldFor
                  }, 0)
                let maxPlayersCanBuy = Math.floor(currentAuction.players.length/currentAuction.teams.length)
                let maxAmountAllowedForBid = ((maxPlayersCanBuy - team.teamPlayers.length) * currentAuction.minimumBid) + currentAuction.minimumBid 
                let balAfterBid = currentAuction.bucketWalletBalance - amountSpent - maxAmountAllowedForBid
                console.log("PROPS 1", balAfterBid <= currentBid - currentAuction.minimumBid || team.teamPlayers.length - 1 === maxPlayersCanBuy , team.team.teamName)
                return {
                    teamId: team.team.teamId,
                    teamName: team.team.teamName,
                    players: {
                        playersBought: team.teamPlayers.length,
                        amountSpent,
                        canBuy: balAfterBid <= currentBid - currentAuction.minimumBid || team.teamPlayers.length - 1 === maxPlayersCanBuy ? false : true
                    }
                }
            })
            console.log("teamsDteamsDteamsD", teamsD);
            setTeamCalc(teamsD)
        }
        console.log("ALL TEAMS DATA", allTeamsData);
    }, [currentBid])

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
                                <PlayersWidget teamCalc={teamCalc} shiftPlayerToUnallocatedTable={shiftPlayerToUnallocatedTable} minBid={currentAuction.minimumBid} handleConfirmAuctionPlayer={handleConfirmAuctionPlayer} showDrawer={showDrawer} currentBid={currentBid} setCurrentBid={setCurrentBid} handlePlayerIncreaseBidMutation={handlePlayerIncreaseBidMutation} currentAuction={currentAuction} selectPlayer={selectPlayer} setSelectedPlayer={setSelectedPlayer} selectedPlayer={selectedPlayer} setDrawerSelectedPlayer={setDrawerSelectedPlayer}/>
                                <RandomSelectButton boughtPlayers={boughtPlayers} selectPlayer={selectPlayer} currentAuction={currentAuction}/>
                                <AuctionDetails handleRevertBuy={handleRevertBuy} teamCalc={teamCalc} currentBid={currentBid} boughtPlayers={boughtPlayers} currentAuction={currentAuction} showDrawer={showDrawer} currentPlayers={currentAuction.players} handleDrawerSelectedPlayer={handleDrawerSelectedPlayer}/>
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