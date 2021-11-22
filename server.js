let express = require("express");
let path = require('path');
let app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotingDojo', {useNewUrlParser: true});
const {quoteModel} = require('./models/quoteModel')

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render("form");
})

app.post('/add', function(req, res) {
    let quote = {}
    quote.name = req.body.name;
    quote.quote = req.body.quote;
    quote.date = new Date();
    quoteModel
    .createQuote(quote)
    .then(newQuote => console.log('quote created: ', newQuote))
    .catch(err => console.log(err))
    res.redirect('/show')
})

app.get('/show', function(req, res) {
    quoteModel
    .findAll()
    .then(data => res.render("results", {quotes: data}))
    .catch(err => res.json(err));
})

// tell the express app to listen on port 8000
app.listen(8085, function() {
 console.log("listening on port 8085");
});
