const mongoose =require('mongoose');

const student=mongoose.Schema({
      name:{
          type:String,
          required:true
      },
      address:{
          type:String,
          required:true
      },
      id_card:{
          type:String,
          required:true
      }
})
module.exports=mongoose.model("students",student);