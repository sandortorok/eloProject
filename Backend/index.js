const mysql = require("mysql2")
const cors = require("cors")
const express = require("express");
const app = express();
const server = require('http').createServer(app)

app.use(cors());
app.use(express.json())
var pool;
connectDB();
function connectDB(){
    pool = mysql.createPool({
        connectionLimit: 100,
        host:   'localhost',
        user: 'Sanyi',
        password: 'sakkiraly11',
        database: 'eloRatingDB'
    });
}
function reConnectDB(){
    pool.destroy();
    console.log('destroyed connection');
    setTimeout(() => {
        connectDB();
    }, 1000);
    console.log('connected again');
}
function runQuery(sql, res){
    let dbResult = "";
    try{
        pool.query(sql, (err, result) => {
            if(err) throw err;
            res.send(result);
            dbResult = result
        })
    }
    catch{
        reConnectDB();
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////CHESS////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/chessplayers', (req, res) => {
    let sql = `SELECT * FROM chessPlayers`;
    runQuery(sql, res);
})

app.post('/chessplayer', (req, res) => {
    let msg = req.body;
    let games = 0
    let name = msg.name;
    let rating = 1000;

    let sql = `INSERT INTO chessPlayers (name, rating, games) VALUES ('${name}', ${rating}, ${games})`
    runQuery(sql, res);
})
app.patch('/chessplayer/rating', (req, res)=>{
    let msg = req.body;
    let rating = msg.rating;
    let name = msg.name;
    let sql = `UPDATE chessPlayers SET rating = ${rating} WHERE name = '${name}'`;
    runQuery(sql, res);

})
app.patch('/chessplayer/games', (req, res)=>{
    let msg = req.body;
    let games = msg.games;
    let name = msg.name;
    let sql = `UPDATE chessPlayers SET games = ${games} WHERE name = '${name}'`;
    runQuery(sql, res);
})
app.delete('/chessplayer', (req, res) => {
    let msg = req.body;

    let name = msg.name;

    let sql = `DELETE FROM chessPlayers WHERE name = '${name}'`
    runQuery(sql, res);

})
app.post('/chessgames', (req, res) => {
    let msg = req.body;
    let name1 = msg.name1;
    let name2 = msg.name2;
    let p1Win = msg.p1Win;
    let p1Gain = msg.p1Gain;
    let p2Gain = msg.p2Gain;

    let sql = `INSERT INTO chessGames (name1, name2, p1win, p1Gain, p2Gain) VALUES ('${name1}', '${name2}', ${p1Win}, ${p1Gain}, ${p2Gain})`
    runQuery(sql, res);

})

/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////KLASK////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/klaskplayers', (req, res) => {
    let sql = `SELECT * FROM klaskPlayers`;
    runQuery(sql, res);

})

app.post('/klaskplayer', (req, res) => {
    let msg = req.body;
    let games = 0
    let name = msg.name;
    let rating = 1000;

    let sql = `INSERT INTO klaskPlayers (name, rating, games) VALUES ('${name}', ${rating}, ${games})`
    runQuery(sql, res);

})

app.patch('/klaskplayer/rating', (req, res)=>{
    let msg = req.body;
    let rating = msg.rating;
    let name = msg.name;
    let sql = `UPDATE klaskPlayers SET rating = ${rating} WHERE name = '${name}'`;
    runQuery(sql, res);
})

app.patch('/klaskplayer/games', (req, res)=>{
    let msg = req.body;
    let games = msg.games;
    let name = msg.name;
    let sql = `UPDATE klaskPlayers SET games = ${games} WHERE name = '${name}'`;
    runQuery(sql, res);
})
app.delete('/klaskplayer', (req, res) => {
    let msg = req.body;

    let name = msg.name;

    let sql = `DELETE FROM klaskPlayers WHERE name = '${name}'`
    runQuery(sql, res);
})

app.post('/klaskgames', (req, res) => {
    let msg = req.body;
    let name1 = msg.name1;
    let name2 = msg.name2;
    let p1Win = msg.p1Win;
    let p1Gain = msg.p1Gain;
    let p2Gain = msg.p2Gain;

    let sql = `INSERT INTO klaskGames (name1, name2, p1win, p1Gain, p2Gain) VALUES ('${name1}', '${name2}', ${p1Win}, ${p1Gain}, ${p2Gain})`
    runQuery(sql, res);
})

/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////PINGPONG/////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/pingpongplayers', (req, res) => {
    let sql = `SELECT * FROM pingpongPlayers`;
    runQuery(sql, res);
})

app.patch('/pingpongplayer/rating', (req, res)=>{
    let msg = req.body;
    let rating = msg.rating;
    let name = msg.name;
    let sql = `UPDATE pingpongPlayers SET rating = ${rating} WHERE name = '${name}'`;
    runQuery(sql, res);
})

