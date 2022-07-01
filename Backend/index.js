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
///////////////////////////////////////////ELOPLAYERS////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/eloplayers', (req, res) => {
    let sql = `SELECT * FROM eloPlayers`;
    runQuery(sql, res);

})

app.post('/eloplayer', (req, res) => {
    let msg = req.body;
    let games = 0
    let name = msg.name;
    let gameType = msg.gameType;
    let rating = 1000;
    let sql = `INSERT INTO eloPlayers (name, rating, games, gameType) VALUES ('${name}', ${rating}, ${games}, '${gameType}')`
    runQuery(sql, res);

})

app.patch('/eloplayer/rating', (req, res)=>{
    let msg = req.body;
    let rating = msg.rating;
    let name = msg.name;
    let gameType = msg.gameType;
    let sql = `UPDATE eloPlayers SET rating = ${rating} WHERE (name = '${name}' AND gameType = '${gameType}')`;
    runQuery(sql, res);
})

app.patch('/eloplayer/games', (req, res)=>{
    let msg = req.body;
    let games = msg.games;
    let name = msg.name;
    let gameType = msg.gameType;
    let sql = `UPDATE eloPlayers SET games = ${games} WHERE (name = '${name}' AND gameType = '${gameType}')`;
    runQuery(sql, res);
})
app.delete('/eloplayer', (req, res) => {
    let msg = req.body;

    let name = msg.name;
    let gameType = msg.gameType;
    let sql = `DELETE FROM eloPlayers WHERE (name = '${name}' AND gameType = '${gameType}')`
    runQuery(sql, res);
})

app.post('/elogames', (req, res) => {
    let msg = req.body;
    let name1 = msg.name1;
    let name2 = msg.name2;
    let p1Win = msg.p1Win;
    let p1Gain = msg.p1Gain;
    let p2Gain = msg.p2Gain;
    let gameType = msg.gameType;
    let sql = `INSERT INTO eloGames (name1, name2, p1win, p1Gain, p2Gain, gameType) VALUES ('${name1}', '${name2}', ${p1Win}, ${p1Gain}, ${p2Gain}, '${gameType}')`
    runQuery(sql, res);
})

/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////SEMATCHES////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/sematches', (req, res) => {
    let sql = `SELECT * FROM SEMatches`;
    runQuery(sql, res);
})
app.get('/sematches/names', (req, res) => {
    let sql = `SELECT DISTINCT gameName FROM SEMatches`;
    runQuery(sql, res);
})
app.post('/segame', (req, res) => {
    let msg = req.body.body;
    let gameName = req.body.name;
    let gameType = req.body.type;
    let sql = 'REPLACE INTO SEMatches (gameName, winner, player1, player2, round, bye, score1, score2, bottom, nextMatch_ID, match_ID, gameType) VALUES '
    let first = true;
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
        if(first){
            first = false;
        }
        else{
            sql += ','
        }
        sql += `('${gameName}', '${winner}', '${player1}',
        '${player2}', ${round}, ${bye}, ${score0},
        ${score1}, ${bottom}, ${nextMatch_ID}, ${match_ID}, '${gameType}')`;
    }
    let query = pool.query(sql, (err, result) => {
        if(err) throw err;
    })
    res.send({msg: 'hey'})
})
app.get('/sematch/:name', (req, res) => {
    let sql = `SELECT * FROM SEMatches WHERE gameName = '${req.params.name}'`;
    runQuery(sql, res);
})
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////DEMATCHES////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/dematches', (req, res) => {
    let sql = `SELECT * FROM DEMatches`;
    runQuery(sql, res);
})
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
    let sql = 'REPLACE INTO DEMatches (gameName, winner, loser, final, player1, player2, round, bye, score1, score2, bottom, nextMatch_ID, match_ID, gameType, loserFrom1, loserFrom2) VALUES '
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
        let loserFrom1 = -1;
        let loserFrom2 = -1;
        if (el.losersFrom){
            loserFrom1 = el.losersFrom[0];
            loserFrom2 = el.losersFrom[1];
        }
        if(first){
            first = false;
        }
        else{
            sql += ','
        }
        sql += `('${gameName}', "${winner}",${loser}, ${final},"${player1}",
            "${player2}", ${round}, ${bye}, ${score0},
            ${score1}, ${bottom}, ${nextMatch_ID}, ${match_ID}, '${gameType}', ${loserFrom1}, ${loserFrom2})`;
    }
    if(!first){
        let query = pool.query(sql, (err, result) => {
            if(err) throw err;
        })
    }
    res.send({msg: 'hey'})
})
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////RRMATCHES////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/rrmatches', (req, res) => {
    let sql = `SELECT * FROM RRMatches`;
    runQuery(sql, res);
})
app.get('/rrmatches/names', (req, res) => {
    let sql = `SELECT DISTINCT gameName FROM RRMatches`;
    runQuery(sql, res);
})
app.get('/rrmatch/:name', (req, res) => {
    let sql = `SELECT * FROM RRMatches WHERE gameName = '${req.params.name}'`;
    runQuery(sql, res);
})
app.post('/rrgame', (req, res) => {

    let msg = req.body.body;
    let gameName = req.body.name;
    let gameType = req.body.type;
    let sql = 'REPLACE INTO RRMatches (gameName, winner, player1, player2, round, bye, match_ID, gameType) VALUES '
    let first = true;
    for (el of msg){
        let player1 = el.Csapatok[0];
        let player2 = el.Csapatok[1];
        let winner = el.Gyoztes;
        let match_ID = el.Meccs_id;
        let round = el.Round;
        let bye = el.bye;
        if (el.losersFrom){
            loserFrom1 = el.losersFrom[0];
            loserFrom2 = el.losersFrom[1];
        }
        if(first){
            first = false;
        }
        else{
            sql += ','
        }
        sql += `('${gameName}', "${winner}","${player1}",
            "${player2}", ${round}, ${bye}, ${match_ID}, '${gameType}')`;
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
