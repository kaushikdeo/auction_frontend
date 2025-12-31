import { useQuery, useSubscription } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GET_SINGLE_AUCTION_FOR_VIEWER } from '../../graphql/queries/auctionQueries';
import { HANDLE_BID_FEED, HANDLE_PLAYER_BUY_FEED, HANDLE_PLAYER_SELECT_SUBSCRIPTION } from '../../graphql/subscriptions/auctionSubscriptions';
import PlayerProfileCard from '../playerProfile/PlayerProfile';
import { convertNumbers } from '../../utils/utility';
import LoadingPage from '../UtilityComponents/LoadingPage';
import './viewerSingleAuction.scss';

const ViewerSingleAuction = () => {
    const [fetchedAuction, setFetchedAuction] = useState();
    const [selectedPlayer, setSelectedPlayer] = useState();
    const [currentBid, setCurrentBid] = useState(0)
    const params = useParams();
    console.log("PARAMS", params)
    const { loading, error, data, refetch } = useQuery(GET_SINGLE_AUCTION_FOR_VIEWER, {variables: { auctionId: params.auctionId },});
    const { data: selectedPlayerSubData, loading: selectedPlayerSubLoading, error: selectedPlayerSubError } = useSubscription(HANDLE_PLAYER_SELECT_SUBSCRIPTION);
    const { data: bidFeedData, loading: bidFeedLoading, error: bidFeedError } = useSubscription(HANDLE_BID_FEED);
    const { data: buyFeedData, loading: buyFeedLoading, error: buyFeedError } = useSubscription(HANDLE_PLAYER_BUY_FEED);
    console.log("aslkjxakjsnxajsx", bidFeedData, buyFeedData, selectedPlayerSubData, selectedPlayerSubLoading, selectedPlayerSubError);
    useEffect(() => {
        if(!loading && !error && data && data.getAuctionDetailsForViewer && data.getAuctionDetailsForViewer.auctionName) {
            console.log("AUCTIONJHXSJHB", data)
            const auctionData = data.getAuctionDetailsForViewer;
            setFetchedAuction(auctionData);
            
            if (auctionData.selectedPlayer) {
                setSelectedPlayer(auctionData.selectedPlayer);
                setCurrentBid(auctionData.currentPlayerBid || auctionData.minimumBid);
            }
        }
    }, [data, error, loading])
    useEffect(() => {
        if(selectedPlayerSubData && !selectedPlayerSubLoading && !selectedPlayerSubError && selectedPlayerSubData.auctionFeed && selectedPlayerSubData.auctionFeed.auctionId && selectedPlayerSubData.auctionFeed.auctionId === fetchedAuction.auctionId) {
            console.log("selectedPlayerSubDataselectedPlayerSubDataselectedPlayerSubData", selectedPlayerSubData, fetchedAuction.auctionId)
            setSelectedPlayer(selectedPlayerSubData.auctionFeed.user)
            setCurrentBid(fetchedAuction.minimumBid)
        }
    }, [selectedPlayerSubData, selectedPlayerSubLoading, selectedPlayerSubError])
    useEffect(() => {
        if(bidFeedData && !bidFeedLoading & !bidFeedError && bidFeedData.bidFeed &&  bidFeedData.bidFeed.auctionId && bidFeedData.bidFeed.auctionId === fetchedAuction.auctionId) {
            setCurrentBid(bidFeedData.bidFeed.bidAmount)
        }
        console.log("bidFeedDatabidFeedData", bidFeedData);
    }, [bidFeedData, bidFeedLoading, bidFeedError])

    useEffect(() => {
        console.log("buyFeedDatabuyFeedData", buyFeedData);
        if (buyFeedData && !buyFeedLoading && !buyFeedError && buyFeedData.buyFeed && buyFeedData.buyFeed.auctionId &&  buyFeedData.buyFeed.auctionId === fetchedAuction.auctionId) {
            setCurrentBid(0);
            setSelectedPlayer(null);
        }
    }, [buyFeedData, buyFeedLoading, buyFeedError])
    if (fetchedAuction?.auctionName) {
        return (
            <div className='viewer-auction-container'>
                <div className="viewer-auction-header">
                    <div className="auction-title-badge">
                        <span className="auction-live-indicator"></span>
                        <h1 className="auction-title">{fetchedAuction.auctionName}</h1>
                    </div>
                </div>
                
                <div className="viewer-auction-content">
                    <div className="current-bid-section">
                        <div className="bid-label">Current Bid</div>
                        <div className="bid-amount">{convertNumbers(currentBid)}</div>
                    </div>

                    <div className="player-profile-section">
                        <PlayerProfileCard selectedPlayer={selectedPlayer} showStats={fetchedAuction?.showPlayerStats}/>
                    </div>
                </div>
            </div>
          )
    } else {
        return <LoadingPage />
    }
}

export default ViewerSingleAuction