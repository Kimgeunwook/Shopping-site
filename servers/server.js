// [LOAD PACKAGES]
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var MongoStore = require('connect-mongo')
const path = require('path');
var fs = require('fs');

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
  console.log(path.join(__dirname,'/../public'))
  console.log('딜네임이다@@@@@@@@')
app.use(express.static(path.join(__dirname,'/../public')));

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/mongodb_tutorial');

// DEFINE MODEL
var User = require('./models/user');
var Product = require('./models/product');
var Orderstate = require('./models/orderstate');
// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 3001;

// [CONFIGURE ROUTER]

var loginRouter = require('./routes/login.js')(app, User);
var OrderstateRouter = require('./routes/Orderstate.js')(app, Orderstate);
var userstateRouter = require('./routes/user.js')(app, User);
var ProductRouter = require('./routes/product.js')(app,Product);

app.use('/api/login', loginRouter);
app.use('/api/order',OrderstateRouter);
app.use('/api/user',userstateRouter);
app.use('/api/product',ProductRouter);

// [RUN SERVER]
app.listen(port, function(){
 console.log("Express server has started on port " + port)
});