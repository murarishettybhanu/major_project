var createError = require('http-errors');
var express = require('express');
var path = require('path');
const edge = require("edge.js");
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
const fileUpload = require('express-fileupload');
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
var connectMongo = require("connect-mongo");
var expressSession = require("express-session");
const { config, engine } = require('express-edge');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var logoutRouter = require('./routes/logout');
var loginUserRouter = require('./routes/loginUser');
var storeUserRouter = require('./routes/storeUser');
var howTOUseRouter = require("./routes/howToUse");
var contactUs = require("./routes/contactUs");
var contactInfo = require("./routes/contactInfo");
var compiler = require("./routes/compiler");
var storePost = require("./routes/storePost");
var compileRouter = require("./routes/compile");
var runRouter = require("./routes/run");
var bookmarksRouter = require("./routes/bookmarks");
var updatePostRouter = require("./routes/updatePost");
var editRouter = require("./routes/edit");
var deletePostRouter = require("./routes/deletePost");
var getmessagesRouter = require("./routes/getmessages")


var app = express();

try {
  mongoose.connect('mongodb://localhost/major', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("connected to mongodb")

} catch (e) {
  console.log(e)

}

const mongoStore = connectMongo(expressSession);

app.use(
  expressSession({
    secret: "secret",
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

// view engine setup
app.use(engine);
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("*", (req, res, next) => {
  edge.global("auth", req.session.userId);
  next();
});

const auth = require("./middleware/auth");
const admin = require("./middleware/admin");
const redirectIfAuthenticated = require("./middleware/redirectIfAuthenticated");
app.get('/', indexRouter);
app.get('/login', redirectIfAuthenticated, loginRouter);
app.get('/signup', redirectIfAuthenticated, signupRouter);
app.get('/logout', logoutRouter);
app.post('/loginuser', loginUserRouter);
app.post('/storeuser', storeUserRouter);
app.get('/howtouse', howTOUseRouter);
app.get('/contactus', contactUs);
app.post('/contactinfo', contactInfo);
app.get('/compiler', compiler);
app.post('/storepost', storePost);
app.post('/compile', compileRouter);
app.post('/run', runRouter);
app.get('/bookmarks', bookmarksRouter);
app.post('/update/post/:post', auth, updatePostRouter);
app.get('/edit/:post', auth, editRouter);
app.get('/delete/:post', auth, deletePostRouter);
app.get("/getallmessages", auth, admin, getmessagesRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
