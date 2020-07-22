// [LOAD PACKAGES]
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var MongoStore = require('connect-mongo')

/////////////pass
const session = require('express-session'); // 세션 설정
const passport = require('passport'); 
const CookieStore = MongoStore(session);
const passportConfig = require('./passport'); 
app.use(session({
    secret:"#JDKLF439jsdlfsjl",
    resave:false,
    saveUninitialized:true,
    store: new CookieStore({
      mongooseConnection: mongoose.connection
    })
  }))
  
, LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
passportConfig(); // passport.js호출
  /////////////pass


// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/mongodb_tutorial');

// DEFINE MODEL
var Book = require('./models/book');
var User = require('./models/user')
// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 3001;

// [CONFIGURE ROUTER]
// var router = 
//require('./routes')(app, Book);

var userRouter = require('./routes/user.js')(app, User);
app.use('/api/login', userRouter);

// [RUN SERVER]
// var server = 
app.listen(port, function(){
 console.log("Express server has started on port " + port)
});