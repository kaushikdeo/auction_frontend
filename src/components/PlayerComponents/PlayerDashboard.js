import React, { useEffect, useState } from 'react';
import './playerDashboard.scss';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Modal from '../UtilityComponents/ModalComponent';
import { GET_LOGGED_IN_USER, LOGGEDINPLAYERAUCTION } from '../../graphql/queries/userQueries';
import dayjs from 'dayjs';
import LoadingPage from '../UtilityComponents/LoadingPage';
import PlayerSidebar from './PlayerSidebar';
import HardwareIcon from '@mui/icons-material/Hardware';

const PlayerDashboard = () => {
    const navigate = useNavigate();
    const {data: loggedInUserData, loading: loggedInUserLoading,error: loggedInUserError } = useQuery(GET_LOGGED_IN_USER);
    const {data: playerAuctionData, loading: playerAuctionLoading , error: playerAuctionError} = useQuery(LOGGEDINPLAYERAUCTION);

    const [openModal, setOpenModal] = useState(false)
    const [auctionedPlayer] = useState(null);
    const [currentUserData, setCurrentUserData] = useState(null);
    const [fetchedAuction, setFetchedAuctions] = useState([]);

    useEffect(() => {
        if (!playerAuctionLoading && !playerAuctionError && playerAuctionData && playerAuctionData.getPlayerAuctions && playerAuctionData.getPlayerAuctions.length) {
            setFetchedAuctions(playerAuctionData.getPlayerAuctions)
        }
    }, [playerAuctionData, playerAuctionLoading, playerAuctionError])

    useEffect(() => {
        if (loggedInUserData && loggedInUserData.getMe && !loggedInUserLoading && !loggedInUserError) {
            setCurrentUserData(loggedInUserData.getMe);
        }
    }, [loggedInUserData, loggedInUserLoading, loggedInUserError])

    const handleSingleAuction = (auctionId) => {
        navigate(`/playerauction/${auctionId}`)
    }

    const renderCurrentAuctions = () => {
        if (fetchedAuction && fetchedAuction.length) {
            return fetchedAuction.map((auc) => auc && (
                <div key={auc.auctionId} className="auction-card" onClick={() => { handleSingleAuction(auc.auctionId) }}>
                    <div className="card-header">
                        <span className="auction-title">{auc.auctionName}</span>
                        <span className="auction-sport">{auc.sportName}</span>
                    </div>
                    <div className="card-body">
                        <div className="info-row">
                            <span className="label">Start Time</span>
                            <span className="value">{dayjs(auc.startTime).format('D MMM YY - h:mm a')}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Venue</span>
                            <span className="value">{auc.venue}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Creator</span>
                            <span className="value">{auc?.createdBy?.firstName} {auc?.createdBy?.lastName}</span>
                        </div>
                    </div>
                    <div className="card-footer">
                        <span className="status-badge">Active</span>
                    </div>
                </div>
            ));
        }
        return <div style={{ color: '#a1a1aa', padding: '20px' }}>No active auctions found.</div>;
    }

    if (loggedInUserLoading) return <LoadingPage />;

    return (
        <div className="player-dashboard-container">
            <PlayerSidebar />
            <div className="dashboard-content">
                {currentUserData ? (
                    <>
                        {auctionedPlayer && <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                            <div className="player-dashboard-content">
                                <h2>Current Auctioned Player</h2>
                                <div className="player-info-section" style={{marginBottom: '24px', textAlign: 'center'}}>
                                    <span className="player-name">{`${auctionedPlayer.firstName} ${auctionedPlayer.lastName}`}</span>
                                    <span className="player-role">{auctionedPlayer.playerType}</span>
                                </div>
                                <div className="player-card-grid">
                                    <div className="player-info-section">
                                        <h3>Batting Stats</h3>
                                        <div className="stat-row">
                                            <span className="label">Style</span>
                                            <span className="value">{auctionedPlayer.battingHand}</span>
                                        </div>
                                        <div className="stat-row">
                                            <span className="label">Innings</span>
                                            <span className="value">{auctionedPlayer.stats.battingStats.innings}</span>
                                        </div>
                                        <div className="stat-row">
                                            <span className="label">Runs</span>
                                            <span className="value">{auctionedPlayer.stats.battingStats.runs}</span>
                                        </div>
                                        <div className="stat-row">
                                            <span className="label">Strike Rate</span>
                                            <span className="value">{Math.round(Number(auctionedPlayer.stats.battingStats.strikeRate))}</span>
                                        </div>
                                    </div>
                                    <div className="player-info-section">
                                        <h3>Bowling Stats</h3>
                                        <div className="stat-row">
                                            <span className="label">Style</span>
                                            <span className="value">{auctionedPlayer.bowlingHand}</span>
                                        </div>
                                        <div className="stat-row">
                                            <span className="label">Innings</span>
                                            <span className="value">{auctionedPlayer.stats.bowlingStats.overs}</span>
                                        </div>
                                        <div className="stat-row">
                                            <span className="label">Wickets</span>
                                            <span className="value">{auctionedPlayer.stats.bowlingStats.wickets}</span>
                                        </div>
                                        <div className="stat-row">
                                            <span className="label">Economy</span>
                                            <span className="value">{Number(auctionedPlayer.stats.bowlingStats.economy).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal>}

                        <header className="dashboard-header">
                            <h1>Player Dashboard</h1>
                            <div className="welcome-text">
                                Welcome, <span>{currentUserData.firstName} {currentUserData.lastName}</span>
                            </div>
                        </header>

                        <main className="dashboard-main">
                            <div className="section-title">
                                <HardwareIcon sx={{ color: '#d97706' }} />
                                Current Auctions
                            </div>
                            <div className="auctions-grid">
                                {renderCurrentAuctions()}
                            </div>
                        </main>
                    </>
                ) : <LoadingPage />}
            </div>
        </div>
    )
}

export default PlayerDashboard;
