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
  id: String,
  password: String,
  Name : String
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