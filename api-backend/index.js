const express = require('express');
const path = require('path');
const app = express();
const port = 9103;
const bodyparser = require('body-parser')
const api = require('./routes/intelliq_api')

//const baseurl = '/intelliQ/api';

// Middlewares
app.use(bodyparser.json());
app.use('/intelliq_api', api);
app.use(express.static(path.join(__dirname, 'frontend')));

// Set up nunjucks templating engine
const nunjucks = require('nunjucks');
nunjucks.configure(path.join(__dirname, '..', 'frontend', 'templates'), {
    autoescape: false,
    express: app
})

app.set('view engine', 'html');

// Initialize port for node application to run

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// Get request to root
app.get('/', (req, res) => {
    res.render('index', { title: 'IntelliQ' });
})

app.get('/create', (req, res) => {
    res.render('qqinit');
})

//const Questionnaire = require('./routes/Questionnaire');
//const Question = require('./routes/Question');

//Rest API endpoints
//app.use(baseurl + "/questionnaire", Questionnaire);
//app.use(baseurl + "/question", Question);


/* var mysql = require('mysql');

//connect with database

function getAllData(req,res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "toulou"

    });
    // querying databse

    con.connect(function(err) {
        if(err) throw err;
        console.log("Connected");
        let myquery ="";
        con.query(myquery,function(err,results,fields){
            if(err) throw err;
            res.send(result);
        });
    });
} */