app.patch('/pingpongplayer/games', (req, res)=>{
    let msg = req.body;
    let games = msg.games;
    let name = msg.name;
    let sql = `UPDATE pingpongPlayers SET games = ${games} WHERE name = '${name}'`;
    runQuery(sql, res);
})

app.post('/pingponggames', (req, res) => {
    let msg = req.body;
    let name1 = msg.name1;
    let name2 = msg.name2;
    let p1Win = msg.p1Win;
    let p1Gain = msg.p1Gain;
    let p2Gain = msg.p2Gain;

    let sql = `INSERT INTO pingpongGames (name1, name2, p1win, p1Gain, p2Gain) VALUES ('${name1}', '${name2}', ${p1Win}, ${p1Gain}, ${p2Gain})`
    runQuery(sql, res);
})
/////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////VOLLEYBALL////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/volleyteams', (req, res) => {
    let sql = `SELECT * FROM volleyballTeams`;
    runQuery(sql, res);
})
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////SEMATCHES////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/sematches/names', (req, res) => {
    let sql = `SELECT DISTINCT gameName FROM SEMatches`;
    runQuery(sql, res);
})
app.post('/segame', (req, res) => {
    let msg = req.body.body;
    let gameName = req.body.name
    for (el of msg){
        let player1 = el.Csapatok[0];
        let player2 = el.Csapatok[1];
        let winner = el.Gyoztes;
        let match_ID = el.Meccs_id;
        let nextMatch_ID = el.nextRoundID;
        let round = el.Round;
        let bottom = el.bottom;
        let bye = el.bye;
        let score0 = el.score0;
        let score1 = el.score1;
        let sql = `INSERT INTO SEMatches (gameName, winner, player1, player2, round, bye, score1, score2, bottom, nextMatch_ID, match_ID)
        VALUES ('${gameName}', '${winner}', '${player1}',
            '${player2}', ${round}, ${bye}, ${score0},
            ${score1}, ${bottom}, ${nextMatch_ID}, ${match_ID})`;
        let query = pool.query(sql, (err, result) => {
            if(err) throw err;
        })
    }
    res.send({msg: 'hey'})
})
app.get('/sematch/:name', (req, res) => {
    let sql = `SELECT * FROM SEMatches WHERE gameName = '${req.params.name}'`;
    runQuery(sql, res);
})
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////DEMATCHES////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/dematches/names', (req, res) => {
    let sql = `SELECT DISTINCT gameName FROM DEMatches`;
    runQuery(sql, res);
})

app.get('/dematch/:name', (req, res) => {
    let sql = `SELECT * FROM DEMatches WHERE gameName = '${req.params.name}'`;
    runQuery(sql, res);
})
app.post('/degame', (req, res) => {
    let msg = req.body.body;
    let gameName = req.body.name;
    let gameType = req.body.type;

    let sql = 'REPLACE INTO DEMatches (gameName, winner, loser, final, player1, player2, round, bye, score1, score2, bottom, nextMatch_ID, match_ID, gameType) VALUES '
    let first = true;
    for (el of msg){
        let player1 = el.Csapatok[0];
        let player2 = el.Csapatok[1];
        let winner = el.Gyoztes;
        let loser = el.loser;
        let match_ID = el.Meccs_id;
        let nextMatch_ID = el.nextRoundID;
        let round = el.Round;
        let bottom = el.bottom;
        let final = el.final;
        let bye = el.bye;
        let score0 = el.score0;
        let score1 = el.score1;
        if(first){
            first = false;
        }
        else{
            sql += ','
        }
        sql += `('${gameName}', "${winner}",${loser}, ${final},"${player1}",
            "${player2}", ${round}, ${bye}, ${score0},
            ${score1}, ${bottom}, ${nextMatch_ID}, ${match_ID}, '${gameType}')`;
    }
    if(!first){
        let query = pool.query(sql, (err, result) => {
            if(err) throw err;
        })
    }
    res.send({msg: 'hey'})
})
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////CACHE////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/cache', (req, res) => {
    let sql = `SELECT * FROM cache ORDER BY lastSaved DESC`;
    runQuery(sql, res);
})

app.get('/cache/:type', (req, res) => {
    let sql = `SELECT * FROM cache WHERE gameType = '${req.params.type}' ORDER BY lastSaved DESC`;
    runQuery(sql, res);
})

app.post('/savecache', (req, res) => {
    let msg = req.body;
    let gameName = msg.gameName;
    let gameType = msg.gameType;
    let bracketType = msg.bracketType;
    let sql = `REPLACE INTO cache (gameName, gameType, bracketType, lastSaved) values ('${gameName}', '${gameType}', '${bracketType}', NOW())`;
    runQuery(sql, res)
})

// simple route
app.get("/", (req, res) => {
    res.json({ hello: "This is my Angular backend :))))" });
});

server.listen(3000, () => {
    console.log('server started at http://localhost:3000')
})
