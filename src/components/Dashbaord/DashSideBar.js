import React from 'react'

const DashSideBar = ({handleLogout, handleNewAuction}) => {
  return (
    <div className="col-sm-2 sidenav hidden-xs">
            <h2>Logo</h2>
            <ul className="nav nav-pills nav-stacked">
                <li className="active"><a href="#section1">Auctions</a></li>
                <li onClick={handleNewAuction}><a href="#section1">New Auction</a></li>
                <li onClick={handleLogout}><a>Logout</a></li>
                <li><a href="#">teams</a></li>
            </ul><br />
    </div>
  )
}

export default DashSideBar