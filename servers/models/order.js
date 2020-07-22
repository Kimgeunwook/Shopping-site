const mongoose = require('mongoose');

// schema
const orderSchema = mongoose.Schema({ 
  check : {type : Boolean},
  num:{type:Number, required:true}, //화면에 보여지는 번호(순차적)
  type : {type : String, required : true}, //교환 환불등
  orderDate: {type:Date, default:Date.now}, //주문일시
  orderNum : {type : Number, required : true}, //주문번호
  name : {type : String , required : true},
  seller : {type : String , required : true},
  buyer : {type : String , required : true},
  price : {type : Number, required : true},
  status : {type : String, required : true}
});


module.exports = mongoose.model('orders', orderSchema);
