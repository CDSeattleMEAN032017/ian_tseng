var mongoose = require('mongoose');
var NameSchema = new mongoose.Schema({
    name: String,
});

// use our schema to create our new model.
mongoose.model('Name', NameSchema);
var Name = mongoose.model('Name');
