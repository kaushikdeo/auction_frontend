import dayjs from "dayjs";

const AuctionDetailsStrip = ({currentAuction}) => {
    console.log("hasbxjhabshh", currentAuction);
    return (
        <div>
            <h1>{`${currentAuction.auctionName} || ${currentAuction.sportName} || ${currentAuction.venue} || ${dayjs(currentAuction.startTime).format('DD MMM YYYY')}`}</h1>
        </div>
    )
}

export default AuctionDetailsStrip;