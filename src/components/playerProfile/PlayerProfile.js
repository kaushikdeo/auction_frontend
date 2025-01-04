import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './playerProfile.scss'

const bowlingImage = "https://res.cloudinary.com/dfrmnqtwi/image/upload/v1707063350/auctions/xdlivgwq8udlncjnpv3p.png";
const battingImage = "https://res.cloudinary.com/dfrmnqtwi/image/upload/v1707063349/auctions/lrq4gchrvldhl2827o4d.png";

const PlayerProfileCard = ({selectedPlayer}) => {
    console.log("jasnxjjahhahaa", selectedPlayer);
    if (selectedPlayer && selectedPlayer.stats) {
        return (
            <div className="cardwrapper">
                 <div className="profile-card js-profile-card">
                    <div className="profile-card__img">
                        <p className="profileInitials"><img src={selectedPlayer?.imageUrl ? selectedPlayer?.imageUrl : selectedPlayer.playerType === "Batsman" ? battingImage : bowlingImage} alt="Lamp" width="32" height="32" /></p>
                    </div>
                    <div className="profile-card__cnt js-profile-cnt">
                        <div className="profile-card__name">{`${selectedPlayer.firstName} ${selectedPlayer.lastName}`}</div>
                        {/* <div className="profile-card__txt">Front-end Developer from <strong>Mesopotamia</strong></div> */}
                        <div className="profile-card-loc">
                            <span className="profile-card-loc__icon">
                            </span>
                            <span className="profile-card-loc__txt">
                            {selectedPlayer.playerType}
                            </span>
                        </div>
                        <h3>Batting Stats</h3>
                        <p>{` ${selectedPlayer.battingHand} Hand - Bat`}</p>
                        <div className="profile-card-inf">
                            <div className="profile-card-inf__item">
                                <div className="profile-card-inf__title">{selectedPlayer.stats.battingStats.innings}</div>
                                <div className="profile-card-inf__txt">Innings</div>
                            </div>
                            <div className="profile-card-inf__item">
                                <div className="profile-card-inf__title">{selectedPlayer.stats.battingStats.runs}</div>
                                <div className="profile-card-inf__txt">Runs</div>
                            </div>
                            <div className="profile-card-inf__item">
                                <div className="profile-card-inf__title">{Math.round(Number(selectedPlayer.stats.battingStats.strikeRate))}</div>
                                <div className="profile-card-inf__txt">Strike Rate</div>
                            </div>
                        </div>
                        <h3>Bowling Stats</h3>
                        <p>{` ${selectedPlayer.bowlingHand} Hand - Bowl`}</p>
                        <div className="profile-card-inf">
                            <div className="profile-card-inf__item">
                                <div className="profile-card-inf__title">{selectedPlayer.stats.bowlingStats.overs}</div>
                                <div className="profile-card-inf__txt">Overs</div>
                            </div>
                            <div className="profile-card-inf__item">
                                <div className="profile-card-inf__title">{selectedPlayer.stats.bowlingStats.wickets}</div>
                                <div className="profile-card-inf__txt">Wickets</div>
                            </div>
                            <div className="profile-card-inf__item">
                                <div className="profile-card-inf__title">{Number(selectedPlayer.stats.bowlingStats.economy).toFixed(2)}</div>
                                <div className="profile-card-inf__txt">Economy</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (<>
            <Box sx={{ display: 'flex',margin: 'auto', alignSelf: 'center', justifyContent: 'center' }}>
            <a className="card" style={{backgroundColor: "white"}} id="card-link" target="_blank">
  <div className="card__header">
    <div>
      <img className="card__header header__img skeleton" id="logo-img" alt="" />
    </div>
    <h3 className="card__header header__title" id="card-title">
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
    </h3>
  </div>

  <div className="card__body">
    <div className="card__body body__text" id="card-details">
      <div className="skeleton skeleton-text skeleton-text__body"></div>
    </div>

    <div className="card__body body__img">
      <img className="skeleton" alt="" id="cover-img" />
    </div>
  </div>

  <div className="card__footer" id="card-footer">
    <div className="skeleton skeleton-text skeleton-footer"></div>
  </div>
</a>
            </Box>
        </>)
    }
}

export default PlayerProfileCard;