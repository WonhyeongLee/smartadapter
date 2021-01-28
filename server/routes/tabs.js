const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require("mongoose");
const config = require("../config/key");

const connect = mongoose.connect(config.mongoURI,
    {
      useNewUrlParser: true, useUnifiedTopology: true,
      useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB 접속성공'))
    .catch(err => console.log(err));

const Schema = mongoose.Schema;
const tabSchema = new  Schema(
    {"_id":Schema.Types.ObjectId ,"name":String,"qty":Number}
)
const datas = mongoose.model('tab',tabSchema,'pc1');

router.get('/', (req,res, next) => {
    datas.find(function(err,data){
        if(err){
            console.log("error::" + err);
        }else{
            res.send(data);
        }
    })
});

module.exports = router;