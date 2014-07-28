var express = require('express');
var app = express();
var hbs = require('hbs');
var mysql = require('mysql');

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
    res.render('newRequestForm', {
        address: req.query.address
    });
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

app.post('/saveRequest', function(req, res) {
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    var request = {
        username: 'Prokopis',
        longt: '2345.67',
        lat: '9475.90',
        address: req.body.address,
        date: req.body.address,
        category: req.body.category,
        subCategory: req.body.subcategory,
        image: 'i am an imaaaage',
        title: req.body.title,
        requestTxt: req.body.maintext
    }

    console.log(JSON.stringify(request));

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'gadget69',
        password: ''
    });

    connection.connect(function(err) {
         if (err) throw err;
    });

    var q = connection.query('insert into c9.requestTable set ?', request, function(err, result) {
        if (err) throw err;

        console.log(result);
    });

    connection.end();


    res.send('Ok! i got It!');
});

app.listen(process.env.PORT);