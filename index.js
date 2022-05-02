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
app.use(express.static('./public'));

const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
})
// Use morgan for logging to files
// Create a write stream to append (flags: 'a') to a file

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server terminated')
    })
})