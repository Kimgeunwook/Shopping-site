module.exports = function(app, User){//함수로 만들어 객체 app을 전달받음
    const Order = require('../models/order');
	var express = require('express');
    var router = express.Router();
    router.get('/table', function (req, res) {
        
        const keyword = req.query.keyword 
        const keyText = req.query.keyText 
        console.log('서버쪽:'+keyword+' '+keyText)
        if(typeof keyword == "undefined") // 검색사용 x
        {
            if(req.query.filt == '주문 모두 보기')
            {
                Order.find().sort({"num" : 1}).skip((req.query.page - 1) * 10).limit(10)
                .then(ord =>{
                    res.send(ord)
                })
            }
            else{
                Order.find({status : `${req.query.filt}`}).sort({"num" : 1}).skip((req.query.page - 1) * 10).limit(10)
                .then(ord =>{
                    res.send(ord)
                })
        }
        }
        else{  // 검색사용 o
            // Order.find({`${keyword}` : keyText} ).sort({"num" : 1}).skip((req.query.page - 1) * 10).limit(10)
            //     .then(ord =>{
            //         console.log(ord)
            //         res.send(ord)
            //     })
            if(keyword === 'buyer')
            {
                Order.find({buyer : keyText} ).sort({"num" : 1}).skip((req.query.page - 1) * 10).limit(10)
                .then(ord =>{
                    res.send(ord)
                })
            }
            else if(keyword === 'seller')
            {
                Order.find({seller : keyText} ).sort({"num" : 1}).skip((req.query.page - 1) * 10).limit(10)
                .then(ord =>{
                    res.send(ord)
                })
            }
            else if(keyword === 'name')
            {
                Order.find({name : keyText} ).sort({"num" : 1}).skip((req.query.page - 1) * 10).limit(10)
                .then(ord =>{
                    res.send(ord)
                })
            }
            else if(keyword === 'orderNum')
            {
                Order.find({orderNum : keyText} ).sort({"num" : 1}).skip((req.query.page - 1) * 10).limit(10)
                .then(ord =>{
                    res.send(ord)
                })
            }
        }
        
       
	})
    return router;	//라우터를 리턴
};