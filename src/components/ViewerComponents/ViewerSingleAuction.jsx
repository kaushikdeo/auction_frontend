import { useQuery, useSubscription } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GET_SINGLE_AUCTION_FOR_VIEWER } from '../../graphql/queries/auctionQueries';
import { HANDLE_BID_FEED, HANDLE_PLAYER_BUY_FEED, HANDLE_PLAYER_SELECT_SUBSCRIPTION } from '../../graphql/subscriptions/auctionSubscriptions';
import PlayerProfileCard from '../playerProfile/PlayerProfile';
import { convertNumbers } from '../../utils/utility';
import LoadingPage from '../UtilityComponents/LoadingPage';

const ViewerSingleAuction = () => {
    const [fetchedAuction, setFetchedAuction] = useState();
    const [selectedPlayer, setSelectedPlayer] = useState();
    const [currentBid, setCurrentBid] = useState(0)
    const params = useParams();
    console.log("PARAMS", params)
    const { loading, error, data, refetch } = useQuery(GET_SINGLE_AUCTION_FOR_VIEWER, {variables: { auctionId: params.auctionId },});
    const { data: selectedPlayerSubData, loading: selectedPlayerSubLoading, error: selectedPlayerSubError } = useSubscription(HANDLE_PLAYER_SELECT_SUBSCRIPTION);
    // bid update for a selected player
    const { data: bidFeedData, loading: bidFeedLoading, error: bidFeedError } = useSubscription(HANDLE_BID_FEED);
    // player bought update
    const { data: buyFeedData, loading: buyFeedLoading, error: buyFeedError } = useSubscription(HANDLE_PLAYER_BUY_FEED);
    console.log("aslkjxakjsnxajsx", bidFeedData, buyFeedData, selectedPlayerSubData, selectedPlayerSubLoading, selectedPlayerSubError);
    useEffect(() => {
        if(!loading && !error && data && data.getAuctionDetailsForViewer && data.getAuctionDetailsForViewer.auctionName) {
            console.log("AUCTIONJHXSJHB", data)
            setFetchedAuction(data.getAuctionDetailsForViewer);
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
            <div className='viewerContainer'>
                <div><h4>{fetchedAuction.auctionName}</h4></div>
                <div style={{margin: 17}} className="number-card number-card-content1">
                    <h3 className="number-card-number">{`Current Bid ${currentBid}`}</h3>
                </div>
                <div><PlayerProfileCard selectedPlayer={selectedPlayer}/></div>
            </div>
          )
    } else {
        <LoadingPage />
    }
}

export default ViewerSingleAuction