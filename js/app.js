var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('config');
var sendgrid = require('sendgrid')(config.get('sendgridKey'));
var helper = require('sendgrid').mail;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

function addSubscriber(email) {
  let request = sendgrid.emptyRequest();
  request.method = 'GET';
  // request.path = '/v3/contactdb/lists';
  // sendgrid.API(request, function (error, response) {
  //    console.log(response.body);
  //  });
  request.body = [{ "email": email }];
  request.method = 'POST';
  request.path = '/v3/contactdb/recipients';
  sendgrid.API(request, function (error, response) {
    if (error) {
      console.log(error);
      res.error(error);
    }

    const recipient_id = response.body.persisted_recipients[0];
    request = sendgrid.emptyRequest();
    request.method = 'POST';
    request.path = `/v3/contactdb/lists/${config.get('list')}/recipients/${recipient_id}`;
    sendgrid.API(request, function (error) {
      if (error) {
        console.log(error);        
      }
    });
  });
}

app.get('/fn/subscribe', function(req, res) {
  
  if (!req.query.email) {
    res.status(400).send({error:'email missing'});
  }
  else {
    addSubscriber(req.query.email);
    res.sendStatus(200);
  }

});

app.use(function(err, req, res, next) {

  const status = err.status || 500;
  if (status === 500) console.log(err);

  res.status(status);
  res.send({
    message: err.message,
    error: err
  });
});

module.exports =  app;