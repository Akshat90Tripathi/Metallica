var express = require('express');
const sql = require("msnodesqlv8");
TradeController = {};
const connectionString = "server=WKWIN6368400;Database=Metal_Trading;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors')

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//GetUserById
app.get('/User/:id', cors(), function (req, res) {
    query = "Exec GetUserById '" + req.params.id + "'";
    sql.query(connectionString, query, (err, User) => {
        if (err) res.send(err);
        else res.json(User);
    });
})

//Insert Into User
app.post('/User', function (req, res) {
            query = "Exec InsertIntoUser '" + req.body.Name + "','" + req.body.UserName + "','" + req.body.Password + "','" + "Trader" + "'";
            sql.query(connectionString, query, (err, User) => {
                if (err) res.send(err);
                else {
                    if(User[0].Result==='f'){
                     res.send({result:'Username Already Exists'});
                    }
                    else  {
                    res.send({result:'Username Added'});
                }
            }
            });
})

app.post('/verifyUser', function (req, res) {
    query = "Exec VerifyUser '" + req.body.UserName + "','" + req.body.Password + "'";
    console.log(query);
    sql.query(connectionString, query, (err, data) => {
        if (err) res.send(err);
        if (data != '')
            res.send(data)
        else
            res.send("error");
    });
})

var port = process.env.port || 3054;
app.listen(port, function () {
    console.log("App is running on port " + port + "!")
})