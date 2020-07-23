module.exports = function(app, User){//함수로 만들어 객체 app을 전달받음
    const Order = require('../models/order');
	var express = require('express');
    var router = express.Router();
    router.get('/table', function (req, res) {
        if(req.query.filt == '주문 모두 보기')
        {
            Order.find()
            .then(ord =>{
                res.send(ord)
            })
        }
        else{
            Order.find({status : `${req.query.filt}`})
            .then(ord =>{
                res.send(ord)
            })
        }
       
	})
    return router;	//라우터를 리턴
};