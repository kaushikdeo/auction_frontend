import React from "react";
import './playerProfile.scss'

const PlayerProfileCard = ({selectedPlayer}) => {
    console.log("selectedPlayer", selectedPlayer)
    if (selectedPlayer && selectedPlayer.stats) {
        return (
            <div className="cardwrapper">
                 <div className="profile-card js-profile-card">
                    <div className="profile-card__img">
                        <p className="profileInitials"><b>{`${selectedPlayer.firstName[0]} ${selectedPlayer.lastName[0]}`}</b></p>
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
        return (<>No Player Data</>)
    }
}

export default PlayerProfileCard;