function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function getClosest(players){
    for (i in knownBrackets) {
        if(players == knownBrackets[i]){
            return knownBrackets[i]
        }
        if(players < knownBrackets[i]){
            return knownBrackets[i];
        }
    }
}

var knownBrackets = [2, 4, 8, 16, 32, 64] 
exampleTeams = []
for(let i = 0; i < 64; i++){
    exampleTeams.push(`Csapat ${i+1}.`)
}

players = 16;
closestBase = getClosest(players);
Elonyerok = closestBase - players;

Meccsek_Száma = closestBase/2
teamNumber = 0;
matchID = 0
games = []
RoundNumber = 1
//ELŐNYERŐK
for (let i = 0; i < Elonyerok; i++) {
    newGame = {}
    newGame['Meccs_id'] = matchID
    matchID++
    newGame['bye'] = true
    
    teams = []
    teams.push(exampleTeams[teamNumber])
    teamNumber += 1;
    newGame['Csapatok'] = teams
    newGame['Round'] = RoundNumber
    newGame['Gyoztes'] = teams[0]
    games.push(newGame)
}
//MARADÉK JÁTSZÓK
for (let i = 0; i < Meccsek_Száma-Elonyerok; i++) {
    newGame = {}
    newGame['Meccs_id'] = matchID
    matchID++
    newGame['bye'] = false
    teams = []
    teams.push(exampleTeams[teamNumber])
    teams.push(exampleTeams[teamNumber+1])
    let WinnerID = getRandomInt(2)
    newGame['Gyoztes'] = teams[WinnerID];
    teamNumber += 2;
    newGame['Csapatok'] = teams
    newGame['Round'] = RoundNumber
    games.push(newGame)
}
while (Meccsek_Száma != 1){
    Meccsek_Száma = Meccsek_Száma / 2
    nextRound = []
    nextRound = games.filter(el=>{
        return el['Round'] == RoundNumber;
    })
    RoundNumber++;
    for (let i = 0; i < Meccsek_Száma; i+=1){
        meccs1_ID = i*2
        meccs2_ID = meccs1_ID + 1
        meccs1 = nextRound[meccs1_ID]
        meccs2 = nextRound[meccs2_ID]
        teams = []
        teams.push(meccs1['Gyoztes'])
        teams.push(meccs2['Gyoztes'])
        let WinnerID = getRandomInt(2)
        newGame = {}
        newGame['Gyoztes'] = teams[WinnerID]
        newGame['Csapatok'] = teams
        newGame['Round'] = RoundNumber
        newGame['bye'] = false
        newGame['Meccs_id'] = matchID
        matchID++;
        games.push(newGame)
    }
}
console.log(games);