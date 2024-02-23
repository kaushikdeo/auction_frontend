import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GET_VIEWER_AUCTIONS } from '../../graphql/queries/userQueries';
import "./viewerAuctionList.scss"

const ViewerAuctionList = () => {
    const navigate = useNavigate();
    const [fetchedAuction, setFetchedAuctions] = useState([]);
    const {data: viewerAuctionData, loading: viewerAuctionLoading , error: viewerAuctionError} = useQuery(GET_VIEWER_AUCTIONS);
    useEffect(() => {
        console.log("viewerAuctionDataviewerAuctionData", viewerAuctionData);
        if (!viewerAuctionLoading && !viewerAuctionError && viewerAuctionData && viewerAuctionData.getViewerAuctions && viewerAuctionData.getViewerAuctions.length) {
            console.log("aijsnxaksjxnajksnxkansxaknskxj", viewerAuctionData);
            setFetchedAuctions(viewerAuctionData.getViewerAuctions)
        }
    }, [viewerAuctionData, viewerAuctionLoading, viewerAuctionError])

    const handleSingleAuction = (auctionId) => {
        console.log("auctionIdaucsssstionId", auctionId)
        navigate(`/viewerAuction/${auctionId}`)
    }

    const renderCurrentAuctions = () => {
        console.log("data.ajsxba", fetchedAuction)
        if (fetchedAuction && fetchedAuction.length) {
            console.log("data.ajsxba", fetchedAuction, fetchedAuction.length)
            return fetchedAuction.map((auc) => auc && (
                <div className="aucCard" onClick={() => { handleSingleAuction(auc.auctionId) }}>
                    <div className="card">
                        <header className="card-header">
                            {/* <p style={{ color: 'white' }}>{dayjs(auc.startTime).format('D MMM YY - h:mm a')}</p> */}
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
                        </div>
                        <div className="tags">
                            <p style={{ color: 'white' }} className='card-bottom-p'>Sport : {auc.sportName}</p>
                        </div>
                    </div>
                </div>
            ))
        }
    }

  return (
    <div className='viewerContainer'>
        <h4>Viewer Auctions List</h4>
        <div className="row">
            <div className="col-sm-12">
                <div style={{display: "flex", overflowX: "scroll"}} className="well">
                    {renderCurrentAuctions()}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewerAuctionList