const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type: String,
    unique:true,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   role:{
      type:String,
      enum:["user","admin"],
      default:"user"
   },
   date:{
    type:Date,
    default: Date.now 
   },
  });
  const User=mongoose.model('user',UserSchema)
  module.exports=User;