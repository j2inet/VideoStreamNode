const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Busboy = require('connect-busboy');
require('dotenv').config();


var sessionSettings = {
   saveUninitialized: true,
   secret: "sdlkvkdfbjv",
   resave: false,
   cookie: {},
   unset: 'destroy',
   genid: function (req) {
      return uuidv4();
   }
}


app = express();
app.use(Busboy({
   immediate: true,
   limits: 10* 1073741824,
   highWaterMark: 4 * 1048576, // Set 4 megabyte buffer
}));

/*app.use(session(sessionSettings));
if (app.get('env') === 'production') {
   app.set('trust proxy', 1);
   sessionSettings.cookie.secure = true;
}
*/
//app.use(express.static('public'));
//app.use(bodyParser.json());
//app.use(fileUpload({
//   createParentPath: true
//}));
//app.use(bodyParser.urlencoded({extended: true}));



app.use(express.static('public'));


const libraryRouter = require('./routers/libraryRouter');
const videoRouter = require('./routers/videoRouter');
const uploadRouter = require('./routers/uploadRouter');
const streamRouter = require('./routers/streamRouter');

app.use('/library', libraryRouter);
app.use('/video', videoRouter);
app.use('/upload', uploadRouter);
app.use('/streamUpload', streamRouter);


app.use(function (req, res, next) {
   console.log(req.originalUrl);
   next(createError(404));
});
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');





module.exports = app;
