module.exports = function(app, User){//함수로 만들어 객체 app을 전달받음
	var express = require('express');
    var router = express.Router();
    router.get('/table', function (req, res) {
        // User.find().skip((req.query.page - 1) * 10).skip((req.query.page - 1) * 10).limit(10)
        //         .then(ord =>{
        //             res.send(ord)
        //         })
        const keyword = req.query.keyword 
        const keyText = req.query.keyText 
        
        if(typeof keyword == "undefined")
        {
            User.find().skip((req.query.page - 1) * 10).skip((req.query.page - 1) * 10).limit(10)
                    .then(ord =>{
                        res.send(ord)
                    })
        }
        else
        {
            if(keyword === 'name')
            {
                User.find({Name : keyText}).skip((req.query.page - 1) * 10).limit(10)
                .then(ord =>{
                    res.send(ord)
                })
            }
            else if(keyword === 'id')
            {
                User.find({id : keyText}).skip((req.query.page - 1) * 10).limit(10)
                .then(ord =>{
                    res.send(ord)
                })
            }
            else if(keyword === 'hp')
            {
                User.find({HP : keyText}).skip((req.query.page - 1) * 10).limit(10)
                .then(ord =>{
                    res.send(ord)
                })
            }
        }
    })
    
    router.get('/detail', function (req, res) {
        const grade = req.query.grade
        const mailstate = req.query.mailstate
        const lowerAmount = req.query.lowerAmount //총합 최저가
        const upperAmount = req.query.upperAmount //총합 최고가
        const lowerReserve = req.query.lowerReserve //적립금 최저가
        const upperReserve = req.query.upperReserve //적립금 최고가
        const fromDate = new Date(req.query.fromDate)
        const toDate = new Date(req.query.toDate)
        toDate.setDate(toDate.getDate() + 1)
        
        const gradeArr = {'one' : [1,1], 'two' : [2,2], 'three' : [3,3] , 'four' : [4, 4], 'five' :[5,5] , 'all' : [1,5]}
        User.find({ 'grade': {$gte : gradeArr[grade][0], $lte : gradeArr[grade][1]},
                    susbscriptionDate: {"$gte":fromDate,"$lte": toDate} ,
                    'totalPurchaseAmount' : {$gte : lowerAmount, $lte : upperAmount},
                   'totalReserve' : {$gte : lowerReserve, $lte : upperReserve}  },).skip((req.query.page - 1) * 10).limit(10)
                .then(ord =>{
                    res.send(ord)
                })
	})
    return router;	//라우터를 리턴
};