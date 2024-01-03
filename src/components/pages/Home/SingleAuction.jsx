import React, { useState } from 'react';
import './singleAuction.scss';
import SideBar from '../Sidebar/Sidebar';
import NavBar from '../Navbar/Navbar';
import { Button, Drawer } from 'antd';
import AuctionDetails from '../AuctionDetails/AuctionDetails';
import RandomSelectButton from '../RandomSelectButton/RandomSelectButton';
import PlayersWidget from '../BucketPlayersTable/PlayersWidget';
import { useParams } from 'react-router-dom';

const SingleAuction = () => {
    const [open, setOpen] = useState(false);
    const params = useParams();
    console.log("PARAMS", params)

    const showDrawer = () => {
        console.log("asdnaslkxmaklsmx")
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return(
        <div className='home'>
            <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
            <SideBar />
            <div className='homeContainer'>
                <NavBar />
                <div className="widgets">
                    <AuctionDetails />
                    <RandomSelectButton />
                    <PlayersWidget showDrawer={showDrawer} />
                    {/* <BucketPlayerTable /> */}
                </div>
            </div>
        </div>
    )
}

export default SingleAuction