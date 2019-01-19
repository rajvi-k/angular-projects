//importing
var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var userroutes = require('./routes/user')
var transformRoutes = require('./routes/transformRoutes');
var fileRoutes = require('./routes/fileRoutes');
var  funnelroute  =  require('./routes/score')
var scoreroutes = require('./routes/scoreRoutes')
var path = require('path')
    //Instantiation
var app = express()

app.use(function(req, res, next) {
    res.header("Access-control-Allow-Origin", "*");
    res.header("Access-control-Allow-Headers", "Origin,X-Requested-with,Content-Type,Accept")
    res.header("Access-control-Allow-Methods", "PUT,POST,GET,DELETE")
    next()

})

app.set('port', 3500)
app.set('mongoDbURL', 'mongodb://localhost:27017/transformdb')
app.use(express.static(path.join(__dirname, 'public')));
var cookieParser = require('cookie-parser')
var session = require('express-session')
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit:   "50mb",  extended:  true,  parameterLimit: 50000 }));

app.use(cookieParser())
app.use(session({
    secret: "anything",
    //forces the session to be saved in the store
    //its default value is true
    saveUninitilaized: false,
    //forces the session to be saved back to store even if not saved
    resave: false
}))

app.use('/transform', userroutes)
app.use('/api/apps', transformRoutes);
app.use('/api/uploads', fileRoutes);
app.use('/funnel',  funnelroute);
app.use('/score', scoreroutes);
//connecting to mongodb
mongoose.connect(app.get('mongoDbURL'), { useMongoClient: true })
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB :)" + app.get('mongoDbURL'))
})
mongoose.connection.on("error", (err) => {
    if (err)
        console.log("Connection failed :( " + err)
})
app.listen(app.get('port'), function() {
    console.log("Transformation Portal running on port: " + app.get('port'))
})