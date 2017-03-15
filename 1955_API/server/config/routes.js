var nineteen55 = require('../controllers/nineteen55.js')

module.exports = function(app) {
  app.get('/', function(req, res) {
    nineteen55.index(req, res)
  })
  app.get("/new/:name", function(req, res){
    nineteen55.create(req, res)
  })
  app.get("/remove/:name", function(req, res){
    nineteen55.destroy(req, res)
  });
  app.get('/:name', function(req, res) {
    nineteen55.show(req,res)
  })
}
