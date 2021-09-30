const express = require('express');
const exphdb = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const redis = require('redis')
const session = require('express-session')

let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()

const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
require('dotenv').config()

const app = express();

app.engine('handlebars', exphdb());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
  store: new RedisStore({client: redisClient}),
  saveUninitialized: false,
  secret: 'keyboard cat',
  resave: false,
  cookie: {
    maxAge: 60000,
    secure: true,
  }
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))

// Connect MySQL
const con = require("./config/db.js")

app.use(function (req, res, next) {
  req.con = con
  next()
})


// RoutingWeb
//Login
const login = require("./routes/login");
app.use("/", login);

//Product
const product = require("./routes/product");
app.use("/product", product);

//News
const news = require("./routes/news");
app.use("/news", news);

//Order
const order = require("./routes/order");
app.use("/order", order);

//Administrator
const administrator = require("./routes/administrator");
app.use("/administrator", administrator);

//Help
const help = require("./routes/help");
app.use("/help", help);

//about us
const aboutUs = require("./routes/about-us");
app.use("/about-us", aboutUs);


// Routing Client
// const loginUser = require("./routesUser/login");
// app.use("/", login);

app.listen(process.env.APP_PORT || process.env.PORT, () => {
  console.log('http://localhost:3001')
});
