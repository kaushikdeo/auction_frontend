import React, {memo} from 'react';
import { Button, Drawer } from 'antd';
import PlayerProfileCard from '../playerProfile/PlayerProfile';

const AuctionPlayerDrawer = ({drawerSelectedPlayer, onClose, open}) => {
    return (
        <Drawer title="Player Details" placement="right" onClose={onClose} open={open}>
            {
                drawerSelectedPlayer && <>
                <PlayerProfileCard selectedPlayer={drawerSelectedPlayer}/>
                </>
            }
        </Drawer>
    )
}

export default memo(AuctionPlayerDrawer);