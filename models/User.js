// models/Manager.js
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    roleType:{type:String,required:true},
    name:{type:String,required:true},
  username: { type: String, required: true },
  password:{type:String,required:true}

});

userSchema.pre("save", function (next) {
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
  });
  
  userSchema.methods.checkPassword = function (password) {
    // console.log('password:', password,'this : ',this.password)
    return bcrypt.compareSync(password, this.password);
  };
  

module.exports = mongoose.model('User', userSchema);
