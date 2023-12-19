import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const PlayerDashboard = () => {

const handleLogout = () => {
    console.log("AM I CALLLDE");
}

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
                <div className='d-flex justify-content-end'><h4>Welcome {}</h4></div>
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