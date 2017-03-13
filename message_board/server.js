var express = require("express");
var app = express();
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/messageboard');

/***************Model Setup*****************************/
var Schema = mongoose.Schema;
// Message Schema
var MessageSchema = new mongoose.Schema( {
  name: {type: String, required: true, minlength: 4},
  message: {type: String, required: true},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamp: true});

mongoose.model('Message', MessageSchema);
var Message = mongoose.model('Message');

// Comment Schema
var CommentSchema = new mongoose.Schema( {
  name: {type: String, required: true, minlength: 4},
  comment: {type: String, required: true},
  _message: {type: Schema.Types.ObjectId, ref: 'Message'}
}, {timestamp: true});

mongoose.model('Comment', CommentSchema);
var Comment = mongoose.model('Comment');
/*******************************************************/

// Grabs all the messages/comments, renders them on index.ejs
app.get('/', function(req, res) {
  Message.find({}, false, true).populate('comments').exec(function(err, messages){
    res.render('index', {messages: messages});
  })
})

// Posts message to the baord, if validations fail, show errors instead
app.post("/message", function(req, res){
  var newMessage = new Message({name: req.body.name, message: req.body.message});
  newMessage.save(function(err){
    if(err){
      console.log(err);
      res.render('index', {errors: newMessage.errors});
    } else {
      console.log("success");
      res.redirect('/');
    }
  })
})

// Posts comments to the message, if validations fail, show errors instead
app.post("/comment/:id", function(req, res){
  console.log("getsome")
  var message_id = req.params.id;
  Message.findOne({_id: message_id}, function(err, message){
    var newComment = new Comment({
      name: req.body.name, comment: req.body.comment
    });
    newComment._message = message._id;

    Message.update({_id: message._id}, {$push: {"comments": newComment}}, function(err){
    });
    newComment.save(function(err){
      if(err){
        console.log(err);
        res.render('index', {errors: newComment.errors});
      } else {
        console.log("comment added");
        res.redirect("/");
      }
    });
  });
});

app.listen(8000, function() {
    console.log("listening on port 8000")
})
