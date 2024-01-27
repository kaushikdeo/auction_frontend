import React, { useEffect, useState } from 'react';
import './playerDashboard.scss';
import { useQuery, useSubscription } from '@apollo/client';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HANDLE_PLAYER_SELECT_SUBSCRIPTION } from '../../graphql/subscriptions/auctionSubscriptions';
import Modal from '../UtilityComponents/ModalComponent';
import { GET_LOGGED_IN_USER, LOGGEDINPLAYERAUCTION } from '../../graphql/queries/userQueries';
import PlayerProfileCard from '../playerProfile/PlayerProfile';
import dayjs from 'dayjs';
// ----------------------------------------------- THIS IS THE DASHBOARD FOR THE PLAYER LOGIN --------------------------------------------------------------------------
const { Content } = Layout;

const PlayerDashboard = () => {
    const navigate = useNavigate();
    const { data: selectedPlayerSubData, loading: selectedPlayerSubLoading, error: selectedPlayerSubError } = useSubscription(HANDLE_PLAYER_SELECT_SUBSCRIPTION);
    const {data: loggedInUserData,loading: loggedInUserLoading,error: loggedInUserError } = useQuery(GET_LOGGED_IN_USER);
    const {data,loading,error} = useQuery(LOGGEDINPLAYERAUCTION);

    const [openModal, setOpenModal] = useState(false)
    const [auctionedPlayer, setAuctionedPlayer] = useState(null);
    const [currentUserData, setCurrentUserData] = useState(null);
    const [fetchedAuction, setFetchedAuctions] = useState([]);

    const handleLogout = () => {
        console.log("AM I CALLLDE");
    }

    useState(() => {
        console.log("playerAuctionDataplayerAuctionDataplayerAuctionData", data, loading, error)
        if (data && !error) {
            if (data.getPlayerAuctions && data.getPlayerAuctions.length) {
                setFetchedAuctions(data.getPlayerAuctions);
            }
        }
    }, [data, loading, error])

    useEffect(() => {
        if (loggedInUserData && loggedInUserData.getMe && !loggedInUserLoading && !loggedInUserError) {
            console.log("aijsnx", loggedInUserData.getMe);
            setCurrentUserData(loggedInUserData.getMe);
        }
    }, [loggedInUserData, loggedInUserLoading, loggedInUserError])

    useEffect(() => {
        if (selectedPlayerSubData && selectedPlayerSubData.auctionFeed && selectedPlayerSubData.auctionFeed.user && selectedPlayerSubData.auctionFeed.auctionId && !selectedPlayerSubLoading && !selectedPlayerSubError) {
            console.log("dhhdhajbshdbajhsdbakhsdbajhbsdjahbdhj", selectedPlayerSubData.auctionFeed)
            setAuctionedPlayer(selectedPlayerSubData.auctionFeed.user);
            setOpenModal(!openModal)
        }
    }, [selectedPlayerSubData, selectedPlayerSubLoading, selectedPlayerSubError])

    const handleSingleAuction = (auctionId) => {
        navigate(`/playerauction/${auctionId}`)
    }

    const renderCurrentAuctions = () => {
        console.log("data.ajsxba", fetchedAuction && fetchedAuction.length)
        if (fetchedAuction && fetchedAuction.length) {
            console.log("data.ajsxba", fetchedAuction, fetchedAuction.length)
            return fetchedAuction.map((auc) => (
                <div className="aucCard" onClick={() => { handleSingleAuction(auc.auctionId) }}>
                    <div className="card">
                        <header className="card-header">
                            <p style={{ color: 'white' }}>{dayjs(auc.startTime).format('D MMM YY - h:mm a')}</p>
                            <span style={{ color: 'white' }} className="title">{auc.auctionName}</span>
                        </header>
                        <div className="card-author">
                            <a className="author-avatar" href="#">
                                <span><img
                                    alt="example"
                                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                /></span>
                            </a>
                            <svg className="half-circle" viewBox="0 0 106 57">
                                <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                            </svg>
                            <div className="author-name">
                                <div className="author-name-prefix">Creator</div> Kaushik Deo
                            </div>
                        </div>
                        <div className="tags">
                            <p style={{ color: 'white' }} className='card-bottom-p'>Sport : {auc.sportName}</p>
                        </div>
                    </div>
                </div>
            ))
        }
    }

    console.log("kajsnkjasnxkjnskanxkajsnkajsnxa", fetchedAuction);
    return (
        <Content>
            {
                currentUserData ? (<>
                    {
                        auctionedPlayer && <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                        <div class="container">
                            <div style={{margin: "auto", textAlign:"center"}}><h2>Current Auctioned Player</h2></div>
                            <div class="top">
                                <div class="main">
                                    <ul>
                                        {/* <li class="dorsal">Rank 1</li> */}
                                        <li class="name">{`${auctionedPlayer.firstName} ${auctionedPlayer.lastName}`}</li>
                                        <li class="bar"></li>
                                        <li class="position">{auctionedPlayer.playerType}</li>
                                    </ul>
                                </div>
                                <div class="photo"></div>
                                <div class="info">
                                    <ul>
                                        <li class="header"><b>Batting Stats</b></li>
                                        <li class="header">{`${auctionedPlayer.battingHand} Hand - Bat`}</li>
                                        <li class="bar"></li>
                                        <li class="header">{`Innings : ${auctionedPlayer.stats.battingStats.innings}`}</li>
                                        <li class="header">{`Runs : ${auctionedPlayer.stats.battingStats.runs}`}</li>
                                        <li class="header">{`Strike Rate : ${Math.round(Number(auctionedPlayer.stats.battingStats.strikeRate))}`}</li>
                                        <li class="bar"></li>
                                    </ul>
                                </div>
                                <div class="info">
                                    <ul>
                                        <li class="header"><b>Bowling Stats</b></li>
                                        <li class="header">{`${auctionedPlayer.bowlingHand} Hand - Bowl`}</li>
                                        <li class="bar"></li>
                                        <li class="header">{`Innings : ${auctionedPlayer.stats.bowlingStats.overs}`}</li>
                                        <li class="header">{`Wickets : ${auctionedPlayer.stats.bowlingStats.wickets}`}</li>
                                        <li class="header">{`Economy : ${Number(auctionedPlayer.stats.bowlingStats.economy).toFixed(2)}`}</li>
                                        <li class="bar"></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Modal>
                    }
                    <nav className="navbar navbar-inverse visible-xs">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href="#">Logo</a>
                            </div>
                            <div className="collapse navbar-collapse" id="myNavbar">
                                <ul className="nav navbar-nav">
                                    <li className="active"><a href="#">Dashboard</a></li>
                                    <li onClick={handleLogout}><a href="#">Logout</a></li>
                                    <li><a href="#">teams</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
    
                    <div className="container-fluid">
                        <div className="row content">
                            {/* Sidebar */}
                            <div className="col-sm-1 sidenav hidden-xs">
                                <h2>Logo</h2>
                                <ul className="nav nav-pills nav-stacked">
                                    <li className="active"><a href="#section1">Auctions</a></li>
                                    <li onClick={handleLogout}><a>Logout</a></li>
                                    <li><a href="#">teams</a></li>
                                </ul><br />
                            </div>
                            <br />
                            {/* Content */}
                            <div className="col-sm-11">
                                <div className="well">
                                    <div className='d-flex justify-content-start'><h4>Player Dashboard</h4></div>
                                    <div className='d-flex justify-content-end'><h4>Welcome {currentUserData.firstName} {currentUserData.lastName}</h4></div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="well">
                                        {renderCurrentAuctions()}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="well">
                                        <PlayerProfileCard selectedPlayer={currentUserData}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>) : <div>LOADING . . . .. . </div>
            }
        </Content>
    )
}

export default PlayerDashboard