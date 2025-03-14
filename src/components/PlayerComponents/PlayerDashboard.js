import React, { useEffect, useState } from 'react';
import './playerDashboard.scss';
import { useQuery } from '@apollo/client';
import { Divider, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import Modal from '../UtilityComponents/ModalComponent';
import { GET_LOGGED_IN_USER, LOGGEDINPLAYERAUCTION } from '../../graphql/queries/userQueries';
import dayjs from 'dayjs';
import LoadingPage from '../UtilityComponents/LoadingPage';
// ----------------------------------------------- THIS IS THE DASHBOARD FOR THE PLAYER LOGIN --------------------------------------------------------------------------
const { Content } = Layout;

const PlayerDashboard = () => {
    const navigate = useNavigate();
    const {data: loggedInUserData, loading: loggedInUserLoading,error: loggedInUserError } = useQuery(GET_LOGGED_IN_USER);
    const {data: playerAuctionData, loading: playerAuctionLoading , error: playerAuctionError} = useQuery(LOGGEDINPLAYERAUCTION);

    const [openModal, setOpenModal] = useState(false)
    const [auctionedPlayer] = useState(null);
    const [currentUserData, setCurrentUserData] = useState(null);
    const [fetchedAuction, setFetchedAuctions] = useState([]);

    const handleLogout = () => {
        console.log("AM I CALLLDE");
    }

    // console.log("playerAuctionDataplayerAuctionDataplayerAuctionData", playerAuctionData, playerAuctionLoading, playerAuctionError)

    useEffect(() => {
        if (!playerAuctionLoading && !playerAuctionError && playerAuctionData && playerAuctionData.getPlayerAuctions && playerAuctionData.getPlayerAuctions.length) {
            console.log("aijsnxaksjxnajksnxkansxaknskxj", playerAuctionData);
            setFetchedAuctions(playerAuctionData.getPlayerAuctions)
        }
    }, [playerAuctionData, playerAuctionLoading, playerAuctionError])

    useEffect(() => {
        if (loggedInUserData && loggedInUserData.getMe && !loggedInUserLoading && !loggedInUserError) {
            console.log("aijsnx", loggedInUserData.getMe.auctions);
            setCurrentUserData(loggedInUserData.getMe);
        }
    }, [loggedInUserData, loggedInUserLoading, loggedInUserError])

    const handleSingleAuction = (auctionId) => {
        navigate(`/playerauction/${auctionId}`)
    }

    const renderCurrentAuctions = () => {
        console.log("data.ajsxba", fetchedAuction)
        if (fetchedAuction && fetchedAuction.length) {
            console.log("data.ajsxba", fetchedAuction, fetchedAuction.length)
            return fetchedAuction.map((auc) => auc && (
                <div className="aucCard" onClick={() => { handleSingleAuction(auc.auctionId) }}>
                    <div className="card">
                        <header className="card-header">
                            <p style={{ color: 'white', textAlign: 'center', fontSize: '20px' }}>{dayjs(auc.startTime).format('D MMM YY - h:mm a')}</p>
                            <Divider variant="dashed" style={{ borderColor: '#7cb305' }} dashed />
                            <div className="card-author">
                            <a className="author-avatar" href="/#">
                                <img
                                    height={50}
                                    width={50}
                                    className='auc_avt_img'
                                    alt="example"
                                    src={auc.sportName === "Cricket" ? "https://res.cloudinary.com/dfrmnqtwi/image/upload/v1735954806/ol3wjmj7k9oexbgql1hj.jpg" : ""}
                                />
                            </a>
                            <div className="author-name">
                                <span className='creatorNameStyle'>{auc.auctionName}</span>
                            </div>
                        </div>
                            <Divider variant="dashed" style={{ borderColor: '#7cb305' }} dashed />
                        </header>
                        <div className="tags">
                            <p style={{ color: 'white', textAlign: 'center', fontSize: '15px' }} className='card-bottom-p'>Creator : {auc?.createdBy?.firstName} {auc?.createdBy?.lastName}</p>
                            <p style={{ color: 'white', textAlign: 'center', fontSize: '15px' }} className='card-bottom-p'>Sport : {auc.sportName}</p>
                            <p style={{ color: 'white', textAlign: 'center', fontSize: '15px' }} className='card-bottom-p'>Venue : {auc.venue}</p>
                        </div>
                    </div>
                </div>
            ))
        }
    }
    return (
        <Content>
            {
                currentUserData ? (<>
                    {
                        auctionedPlayer && <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                        <div className="container">
                            <div style={{margin: "auto", textAlign:"center"}}><h2>Current Auctioned Player</h2></div>
                            <div className="top">
                                <div className="main">
                                    <ul>
                                        {/* <li className="dorsal">Rank 1</li> */}
                                        <li className="name">{`${auctionedPlayer.firstName} ${auctionedPlayer.lastName}`}</li>
                                        <li className="bar"></li>
                                        <li className="position">{auctionedPlayer.playerType}</li>
                                    </ul>
                                </div>
                                <div className="photo"></div>
                                <div className="info">
                                    <ul>
                                        <li className="header"><b>Batting Stats</b></li>
                                        <li className="header">{`${auctionedPlayer.battingHand} Hand - Bat`}</li>
                                        <li className="bar"></li>
                                        <li className="header">{`Innings : ${auctionedPlayer.stats.battingStats.innings}`}</li>
                                        <li className="header">{`Runs : ${auctionedPlayer.stats.battingStats.runs}`}</li>
                                        <li className="header">{`Strike Rate : ${Math.round(Number(auctionedPlayer.stats.battingStats.strikeRate))}`}</li>
                                        <li className="bar"></li>
                                    </ul>
                                </div>
                                <div className="info">
                                    <ul>
                                        <li className="header"><b>Bowling Stats</b></li>
                                        <li className="header">{`${auctionedPlayer.bowlingHand} Hand - Bowl`}</li>
                                        <li className="bar"></li>
                                        <li className="header">{`Innings : ${auctionedPlayer.stats.bowlingStats.overs}`}</li>
                                        <li className="header">{`Wickets : ${auctionedPlayer.stats.bowlingStats.wickets}`}</li>
                                        <li className="header">{`Economy : ${Number(auctionedPlayer.stats.bowlingStats.economy).toFixed(2)}`}</li>
                                        <li className="bar"></li>
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
                                <a className="navbar-brand" href="/#">Logo</a>
                            </div>
                            <div className="collapse navbar-collapse" id="myNavbar">
                                <ul className="nav navbar-nav">
                                    <li className="active"><a href="/#">Dashboard</a></li>
                                    <li onClick={handleLogout}><a href="/#">Logout</a></li>
                                    <li><a href="/#">teams</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
    
                    <div className="container-fluid">
                        <div className="row content">
                            {/* Sidebar */}
                            <div className="col-sm-2 sidenav hidden-xs">
                                <h2>Logo</h2>
                                <ul className="nav nav-pills nav-stacked">
                                    <li className="active"><a href="#section1">Auctions</a></li>
                                    <li onClick={handleLogout}><a>Logout</a></li>
                                    <li><a href="/#">teams</a></li>
                                </ul><br />
                            </div>
                            <br />
                            {/* Content */}
                            <div className="col-sm-10">
                                <div className="well">
                                    <div className='d-flex justify-content-start'><h4>Player Dashboard</h4></div>
                                    <div className='d-flex justify-content-end'><h4>Welcome {currentUserData.firstName} {currentUserData.lastName}</h4></div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div style={{display: "flex", overflowX: "scroll"}} className="well">
                                        {renderCurrentAuctions()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>) : <LoadingPage />
            }
        </Content>
    )
}

export default PlayerDashboard