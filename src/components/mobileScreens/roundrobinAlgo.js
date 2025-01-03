export const makeRoundRobinPairings = (teams) => {
    if (teams.length % 2 == 1) {
      teams.push(null);
    }
    const playerCount = teams.length;
    const rounds = playerCount - 1;
    const half = playerCount / 2;
    const tournamentPairings = [];
    let shuffledTeams = shuffleteams(teams)
    const playerIndexes = shuffledTeams.map((_, i) => i).slice(1);
    for (let round = 0; round < rounds; round++) {
      const roundPairings = [];
      const newPlayerIndexes = [0].concat(playerIndexes);
      const firstHalf = newPlayerIndexes.slice(0, half);
      const secondHalf = newPlayerIndexes.slice(half, playerCount).reverse();
      for (let i = 0; i < firstHalf.length; i++) {
        roundPairings.push({
          white: shuffledTeams[firstHalf[i]],
          black: shuffledTeams[secondHalf[i]],
        });
      }
      // rotating the teams
      playerIndexes.push(playerIndexes.shift());
      tournamentPairings.push(roundPairings);
    }
    let fin = tournamentPairings.flat().map(tt => {
        return [tt["white"], tt["black"]];
    })
    console.log("teamsschedule", fin);
    return fin;
}

const shuffleteams = (teams) => {
    let currentIndex = teams.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [teams[currentIndex], teams[randomIndex]] = [
        teams[randomIndex], teams[currentIndex]];
    }
    return teams;
}

export const makeSingleEliminationParing = (teams) => {
    teams.splice(5, 1);
    let shuffledArr = shuffleteams(teams)
    console.log("askjxnakjsnx", shuffledArr)
    let sssss = [];
    if (shuffledArr.length%2) {
        let indexToRemove = Math.ceil(shuffledArr.length/2)
        let unevenEntry = shuffledArr[indexToRemove]
        shuffledArr.splice(indexToRemove, 1);
        for (let index = 0; index < shuffledArr.length/2; index++) {
            sssss.push([shuffledArr[index], shuffledArr[shuffledArr.length - (index+1)]])
        }
        sssss.push([unevenEntry, null])
        console.log("askxjnsjjjsjjsjs", sssss, unevenEntry);
        //uneven
    } else {
        //even
        for (let index = 0; index < shuffledArr.length/2; index++) {
            sssss.push([shuffledArr[index], shuffledArr[shuffledArr.length - (index+1)]])
        }
        console.log("askxjnsjjjsjjsjs", sssss);
    }
    return sssss;
}
