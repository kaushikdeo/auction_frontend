import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CaptainTeamsTable from '../PlayerComponents/dataTables/CaptainTeamsTable';
import UnsoldPlayerstable from '../PlayerComponents/dataTables/UnsoldPlayerstable';
import PlayersSoldTable from '../PlayerComponents/dataTables/PlayersSoldTable';
import AllTeamsTable from '../PlayerComponents/dataTables/AllTeamsTable';
import MyTeamsTable from '../PlayerComponents/dataTables/MyTeamsTable';
import PlayerBucket from '../PlayerComponents/dataTables/PlayerBucket';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TableTabs = ({
  setUnallocatedPlayerBucket, 
  unallocatedPlayerBucketCount, 
  setPlayerBucketCount, 
  playerBucketCount, 
  currentAuction, 
  soldPlayers, 
  setDrawerSelectedPlayerb,
  allTeamPlayerData
}) => {
  console.log("asjnkjasnxkjansxkjansxkjansx", currentAuction);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log("newValue", newValue)
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="basic tabs example">
          <Tab label={`Player Bucket`} />
          <Tab label="Teams" />
          <Tab label="My Team" />
          <Tab label="Unsold Players" />
          <Tab label="Players Sold" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PlayerBucket unsoldPlayers={currentAuction.unallocatedPlayers} playerBucketCount={playerBucketCount} setPlayerBucketCount={setPlayerBucketCount} soldPlayers={soldPlayers} currentAuction={currentAuction} setDrawerSelectedPlayerb={setDrawerSelectedPlayerb}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} soldPlayers={soldPlayers}>
        <AllTeamsTable soldPlayers={soldPlayers} allTeamPlayerData={allTeamPlayerData} walletBal={currentAuction?.bucketWalletBalance}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <MyTeamsTable currentAuction={currentAuction}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <UnsoldPlayerstable unsoldPlayers={currentAuction.unallocatedPlayers} setDrawerSelectedPlayerb={setDrawerSelectedPlayerb} currentAuction={currentAuction}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <PlayersSoldTable setDrawerSelectedPlayerb={setDrawerSelectedPlayerb} soldPlayers={soldPlayers}/>
      </CustomTabPanel>
    </Box>
  );
}

export default TableTabs;