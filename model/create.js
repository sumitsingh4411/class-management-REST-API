const mongoose =require('mongoose');

const newteacher=mongoose.Schema({
      name:{
          type:String,
          required:true
      },
      username:{
          type:String,
          required:true,
          index:{
              unique:true,
          }
      },
      email:{
          type:String,
          required:true,
          index:{
              unique:true
          },
          mathch:/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/
      },
      password:{
           type:String,
           required:true
      },
})
module.exports=mongoose.model("create",newteacher);