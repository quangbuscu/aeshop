const express = require('express');
const exphdb = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const app = express();

app.engine('handlebars', exphdb());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Connect MySQL
const con = require("./config/db.js")
con.connect((err) => {
    if (err) throw err;
    console.log("Connected!!!")
})

app.use(function (req, res, next) {
    req.con = con
    next()
})


// Routing
const login = require("./routes/login");
app.use("/", login);

const product = require("./routes/product");
const e = require('express');
app.use("/product", product);


//testing


const upload = multer({
    dest: './public/uploads/',
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
            return cb("File phải là ảnh", false);
        } else {
            cb(null, true);
        }
    },
    limits: {
        files:3,
    }
})

app.get('/test', (req, res) => {
    res.render('test',{ layout: false});
})


app.post('/test', upload.single('files'), (req, res) => {
    res.send(req.body);
})




app.listen(3001, () => {
    console.log('http://localhost:3001')
});