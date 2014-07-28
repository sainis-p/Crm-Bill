var express = require('express');
var app = express();
var hbs = require('hbs');

app.set('view engine', 'html');
app.engine('html', hbs.__express);
 
app.use(express.static('public'));
//app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.json());

app.get('/', function(req, res) {
    res.render('maintest');
});

app.get('/MyRequests', function(req, res) {
    res.render('myRequests');
});

app.get('/NewRequest', function(req, res) {
    res.render('newRequest');
});

app.get('/NewRequestForm', function(req, res) {
     console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    res.render('newRequestForm',{address: req.query.address});
});

app.get('/PreviewRequests', function(req, res) {
    res.render('previewRequests');
});

app.get('/paramget/:name', function(req, res) {
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    res.send('Good job ' + req.params['name']);
});
 
app.get('/request/new', function(req, res) {
    res.render('pgNewRequest');
});

app.post('/apost', function(req,res) {
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    res.send('Ok! ' + req.body.Firstname + ' ' + req.body.Lastname+', i got It!');
});

app.listen(process.env.PORT);