var express = require('express');
var app = express();
const sql = require("msnodesqlv8");
const connectionString = "server=WKWIN6368400;Database=Metal_Trading;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
var bodyParser = require('body-parser');
var amqp = require('amqplib/callback_api');
var amqpconn = null;
var queuedata = null;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//GetAllTrades
app.get('/Trade', function (req, res) {
    query = "Exec GetAllTrades";
    sql.query(connectionString, query, (err, Trades) => {
        if (err) res.send(err);
        else res.json(Trades);
    });
})

//GetTradeById
app.get('/Trade/:id', function (req, res) {
    query = "Exec GetTradeById '" + req.params.id + "'";
    sql.query(connectionString, query, (err, Trade) => {
        if (err) res.send(err);
        else res.json(Trade);
    });
})

//Delete Trade
app.delete('/Trade/:id', function (req, res) {
    query = "Exec DeleteTrade '" + req.params.id + "'";
    var tradeid = req.param.id
    sql.query(connectionString, query, (err, Trade) => {
        if (err) res.send(err);
        else {
            res.json(Trade);
            // count=JSON.parse(Trade);
            console.log(JSON.stringify(Trade[0].Count))
            amqp.connect('amqp://localhost', function (err, conn) {
                conn.createChannel(function (err, ch) {
                    var q = 'hello';
                    console.log(tradeid)
                    var status = Trade[0].Count===0 ? "Already Deleted, Please Refresh your grid" : "Deleted"
                    var msg = JSON.stringify({ data : Trade, status : status })
                    ch.sendToQueue(q, new Buffer(msg));
                    console.log(" [x] Sent %s", msg);

                });
                setTimeout(function () { conn.close(); /*process.exit(0)*/ }, 500);
            });
        }
    });
})

//Update Trade
app.put('/Trade/:id', function (req, res) {
    query = "Exec UpdateTrade '" + req.params.id + "','" + req.body.CommodityId +
        "'," + req.body.Side + "," + req.body.Quantity
        + "," + req.body.Price + ",'" + req.body.CounterPartyId +
        "','" + req.body.LocationId + "','" + req.body.UserId + "'";
    sql.query(connectionString, query, (err, Trade) => {
        if (err) res.send(err);
        else {
            res.json(Trade);

            amqp.connect('amqp://localhost', function (err, conn) {
                conn.createChannel(function (err, ch) {
                    var q = 'hello';
                    var msg = JSON.stringify({ data: Trade, status: "Updated" })
                    ch.sendToQueue(q, new Buffer(msg));
                    console.log(" [x] Sent %s", msg);
                });
                setTimeout(function () { conn.close(); /*process.exit(0)*/ }, 500);
            });
        }
    });
})

var commodityID = null;
var OrderSide = null;
// Insert Trade    
app.post('/Trade', function (req, res) {
    query = "Exec InsertIntoTrade '" + req.body.CommodityId +
        "'," + req.body.Side + "," + req.body.Quantity
        + "," + req.body.Price + ",'" + req.body.CounterPartyId +
        "','" + req.body.LocationId + "','" + req.body.UserId + "'";
    commodityID = req.body.CommodityId;
    OrderSide = req.body.Side;
    sql.query(connectionString, query, (err, TradeData) => {
        if (err) res.send(err);
        else {
            res.send(req.body);
            //ADD To Queue
            console.log(TradeData.Id)
            sql.query(connectionString, "Exec DisplayTrade '" + TradeData[0].Id + "'", (err, TradeData) => {
                if (err) res.send(err);
                else {
                    amqp.connect('amqp://localhost', function (err, conn) {
                        conn.createChannel(function (err, ch) {
                            var q = 'hello';
                            var MarketQueue = 'liveMarket';
                            var msg = JSON.stringify({ data: TradeData, status: "Added" });
                            console.log(msg)
                            ch.assertQueue(q, { durable: false });
                            ch.sendToQueue(q, new Buffer(msg));
                            console.log(" [x] Sent %s", msg);

                            var Data = JSON.stringify({ commodityID: commodityID, Side: OrderSide })
                            ch.assertQueue(MarketQueue, { durable: false });
                            ch.sendToQueue(MarketQueue, new Buffer(Data));
                            console.log(" [x] Sent %s", Data);
                        });
                        setTimeout(function () { conn.close(); /*process.exit(0)*/ }, 500);
                    });
                }
            });
        }
    });
})

app.post('/filter', function (req, res) {
    //   console.log(req.body);
    query = "Exec SearchTrade " + JSON.stringify(req.body.StartDate) + "," + JSON.stringify(req.body.EndDate) + ","
        + JSON.stringify(req.body.CommodityName) + "," + JSON.stringify(req.body.Side) + ","
        + JSON.stringify(req.body.PartyName) + "," + JSON.stringify(req.body.LocName);
    console.log(query);
    sql.query(connectionString, query, (err, trade) => {
        if (err) res.send(err);
        else res.send(trade);
    });

})

var port = process.env.PORT || 3053;

app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
});


