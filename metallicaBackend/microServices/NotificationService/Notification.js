var express = require('express');
var app = express();
var amqp = require('amqplib/callback_api');
const io = require('socket.io')();
//var cors = require('cors')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","http://wkwin6368400:3001")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
  });

var bool = true;
var Queuedata = null;


amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'hello';
        var queue='updateMarketPrice'

        ch.assertQueue(q, { durable: false });
        ch.assertQueue(queue, { durable: false });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);


        io.on('connection', (client) => {

            io.emit('timer', 'Hello',"Me")

            ch.consume(q, function (msg) {
                console.log(" [x] Received %s", msg.content);
              var jsonFormatData=JSON.parse(msg.content.toString())
                 
                io.emit('timer',jsonFormatData);
            }, { noAck: true });
            
            ch.consume(queue, function (msg) {
                console.log(" [x] Received %s", msg.content);
              var jsonFormatData=JSON.parse(msg.content.toString())
                 
                io.emit('liveMarket',jsonFormatData);
            }, { noAck: true });

        });
       

    });



});

var port = process.env.port || 3051;

var server=app.listen(port)
io.listen(server);
