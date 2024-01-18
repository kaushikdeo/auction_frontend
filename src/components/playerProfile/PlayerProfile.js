import React from "react";
import './playerProfile.scss'

const PlayerProfileCard = ({selectedPlayer}) => {
    console.log(selectedPlayer)
    return (
        <div className="cardwrapper">
            <div className="profile-card js-profile-card">
                <div className="profile-card__img">
                    <img src="https://res.cloudinary.com/muhammederdem/image/upload/v1537638518/Ba%C5%9Fl%C4%B1ks%C4%B1z-1.jpg" alt="profile card" />
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
                            <div className="profile-card-inf__title">{selectedPlayer.stats.battingStats.strikeRate}</div>
                            <div className="profile-card-inf__txt">Strike Rate</div>
                        </div>
                    </div>
                    <h3>Bowling Stats</h3>
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
                            <div className="profile-card-inf__title">{selectedPlayer.stats.bowlingStats.economy}</div>
                            <div className="profile-card-inf__txt">Economy</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerProfileCard;