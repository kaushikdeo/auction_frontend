import React, { useEffect, useState, memo } from 'react';
import { Layout, Card, Col, Tabs, Avatar, Divider } from 'antd';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { clearItem, setItem } from '../../utils/localStore'
import { Button } from 'antd';
import { GET_AUCTIONS } from '../../graphql/queries/auctionQueries';
import { EditOutlined, ExpandOutlined, DeleteOutlined } from '@ant-design/icons';
import NewAuction from '../Auctions/NewAuction';
import dayjs from 'dayjs';
import { useAuthContext } from '../../hooks/useAuthContext';
import DashHeader from '../LayoutComponents/DashHeader';
import DashSideBar from './DashSideBar';
import './AuctioneerDashboard.scss'

const { Content } = Layout;
const { Meta } = Card;

const AuctionnerDashboard = () => {
    const [fetchedAuction, setFetchedAuctions] = useState([]);
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

    const handlego = (aucId) => {
        console.log("I am in go", aucId)
    }

    useEffect(() => {
        if (data && data.auctions.length) {
            console.log("DATTATATAAA", data);
            let aucTabs = data.auctions.map((auc) => {
                return {
                    key: '1',
                    label: 'Current Auctions',
                    children: <Col key={auc.auctionId} span={8}>
                        <Card title="Card title" bordered={false}>
                            <Button type="primary">Primary Button</Button>
                            <p>Name : {auc.auctionName}</p>
                            <p>Auction Start : {dayjs(auc.startTime).format('D MMM YY - h:mm a')}</p>
                            <p>Sport : {auc.sportName}</p>
                        </Card>
                    </Col>,
                },
                {
                    key: '2',
                    label: 'Past Auctions',
                    children: <Col key={auc.auctionId} span={8}>
                        <Card title="Card title" bordered={false}>
                            <Button type="primary">Primary Button</Button>
                            <p>Name : {auc.auctionName}</p>
                            <p>Auction Start : {dayjs(auc.startTime).format('D MMM YY - h:mm a')}</p>
                            <p>Sport : {auc.sportName}</p>
                        </Card>
                    </Col>,
                }
            })
            setFetchedAuctions(aucTabs);
        }
    }, [data, error, loading])

    const handleNewAuction = () => {
        navigate("/newAuction");
    }

    const handleConnections = () => {
        navigate("/connections");
    }

    const renderPastAuctions = () => {
        if (data && data.auctions && data.auctions.length) {
            console.log("data.auctions", data.auctions)
            return data.auctions.map((auc) => {
                <Col key={auc.auctionId} span={8}>
                    <Card title="Card title" bordered={false}>
                        <p>Name : {auc.auctionName}</p>
                        <p>Auction Start : {dayjs(auc.startTime).format('D MMM YY - h:mm a')}</p>
                        <p>Sport : {auc.sportName}</p>
                    </Card>
                </Col>
            })
        }
    }
    const handleEdit = (aucId) => {
        console.log("I AM GETTING CALLED IN EDIT", aucId)
    }

    const handleSingleAuction = (auctionId) => {
        navigate(`/auction/${auctionId}`)
    }

    const renderCurrentAuctions = () => {
        console.log("data.ajsxba", data && data.auctions && data.auctions.length)
        if (data && data.auctions && data.auctions.length) {
            console.log("data.ajsxba", data && data.auctions && data.auctions.length)
            return data.auctions.map((auc) => (
                <div className="aucCard" onClick={() => { handleSingleAuction(auc.auctionId) }}>
                    <div className="card">
                        <header className="card-header">
                            <p style={{ color: 'white', textAlign: 'center', fontSize: '20px' }}>{dayjs(auc.startTime).format('D MMM YY - h:mm a')}</p>
                            <Divider variant="dashed" style={{ borderColor: '#7cb305' }} dashed />
                            <div className="card-author">
                            <a className="author-avatar" href="#">
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

    console.log("RENSER CURRENRT CUSTIONS", renderCurrentAuctions())

    const onChange = (key) => {
        console.log(key);
    };
    return (
        <Content>
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
                            <li onClick={handleNewAuction}><a href="#">New Auction</a></li>
                            <li><a href="#">Teams</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container-fluid">
                <div className="row content">
                    <DashSideBar handleNewAuction={handleNewAuction} handleLogout={handleLogout} handleConnections={handleConnections}/>
                    <br />
                    <div className="col-sm-10">
                        <DashHeader type={"Auctioneer"} useName={user && user.user && user.user && user.user.firstName && user.user.lastName ? `${user.user.firstName} ${user.user.lastName}` : ""} />
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="well">
                                    <h4>Auctions</h4>
                                    <Tabs defaultActiveKey="1">
                                        <Tabs.TabPane tab="Current Auctions" key="1">
                                            <div className="scrolling-wrapper" >
                                                {renderCurrentAuctions()}
                                            </div>
                                        </Tabs.TabPane>
                                        <Tabs.TabPane tab="Past Auctions" key="2">
                                            <div className="scrolling-wrapper">
                                                {renderPastAuctions()}
                                            </div>
                                        </Tabs.TabPane>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
};

export default memo(AuctionnerDashboard);