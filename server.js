// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp",function (req,res){
var date = new Date();
  res.json({"unix":date.getTime(),"utc":date.toUTCString()})
})
app.get("/api/timestamp/:date_string?",function (req, res){
var regex = /^[\d]{1,5}[-]{1}([0]?[1-9]{1}|[1]{1}[0-2]{1})[-]{1}([0]?[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-1]{1})/g;
var regexUnix = /^[0-9]{1,17}$/g; 
  
var date = new Date(req.params.date_string);
var date0 = parseFloat(req.params.date_string);
  
  if(regex.test(req.params.date_string)){
    res.json({"unix":date.getTime(),"utc":date.toUTCString()})
  }
  else if(regexUnix.test(req.params.date_string)){
  res.json({"unix":date0,"utc":new Date(date0).toUTCString()})
  }
   else{res.json({"unix": null, "utc" : "Invalid Date" })}
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});