var mongoose = require('mongoose');
var Name = mongoose.model('Name')

module.exports = {
  index: function(req, res) {
    Name.find({}, function(err, names) {
      if (err) {
        console.log(err)
      } else {
        res.json(names);
      }
    })
  },
  create: function(req, res) {
    var name = new Name( {
      name:req.params.name
    });
    name.save(function(err, results) {
      if(err) {
        console.log("Nope")
      } else {
        console.log("Added: " + name.name)
        res.redirect('/')
      }
    })
  },
  destroy: function(req, res) {
    Name.remove({name: req.params.name}, function(err, results) {
      if (err) {
        console.log(err)
      } else {
        console.log('Specified name deleted')
        res.redirect('/')
      }
    })
  },
  show: function(req, res) {
    Name.findOne({name: req.params.name}, function(err, name) {
      if (err) {
        console.log(err)
      } else {
        console.log('Specified name shown')
        res.json(name)
      }
    })
  }
}
