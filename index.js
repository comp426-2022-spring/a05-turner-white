// Place your server entry point code here
//Import Things
const minimist = require('minimist');
const express = require('express');
const morgan = require('morgan');
const db = require('./src/services/database.js');
const fs = require('fs');
const req = require('express/lib/request');

const app = express()

var args = minimist(process.argv.slice(2))
console.log(args)

//HELP
const help = (`
server.js [options]

--port	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535.

--debug	If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.

--log		If set to false, no log files are written. Defaults to true.
            Logs are always written to database.

--help	Return this message and exit.
`)
// If --help or -h, echo help text to STDOUT and exitff
if (args.help || args.h) {
    console.log(help)
    process.exit(0)
}

const HTTP_PORT = args.port || process.env.PORT || 5555
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
})
// Use morgan for logging to files
// Create a write stream to append (flags: 'a') to a file
app.get('/app/', (req,res) => {
    res.status(200);
    res.statusMessage = "OK"
    res.end(res.statusCode+ ' ' + res.statusMessage).type("text/plain")
});

if (args.log == "true" || args.log == null) {
    const accessLog = fs.createWriteStream('access.log', { flags: 'a' })
    app.use(morgan('combined', { stream: accessLog }))
}

if (args['debug'] == "true" || args['debug'] == true) {
    app.get('/app/log/access', (req, res) => {
        try {
            const stmt = db.prepare('SELECT * FROM accesslog').all()
            res.status(200);
            res.json(stmt)
        } catch {
            console.error(e)
        }
    });
    app.get('/app/error', (req, res) => {
        throw new Error('Error test successful') // Express will catch this on its own.
    });
}
//Endpoint that returns JSON of flip function result
app.get('/app/flip/', (req,res) => {
    let flip = coinFlip()
    res.json({flip: flip}).status(200)
})
app.get('/app/flips/:number', (req, res, next) => {
    res.status(200);
    var number = req.params.number;
    let raw = coinFlips(number)
    let summary = countFlips(raw)
    res.json({ raw: raw, summary: summary})
})
app.get('/app/flip/call/heads', (req, res) => {
    res.statusCode = 200;
    let result = flipACoin('heads')
    res.json(result).type("text/plain")
})
//Endpoint that returns the result of calling tails
app.get('/app/flip/call/tails', (req, res) => {
    res.statusCode = 200;
    let result = flipACoin('tails')
    res.json(result).type("text/plain")
})
//Endpoint that returns JSON of flip array (num) & summary
app.post('/app/flip/coins/', (req, res, next) => {
    var number = req.body.number;
    let raw = coinFlips(number)
    let summary = countFlips(raw)
    res.json({ raw: raw, summary: summary}).status(200)
    //res.json(summary) 
})
//Endpoint that returns the result of calling a coin
app.post('/app/flip/call/', (req, res) => {
    let result = flipACoin(req.body.guess)
    res.status(200).json(result)
})

app.use(function(req,res){
    res.status(404).json({"message":"404 NOT FOUND"})
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server terminated')
    })
})

function coinFlip() {
    return (Math.random() > 0.5) ? "heads" : "tails"
}
function coinFlips(flips) {
    let ret = []
    for (var i=0; i < flips; i++) {
      ret.push(coinFlip())
    }
    return ret
}
function countFlips(array) {
    var tailcount = 0
    var headcount = 0
    for (let i=0; i<array.length; i++) {
      if (array[i] == "heads") {
        headcount += 1;
      }
      if (array[i] == "tails") {
        tailcount += 1;
      }
    }
    if (tailcount == 0) {
      return {heads:headcount}
    }
    if (headcount == 0) {
      return {tails:tailcount}
    }
    return { tails: tailcount, heads: headcount}
}
function flipACoin(call) {
     var flip = coinFlip()
     var res = ""
    if (flip == call) {
      var res = 'win'
    }
    if (flip != call) {
      var res = 'lose'
    }
    return {call: call, flip: flip, result: res}
}