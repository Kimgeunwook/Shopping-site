const mongoose = require('mongoose');

// schema
const productSchema = mongoose.Schema({ 
    name: {type : String , required : true},
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
    },
    price: [Number],
    stock : [Number],
    option : [String],
    image : String,
    category : String,
    feature : String,
});


module.exports = mongoose.model('products', productSchema);
