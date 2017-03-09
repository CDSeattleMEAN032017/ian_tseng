var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(express.static(__dirname + '/static'))
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.get('/', function(request, response) {
  response.render('index');
})

app.post('/result', function(request, response) {
  console.log('POST DATA: ', request.body)
  var form_data = {
    name: request.body.name,
    home_base: request.body.home_base,
    favorite_drink: request.body.favorite_drink,
    comment: request.body.comment
  }
  response.render('result', {data : form_data})
})

app.listen(8000, function() {
  console.log("listening on port 8000");
})
