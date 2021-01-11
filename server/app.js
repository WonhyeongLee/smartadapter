const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const config = require("./config/key");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const PORT = process.env.NODE_ENV === "production" ? 3000 : 3002;


const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB 접속성공'))
  .catch(err => console.log(err));

app.use(cors())

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

const Schema = mongoose.Schema;
const tabSchema = new  Schema(
    {"_id":Schema.Types.ObjectId ,"name":String,"qty":Number}
)
const datas = mongoose.model('tab',tabSchema,'pc1');



console.log("현재 모드 : ", process.env.NODE_ENV);

if (process.env.NODE_ENV == "production") {
  console.log("Production Mode1");
} else if (process.env.NODE_ENV == "development") {
  console.log("Development Mode");
}


// app.get('/', (req,res) => res.send('Test!'));
app.get('/', (req,res) => {
    datas.find(function(err,data){
        if(err){
            console.log("error::" + err);
        }else{
            res.send(data);
        }
    })
});

app.listen(PORT, () => {
    console.log(`server listen on ${PORT}`);
  });
