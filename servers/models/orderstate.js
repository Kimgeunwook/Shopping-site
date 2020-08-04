const mongoose = require('mongoose');

// schema
const orderstateSchema = mongoose.Schema({ 
    type : String,
    orderDate:{type:Date, default:Date.now},
    orderNum : Number,
    orderStatus : String,
    orderQuantity : Number,
    orderOption: [Number],
    orderPrice:Number,
    buyer : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
    },
    orderProduct : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "products",
    },
    orderMethod : String,
    orderTransitNum :Number,
});


module.exports = mongoose.model('orderstates', orderstateSchema);
