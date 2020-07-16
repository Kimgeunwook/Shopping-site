// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var bookSchema = new Schema({
//     title: String,
//     author: String,
//     published_date: { type: Date, default: Date.now  }
// });

// module.exports = mongoose.model('book', bookSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    check: String,
    id : Number,
    type : String,
    date : String,
    num : Number,
    product : String,
    seller : String,
    orderer : String,
    price : String,
    status : String
});

module.exports = mongoose.model('product', bookSchema);