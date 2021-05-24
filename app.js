const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createConnection = require('typeorm').createConnection;

const indexRouter = require('./routes/index');
const clientsRouter = require('./routes/clients');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

var app = express();

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/clients', clientsRouter);
app.use('/login', loginRouter);

createConnection().then(()=>{
    console.log("Conected successfully");
}).catch((err)=>{
    console.log(err)
});    

module.exports = app;
