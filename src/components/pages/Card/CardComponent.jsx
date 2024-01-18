import React from "react";
import dayjs from 'dayjs';
import "./card.scss";

const CardComponent = ({currentAuction}) => {
    return (
        <div className="blog-wrapper">
            <div className="blog-card">
                <div className="card-img"><img alt="Auction Logo" src="https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" />
                <h1>{currentAuction.auctionName}</h1>
                </div>
                <div className="card-details"><span><i className="fa fa-calendar"></i>{dayjs(currentAuction.startTime).format('D MMM YY - h:mm a')}</span></div>
                <div className="card-text">
                    <p>Venue: {currentAuction.venue}</p>
                    <p>Sport: {currentAuction.sportName}</p>
                </div>
            </div>
        </div>
    )
}

export default CardComponent