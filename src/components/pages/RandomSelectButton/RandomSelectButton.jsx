import React from "react";
import "./randomselect.scss"

const RandomSelectButton = ({currentAuction, selectPlayer}) => {
      const selectRandomPlayer = () => {
         let allPlayers = currentAuction.players;
         let min = 0;
         let max = allPlayers.length;
         let random = Math.round(Math.random() * (max - min) + min);
         console.log("randomrandomrandom", random);
         selectPlayer(allPlayers[random]);
      }
     return(
        <button className="buttonContainer" onClick={() => selectRandomPlayer()}> SELECT A RANDOM PLAYER </button>
     )
}

export default RandomSelectButton;