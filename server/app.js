const express         = require('express');
const path            = require('path');
const favicon         = require('serve-favicon');
const logger          = require('morgan');
const cookieParser    = require('cookie-parser');
const bodyParser      = require('body-parser');
const cors            = require('cors');
require('dotenv').config()

// Routes
const index       = require('./routes/index');
const users       = require('./routes/users');
const tasks        = require('./routes/tasks')
const lists       = require('./routes/lists');
const categories  = require('./routes/categories');


const app = express();

// Mongo DB with Atlas server
const mongoose    = require('mongoose');
const atlasdbURL  = `mongodb://wahibhacktiv8:${process.env.DB_PASSWORD}@wahib-hacktiv8-shard-00-00-uyl7c.mongodb.net:27017,wahib-hacktiv8-shard-00-01-uyl7c.mongodb.net:27017,wahib-hacktiv8-shard-00-02-uyl7c.mongodb.net:27017/kulakukan?ssl=true&replicaSet=wahib-hacktiv8-shard-0&authSource=admin`
mongoose.connect(atlasdbURL,{ useMongoClient: true });




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/users', users);
app.use('/api/tasks', tasks);
app.use('/api/lists', lists);
app.use('/api/categories', categories);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send({
    err: err
  });
});

module.exports = app;
