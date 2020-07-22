module.exports = function(app, User){//함수로 만들어 객체 app을 전달받음
    const Order = require('../models/order');
	var express = require('express');
    var router = express.Router();
    router.get('/', function (req, res) {
        console.log('여기들어옴')
        Order.find({name : '카라티'})
        .then(ord =>{
            res.send(ord)
        })
       
	})
    return router;	//라우터를 리턴
};