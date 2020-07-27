// const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');

// const userSchema = new mongoose.Schema({
//   id: String,
//   password: String
// });

// userSchema.methods.comparePassword = function(inputPassword, cb) {
//   if (inputPassword === this.password) {
//     cb(null, true);
//   } else {
//     cb('error');
//   }
// };

// userSchema.plugin(passportLocalMongoose,{usernameField:"id"});

// module.exports = mongoose.model('users', userSchema);

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  Name : String,
  id: String,
  password: String,
  HP : String,
  address : String,
  statusFlag : {type:Boolean, default:true},
  grade : {type:Number, default:1},
  susbscriptionDate : {type:Date, default:Date.now},
  visit : {type:Number, default:1},
  totalPurchaseAmount : {type:Number, default:0},
  totalReserve :{type:Number, default:0},
  mailReceive : {type:Boolean, default:true},
  site : String,
  
});

userSchema.methods.comparePassword = function(inputPassword, cb) {
  if (inputPassword === this.password) {
    cb(null, true);
  } else {
    cb('error');
  }
};

userSchema.plugin(passportLocalMongoose,{usernameField:"id"});

module.exports = mongoose.model('users', userSchema);