import React, {memo} from 'react';
import { Drawer } from 'antd';
import PlayerProfileCard from '../playerProfile/PlayerProfile';
import './auctionPlayerDrawer.scss';

const AuctionPlayerDrawer = ({drawerSelectedPlayer, onClose, open}) => {
    return (
        <Drawer 
            title="Player Details" 
            placement="right" 
            onClose={onClose} 
            open={open}
            className="auction-player-drawer"
            width={450}
        >
            {
                drawerSelectedPlayer && <>
                <PlayerProfileCard selectedPlayer={drawerSelectedPlayer}/>
                </>
            }
        </Drawer>
    )
}

export default memo(AuctionPlayerDrawer);