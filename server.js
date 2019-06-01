const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const passport = require('passport');
const fileupload = require('express-fileupload');

app.use(fileupload());

app.use(express.static(__dirname + "/public"));
//-------------  static set-up   --------------------
const port = process.env.PORT || 5000;

//-------------custom utilities----------------------
const logHelper = require('./utils/logSeparation');

//----------------------------------------------------

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(passport.initialize());
require('./config/passport')(passport);

//----------------------------------------------------

// ------------------- Database ----------------------

const databaseName = "project-1";

mongoose
    .connect(`mongodb://localhost/${databaseName}`, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => {
        logHelper.sendDatabaseLog(`Successfully connected to the database -> ${databaseName}`);
    })
    .catch(err => {
        console.log(err)
    })

// ---------------------------------------------------

app.get('/', (req,res) => {
    res.send("This is working just fine");
})


// -------------- Routes -----------------

const userRoute = require('./routes/api/user')
const postRoute = require('./routes/api/post')
const profileRoute = require('./routes/api/profile')
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.use('/api/profile', profileRoute);


//----------------------------------------

app.listen(port, () => {
    logHelper.sendDebugLog(`Server currently running on port ${port}`);
})