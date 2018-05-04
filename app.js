
// Core NPM Modules Here
const express       =   require('express');
const app           =   express();
const morgan        =   require('morgan');
const bodyParser    =   require('body-parser');
const cors          =   require('cors');
const mongo         =   require('mongodb');
const mongoose      =   require('mongoose');
const ejs           =   require('ejs');
const cron          =   require('node-cron');
const path          =   require('path');

mongoose.connect('mongodb://localhost/mynode');
const db = mongoose.connection;

// Import Routes Here
const UserRoutes    =   require('./routes/user');
const EmailRoutes    =   require('./routes/email');
const CronRoutes    =   require('./routes/cron');
const PublicRoutes    =   require('./routes/public');
const AwsRoutes    =   require('./routes/aws');

// Use Morgan to Log the Requests in Console
app.use(morgan('combined'));

// use Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// use CORS
app.use(cors());

// set the view engine to ejs
app.set('view engine', 'ejs');

// Set Static Folder

app.use('/pages', express.static(__dirname + '/pages'));

// use Routes
app.get("/", function (req, res) {
   res.send(req.protocol + '://' + req.headers.host + req.url );
   console.log(req.protocol + '://' + req.headers.host + req.url);

   // Run Cron Jon Every Second

   var task = cron.schedule('0-59 * * * * *', function(){
       console.log('cron job initiated');
       console.log(Date());
       
  }, false);
   
  task.start();

  
  });
app.use('/user', UserRoutes);
app.use('/email', EmailRoutes);
app.use('/cron', CronRoutes);
app.use('/public', PublicRoutes);
app.use('/aws', AwsRoutes);

// Error Handling

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports  =   app;