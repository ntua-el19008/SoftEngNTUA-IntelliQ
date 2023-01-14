const express =require('express')
const app = express();
const port = 8000
const bodyparser = require('body-parser')
const api =require('./routes/intelliq_api')

//middleware
app.use('/intelliq_api', api )
app.use(bodyparser.json())

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});

app.get('/',(req,res) => {
    res.send("hello world")
})

app.post('/checkParser', (req,res) => {
    console.log("using body parser: ", req.body.value)
    res.send({"body":req.body})
})

var mysql = require('mysql');

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
}