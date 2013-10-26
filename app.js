var http = require('http');
var express = require('express');
// var Facebook = require('facebook-node-sdk');
var redis = require('redis');
var redisClient = redis.createClient(17169, "pub-redis-17169.us-east-1-3.1.ec2.garantiadata.com");

var app = express();

app.configure(function () {
    app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

redisClient.on("error", function (err) {
    console.log("Error " + err);
});

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'foo bar' }));
  //app.use(Facebook.middleware({ appId: '443450462433313', secret: 'e845699c7d3e0e47b7a02f63c04fa1c5' }));
});

// app.get('/', Facebook.loginRequired(), function (req, res) {
//   req.facebook.api('/me', function(err, user) {
//     //res.writeHead(200, {'Content-Type': 'text/plain'});
//     //res.end('Hello, ' + user.name + '!');
//     console.log("user " + user.name);
//   });
// });

app.post('/test', function(req, res) {
    var msg = req.body.aaa;
    console.log("msg=", msg);
    redisClient.lpush("messages", msg, function(err, response) {
      if(!err)
        console.log("aaa= " + msg);
      else
        console.log("err " + err);
    });
    res.send(req.body);
});

console.log("v 0.0.3");
app.listen(30000);