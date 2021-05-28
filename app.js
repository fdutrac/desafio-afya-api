const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createConnection = require('typeorm').createConnection;

const indexRouter = require('./routes/index');

const app = express();

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter.home);
app.use('/users', indexRouter.users);
app.use('/clients', indexRouter.clients);
app.use('/login', indexRouter.login);
app.use('/specialists', indexRouter.specialists);

createConnection().then(()=>{
    console.log("Conected successfully");
}).catch((err)=>{
    console.log(err)
});    

module.exports = app;
