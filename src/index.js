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


//testing
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ 
    storage: storage, 
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
            return cb(null, false);
        }else{
            cb(null, true);
        }
    },
    limits:{
        fileSize: 1024 * 1024
    }
})

app.get('/uploads', (req, res) => {
    res.render('upload');
})


app.post('/uploads', upload.single('img'), (req, res, next) => {
    const file = req.file
    if (!file) {
        res.send("eror");
    }
    res.send(req.file);
})




app.listen(3001, () => {
    console.log('http://localhost:3001')
});