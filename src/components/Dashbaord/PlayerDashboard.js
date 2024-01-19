import React, { useEffect, useState } from 'react';
import './playerDashboard.scss';
import { useSubscription } from '@apollo/client';
import { Layout } from 'antd';
import { HANDLE_PLAYER_SELECT_SUBSCRIPTION } from '../../graphql/subscriptions/auctionSubscriptions';
import Modal from '../UtilityComponents/ModalComponent';

const { Content } = Layout;

const PlayerDashboard = () => {
    const { data: selectedPlayerSubData, loading: selectedPlayerSubLoading, error: selectedPlayerSubError } = useSubscription(HANDLE_PLAYER_SELECT_SUBSCRIPTION);

    const [openModal, setOpenModal] = useState(false)
    const [auctionedPlayer, setAuctionedPlayer] = useState(null);

    const handleLogout = () => {
        console.log("AM I CALLLDE");
    }

    useEffect(() => {
        if (selectedPlayerSubData && selectedPlayerSubData.auctionFeed && selectedPlayerSubData.auctionFeed.user && selectedPlayerSubData.auctionFeed.auctionId && !selectedPlayerSubLoading && !selectedPlayerSubError) {
            console.log("dhhdhajbshdbajhsdbakhsdbajhbsdjahbdhj", selectedPlayerSubData.auctionFeed)
            setAuctionedPlayer(selectedPlayerSubData.auctionFeed.user);
            setOpenModal(!openModal)
        }
    }, [selectedPlayerSubData, selectedPlayerSubLoading, selectedPlayerSubError])

    return (
        <Content>
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
                    <div className="col-sm-1 sidenav hidden-xs">
                        <h2>Logo</h2>
                        <ul className="nav nav-pills nav-stacked">
                            <li className="active"><a href="#section1">Auctions</a></li>
                            <li onClick={handleLogout}><a>Logout</a></li>
                            <li><a href="#">teams</a></li>
                        </ul><br />
                    </div>
                    <br />
                    <div className="col-sm-11">
                        <div className="well">
                            <div className='d-flex justify-content-end'><h4>Player Dashboard</h4></div>
                            <div className='d-flex justify-content-end'><h4>Welcome { }</h4></div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="well">
                                    <h4>Auctions</h4>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="well">
                                    <h4>Pages</h4>
                                    <p>100 Million</p>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="well">
                                    <h4>Sessions</h4>
                                    <p>10 Million</p>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="well">
                                    <h4>Bounce</h4>
                                    <p>30%</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="well">
                                    <p>Text</p>
                                    <p>Text</p>
                                    <p>Text</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="well">
                                    <p>Text</p>
                                    <p>Text</p>
                                    <p>Text</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="well">
                                    <p>Text</p>
                                    <p>Text</p>
                                    <p>Text</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-8">
                                <div className="well">
                                    <p>Text</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="well">
                                    <p>Text</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    )
}

export default PlayerDashboard