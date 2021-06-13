const mongoose=require('mongoose');

const url="enter yoru own mangodb connection url"
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>{
    console.log('connection successfull with mongodb');
}).catch((err)=>{
    console.log('error in mongodb connection');
});