import React, { useEffect, useState, memo } from 'react';
import { Layout } from 'antd';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { clearItem } from '../../utils/localStore'
import { GET_AUCTIONS } from '../../graphql/queries/auctionQueries';
import dayjs from 'dayjs';
import { useAuthContext } from '../../hooks/useAuthContext';
import './AuctioneerDashboard.scss'

const { Content } = Layout;

const AuctionnerDashboard = () => {
    const [currentTab, setCurrentTab] = useState('current');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const { user, dispatch } = useAuthContext();
    const { data, loading, error } = useQuery(GET_AUCTIONS);

    console.log("I AM IN AUCTIONEER DASH", data, user)
    
    const handleLogout = () => {
        console.log("AM I CALLLDE", user);
        clearItem("auth_token")
        dispatch({ type: 'LOGOUT', payload: { user: null } })
        navigate("/");
    }

    const handleNewAuction = () => {
        navigate("/newAuction");
    }

    const handleConnections = () => {
        navigate("/connections");
    }

    const handleSingleAuction = (auctionId) => {
        navigate(`/auction/${auctionId}`)
    }

    const renderCurrentAuctions = () => {
        if (data && data.auctions && data.auctions.length) {
            return data.auctions.map((auc) => (
                <div 
                    key={auc.auctionId}
                    className="auction-card" 
                    onClick={() => handleSingleAuction(auc.auctionId)}
                >
                    <div className="auction-card-header">
                        <span className="auction-date">{dayjs(auc.startTime).format('D MMM YY - h:mm a')}</span>
                    </div>
                    <div className="auction-card-body">
                        <div className="auction-icon">
                            <img
                                className='auction-icon-img'
                                alt={auc.sportName}
                                src={auc.sportName && auc.sportName.includes("Cricket") ? "https://res.cloudinary.com/dfrmnqtwi/image/upload/v1735954806/ol3wjmj7k9oexbgql1hj.jpg" : ""}
                            />
                        </div>
                        <h3 className='auction-title'>{auc.auctionName}</h3>
                    </div>
                    <div className="auction-card-footer">
                        <div className="auction-detail">
                            <span className="detail-label">Creator</span>
                            <span className="detail-value">{auc?.createdBy?.firstName} {auc?.createdBy?.lastName}</span>
                        </div>
                        <div className="auction-detail">
                            <span className="detail-label">Sport</span>
                            <span className="detail-value">{auc.sportName}</span>
                        </div>
                        <div className="auction-detail">
                            <span className="detail-label">Venue</span>
                            <span className="detail-value">{auc.venue}</span>
                        </div>
                    </div>
                </div>
            ))
        }
        return <div className="no-auctions">No current auctions</div>
    }

    const renderPastAuctions = () => {
        return <div className="no-auctions">No past auctions</div>
    };
    return (
        <Content className="auctioneer-dashboard">
            <div className="dashboard-sidebar">
                <div className="sidebar-header">
                    <h2 className="sidebar-logo">Fantasy Hammer</h2>
                </div>
                <nav className="sidebar-nav">
                    <a href="#" className="nav-item active">
                        <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7"/>
                            <rect x="14" y="3" width="7" height="7"/>
                            <rect x="14" y="14" width="7" height="7"/>
                            <rect x="3" y="14" width="7" height="7"/>
                        </svg>
                        <span>Auctions</span>
                    </a>
                    <a onClick={handleNewAuction} className="nav-item">
                        <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        <span>New Auction</span>
                    </a>
                    <a onClick={handleConnections} className="nav-item">
                        <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        <span>Connections</span>
                    </a>
                    <a onClick={handleLogout} className="nav-item nav-logout">
                        <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                            <polyline points="16 17 21 12 16 7"/>
                            <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                        <span>Logout</span>
                    </a>
                </nav>
            </div>

            <div className="dashboard-main">
                <div className="dashboard-header">
                    <div className="header-content">
                        <div>
                            <h1 className="header-title">Auctioneer Dashboard</h1>
                            <p className="header-subtitle">Manage auction lifecycle</p>
                        </div>
                        <div className="header-user">
                            <span className="user-name">
                                {user && user.user && user.user.firstName && user.user.lastName 
                                    ? `${user.user.firstName} ${user.user.lastName}` 
                                    : ""}
                            </span>
                            <div className="user-avatar">
                                {user && user.user && user.user.firstName 
                                    ? user.user.firstName.charAt(0).toUpperCase() 
                                    : "U"}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dashboard-content">
                    <div className="tabs-container">
                        <div className="tabs-header">
                            <button 
                                className={`tab-button ${currentTab === 'current' ? 'active' : ''}`}
                                onClick={() => setCurrentTab('current')}
                            >
                                Current Auctions
                            </button>
                            <button 
                                className={`tab-button ${currentTab === 'past' ? 'active' : ''}`}
                                onClick={() => setCurrentTab('past')}
                            >
                                Past Auctions
                            </button>
                        </div>

                        <div className="tabs-content">
                            {currentTab === 'current' && (
                                <div className="auctions-grid">
                                    {renderCurrentAuctions()}
                                </div>
                            )}
                            {currentTab === 'past' && (
                                <div className="auctions-grid">
                                    {renderPastAuctions()}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
};

export default memo(AuctionnerDashboard);