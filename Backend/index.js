const mysql = require("mysql2")
const cors = require("cors")
const express = require("express");
const app = express();
const server = require('http').createServer(app)

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host:   'localhost',
    user: 'Sanyi',
    password: 'sakkiraly11',
    database: 'eloRatingDB'
});

db.connect((err)=> {
    if (err){
        throw err;
    }
    else{
        console.log('mysql connected');
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////CHESS////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/chessplayers', (req, res) => {
    let sql = `SELECT * FROM chessPlayers`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
})

app.post('/chessplayer', (req, res) => {
    let msg = req.body;
    let games = 0
    let name = msg.name;
    let rating = 1000;

    let sql = `INSERT INTO chessPlayers (name, rating, games) VALUES ('${name}', ${rating}, ${games})`
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send({msg: 'Created Chess Player'});
    })
})
app.patch('/chessplayer/rating', (req, res)=>{
    let msg = req.body;
    let rating = msg.rating;
    let name = msg.name;
    let sql = `UPDATE chessPlayers SET rating = ${rating} WHERE name = '${name}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send({msg: 'Updated Chess Player Rating'});
    })
})
app.patch('/chessplayer/games', (req, res)=>{
    let msg = req.body;
    let games = msg.games;
    let name = msg.name;
    let sql = `UPDATE chessPlayers SET games = ${games} WHERE name = '${name}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send({msg: 'Updated Chess Player Games'});
    })
})
app.delete('/chessplayer', (req, res) => {
    let msg = req.body;

    let name = msg.name;

    let sql = `DELETE FROM chessPlayers WHERE name = '${name}'`
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(`DELETED Chess Player: name = ${name}`);
    })
})
app.post('/chessgames', (req, res) => {
    let msg = req.body;
    let name1 = msg.name1;
    let name2 = msg.name2;
    let p1Win = msg.p1Win;
    let p1Gain = msg.p1Gain;
    let p2Gain = msg.p2Gain;

    let sql = `INSERT INTO chessGames (name1, name2, p1win, p1Gain, p2Gain) VALUES ('${name1}', '${name2}', ${p1Win}, ${p1Gain}, ${p2Gain})`
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send({msg: 'Added Chess Game to DB'});
    })
})

/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////KLASK////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/klaskplayers', (req, res) => {
    let sql = `SELECT * FROM klaskPlayers`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
})

app.post('/klaskplayer', (req, res) => {
    let msg = req.body;
    let games = 0
    let name = msg.name;
    let rating = 1000;

    let sql = `INSERT INTO klaskPlayers (name, rating, games) VALUES ('${name}', ${rating}, ${games})`
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send({msg: 'Created Klask Player'});
    })
})

app.patch('/klaskplayer/rating', (req, res)=>{
    let msg = req.body;
    let rating = msg.rating;
    let name = msg.name;
    let sql = `UPDATE klaskPlayers SET rating = ${rating} WHERE name = '${name}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send({msg: 'Updated Klask Player Rating'});
    })
})

app.patch('/klaskplayer/games', (req, res)=>{
    let msg = req.body;
    let games = msg.games;
    let name = msg.name;
    let sql = `UPDATE klaskPlayers SET games = ${games} WHERE name = '${name}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send({msg: 'Updated Klask Player Games'});
    })
})
app.delete('/klaskplayer', (req, res) => {
    let msg = req.body;

    let name = msg.name;

    let sql = `DELETE FROM klaskPlayers WHERE name = '${name}'`
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(`DELETED Klask Player: name = ${name}`);
    })
})

app.post('/klaskgames', (req, res) => {
    let msg = req.body;
    let name1 = msg.name1;
    let name2 = msg.name2;
    let p1Win = msg.p1Win;
    let p1Gain = msg.p1Gain;
    let p2Gain = msg.p2Gain;

    let sql = `INSERT INTO klaskGames (name1, name2, p1win, p1Gain, p2Gain) VALUES ('${name1}', '${name2}', ${p1Win}, ${p1Gain}, ${p2Gain})`
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send({msg: 'Added Klask Game to DB'});
    })
})

/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////PINGPONG/////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/pingpongplayers', (req, res) => {
    let sql = `SELECT * FROM pingpongPlayers`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
})

app.patch('/pingpongplayer/rating', (req, res)=>{
    let msg = req.body;
    let rating = msg.rating;
    let name = msg.name;
    let sql = `UPDATE pingpongPlayers SET rating = ${rating} WHERE name = '${name}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send({msg: 'Updated Ping-Pong Player Rating'});
    })
})

app.patch('/pingpongplayer/games', (req, res)=>{
    let msg = req.body;
    let games = msg.games;
    let name = msg.name;
    let sql = `UPDATE pingpongPlayers SET games = ${games} WHERE name = '${name}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send({msg: 'Updated Ping-Pong Player Games'});
    })
})

app.post('/pingponggames', (req, res) => {
    let msg = req.body;
    let name1 = msg.name1;
    let name2 = msg.name2;
    let p1Win = msg.p1Win;
    let p1Gain = msg.p1Gain;
    let p2Gain = msg.p2Gain;

    let sql = `INSERT INTO pingpongGames (name1, name2, p1win, p1Gain, p2Gain) VALUES ('${name1}', '${name2}', ${p1Win}, ${p1Gain}, ${p2Gain})`
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send({msg: 'Added Ping-Pong Game to DB'});
    })
})
/////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////VOLLEYBALL////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/volleyteams', (req, res) => {
    let sql = `SELECT * FROM volleyballTeams`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
})
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////SEMATCHES////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/sematches/names', (req, res) => {
    let sql = `SELECT DISTINCT gameName FROM SEMatches`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
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
        VALUES ('${gameName}', '${winner}', '${player1}', '${player2}',${round},${bye},${score0},${score1},${bottom},${nextMatch_ID},${match_ID})`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
        })
    }
    res.send({msg: 'hey'})
})
app.get('/sematch/:name', (req, res) => {
    let sql = `SELECT * FROM SEMatches WHERE gameName = '${req.params.name}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
})







// simple route
app.get("/", (req, res) => {
    res.json({ hello: "This is my Angular backend :))))" });
});

server.listen(3000, () => {
    console.log('server started at localhost:9001')
})
