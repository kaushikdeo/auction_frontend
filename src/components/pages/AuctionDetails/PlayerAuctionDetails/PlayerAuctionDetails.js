import BucketPlayerTable from "../../BucketPlayersTable/BucketPlayerTable";
import TeamsTable from "../../TeamsTable/TeamsTable";

const PlayerAuctionDetails = ({currentAuction,showDrawer, currentPlayers, handleDrawerSelectedPlayer}) => {
    <div className="auctionDetailsWidget">
        <div className="right">
            <span className="title">Player Bucket</span>
            <div className="featuredRight">
            <BucketPlayerTable showDrawer={showDrawer} currentPlayers={currentAuction.players} handleDrawerSelectedPlayer={handleDrawerSelectedPlayer}/>
            </div>
        </div>
        <div className="right">
            <span className="title">Team Details</span>
            <div className="featuredRight">
                <TeamsTable currentAuction={currentAuction}/>
            </div>
        </div>
    </div>
}

export default PlayerAuctionDetails;