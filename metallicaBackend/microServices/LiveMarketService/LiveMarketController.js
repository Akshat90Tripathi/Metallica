var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var amqp = require('amqplib/callback_api');
const io = require('socket.io')();

const sql = require('msnodesqlv8');
const connectionString = "server=WKWIN6368400;Database=Metal_Trading;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
  });

var Data = [];

app.get('/LiveMarketData', function (req, res) {
    query = "Exec GetLiveMarketData"
    sql.query(connectionString, query, (err, MarketData) => {
        if (err) console.log(err);
        else {res.json(MarketData);
           Data = MarketData;
        }
    })
});

var Description = null;
var Price = null;

amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'liveMarket';

        ch.assertQueue(q, { durable: false });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);


        ch.consume(q, function (msg) {
            console.log(" [x] Received %s", msg.content);
            msg = JSON.parse(msg.content.toString());
            console.log(Data)
            for (i = 0; i < Data.length; i++) {
                 
                if (Data[i].CommodityId === msg.commodityID) {
                    Description = Data[i].Description;
                    Price = Data[i].Price;
                }
            }
            console.log(Price)
            if (msg.Side ==="0") {
                Price = Price + (0.01 * Price);
                Description = Description + " : price increases by 1%"
            }
            else {
                Price = Price - (0.02 * Price)
                Description = Description + " : price decreases by 2%"
            }
            console.log(Price)
            
            var queue = 'updateMarketPrice';
            ch.assertQueue(queue, { durable: false });
            if(Price>0){
            sql.query(connectionString, "Exec UpdateLiveMarket '" + msg.commodityID + "'," + Price, (err, MarketData) => {
                if (err) console.log(err);
                else {
                    
                    marketdata = JSON.stringify({ data: MarketData, Description: Description })
                    ch.sendToQueue(queue, new Buffer(marketdata));
                    console.log(" [x] Sent %s", marketdata);
                    Data = MarketData;
                
            }
            })
        }
        }, { noAck: true });

    });

});



var port = process.env.PORT || 3050;

app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
});

