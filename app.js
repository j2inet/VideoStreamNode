const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const path = require('path');
const { uuid } = require('uuidv4');
require('dotenv').config();


var sessionSettings = {
   saveUninitialized: true,
   secret: "sdlkvkdfbjv",
   resave: false,
   cookie: {},
   unset: 'destroy',
   genid: function (req) {
      return uuid();
   }
}


app = express();
app.use(session(sessionSettings));
if (app.get('env') === 'production') {
   app.set('trust proxy', 1);
   sessionSettings.cookie.secure = true;
}
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(fileUpload({
   createPath: true
}));

const libraryRouter = require('./routers/libraryRouter');
const videoRouter = require('./routers/videoRouter');
app.use('/library', libraryRouter);
app.use('/video', videoRouter);

app.use(function (req, res, next) {
   console.log(req.originalUrl);
   next(createError(404));
});
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');





module.exports = app;
