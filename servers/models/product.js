const mongoose = require('mongoose');

// schema
const productSchema = mongoose.Schema({ 
    name: {type : String , required : true},
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
    },
    price: Number,
    image : String,
    site : String,
    shippingMethod : String,
    shippingFee : Number,
    category : String,
    option : [{
        name : String,
        detail : String,
        price : Number,
        stock : Number,
    }],
    information: [{
        info: String,
        description: String
      }],
    feature : [String],
});


module.exports = mongoose.model('products', productSchema);
