// Route (endpoint) definitions go in this directory
const {restart} = require("nodemon");
const { regexpToText } = require("nodemon/lib/utils");

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