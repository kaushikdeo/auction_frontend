import dayjs from "dayjs";

const AuctionDetailsStrip = ({currentAuction}) => {
    return (
        <div className="auction-details-header">
            <h1>
                {currentAuction.auctionName} 
                <span>||</span> 
                {currentAuction.sportName} 
                <span>||</span> 
                {currentAuction.venue} 
                <span>||</span> 
                {dayjs(currentAuction.startTime).format('DD MMM YYYY')}
            </h1>
        </div>
    )
}

export default AuctionDetailsStrip;