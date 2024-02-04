import React from "react";
import "./randomselect.scss"

const RandomSelectButton = ({boughtPlayers, currentAuction, selectPlayer}) => {
         let allPlayers = currentAuction.players.map(player => {
            return { 
               playerId: player.userId, 
               playerImage: "", 
               playerName: `${player.firstName} ${player.lastName}`, 
               playerType: player.playerType
            }
      })
      let uniquePlayers = allPlayers.filter(({ playerId: id1 }) => !boughtPlayers.some((id2) => id2 === id1));
      console.log("uniquePlayersuniquePlayersuniquePlayersuniquePlayers", uniquePlayers);
      let finalUniquePlayers = uniquePlayers.filter(({ playerId: id1 }) => !currentAuction.unallocatedPlayers.some(({userId: id2}) => id2 === id1));
      const selectRandomPlayer = () => {
         let min = 0;
         let max = finalUniquePlayers.length ? finalUniquePlayers.length - 1 : uniquePlayers.length - 1;
         let random = Math.round(Math.random() * (max - min) + min);
         console.log("randomrandomrandom1", uniquePlayers);
         console.log("randomrandomrandom1", uniquePlayers.length);
         console.log("randomrandomrandom1", finalUniquePlayers);
         console.log("randomrandomrandom1", finalUniquePlayers.length);
         console.log("randomrandomrandom1", random);
         console.log("randomrandomrandom1", max);
         console.log("randomrandomrandom1", min);
         console.log("randomrandomrandom1", finalUniquePlayers[random]);
         console.log("randomrandomrandom1", uniquePlayers[random]);
         console.log("randomrandomrandom1", "-------------------------------------------------");
         if (finalUniquePlayers.length) {
            selectPlayer(finalUniquePlayers[random]);
         } else {
            selectPlayer(uniquePlayers[random]);
         }
      }
     return(
        <button className="buttonContainer" onClick={() => selectRandomPlayer()}> SELECT A RANDOM PLAYER </button>
     )
}

export default RandomSelectButton;