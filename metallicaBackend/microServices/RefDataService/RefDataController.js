var express = require('express');
var app = express();
const sql = require('msnodesqlv8');
const connectionString = "server=WKWIN6368400;Database=Metal_Trading;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";


app.get('/',function(req,res){
    res.send("Welcome To Ref Data Service </br>"+
             " /Commodity    : To get Commodities </br>"+
             " /CounterParty : To get CounterParty </br>"+
             " /Location     : To get Location")
})
//Get Commodities
app.get('/Commodity', function (req, res) {
    query = "Exec GetAllCommodities"
    sql.query(connectionString, query, (err, Commodities) => {
        if (err) console.log(err);
        else res.json(Commodities);
    })
})

//Get Location
app.get('/Location',function (req, res) {
    query = "Exec GetAllLocation"
    sql.query(connectionString, query, (err, Location) => {
        if (err) console.log(err);
        else res.send(Location);
    })
})

//Get CounterParty
app.get('/CounterParty',function (req, res) {
    query = "Exec GetAllCounterParty"
    sql.query(connectionString, query, (err, CounterParty) => {
        if (err) console.log(err);
        else res.json(CounterParty);
    })
})

 var port = process.env.PORT || 3052;

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});