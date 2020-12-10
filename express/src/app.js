var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var morgan = require('morgan');
var {logger,stream} = require('./config/winston');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
// app.use(morgan('dev'));
app.use(morgan('dev',{stream:stream})); //winston을 사용해서 로그 기록

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// app.use(express.json({ #json data받는 용량 제한 설정 default 1mb
//     limit : "100mb"
//   }));
//   app.use(express.urlencoded({
//     limit:"100mb",
//     extended: false
//   }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    logger.error(err.message);
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
