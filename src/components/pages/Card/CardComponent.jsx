import React from "react";
import "./card.scss";

const CardComponent = () => {
    return (
        <div className="blog-wrapper">
            <div className="blog-card">
                <div className="card-img"><img alt="Auction Logo" src="https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" />
                <h1>Auction Name</h1>
                </div>
                <div className="card-details"><span><i className="fa fa-calendar"></i>AUG 4</span><span><i className="fa fa-heart"></i>2023</span></div>
                <div className="card-text">
                    <p>Venue: Andheri</p>
                    <p>Sport: Cricket (tennis)</p>
                </div>
            </div>
        </div>
    )
}

export default CardComponent