const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Databse
mongoose.connect(config.database);

// On connection
mongoose.connection.on('connected', ()=>{
    console.log('connected to database ' + config.database)
});

// On Error
mongoose.connection.on('error', (err)=>{
    console.log('Database Error - ' + err);
});

const app = express();

const users = require('./routes/users');

//PORT Number
const port = 3000;

//CORS Middleware
app.use (cors());

//set the static folder
app.use(express.static(path.join(__dirname,'public')));
 
//Body parser Middleware
app.use(bodyParser.json());

//Passpot Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users',users);

//Index Route
app.get('/',(req, res) =>{
    res.send('Invalid EndPoint');
});

app.get('*',(req, res) =>{
    res.sendFile( path.join(__dirname,'/public/index.html'));
});

// Start Server
app.listen(port, ()=> {
    console.log( 'Server started on port ' +port );
});