module.exports = function(app, Orderstate){//함수로 만들어 객체 app을 전달받음
	var express = require('express');
    var router = express.Router();
    router.get('/table', function (req, res) {
        // Orderstate.find().populate('orderProduct').
        // exec(function(err,result){
        //     res.send(result);
        // })
        
    //    Orderstate.find().populate('buyer').populate({path : 'orderProduct',
    //     populate: {path : 'seller'}}).
    //     exec(function(err,result){
    //         res.send(result);
    //     })
        
        const keyword = req.query.keyword 
        const keyText = req.query.keyText 
        if(typeof keyword == "undefined") // 검색사용 x
        {
            if(req.query.filt == '주문 모두 보기')
            {
                Orderstate.find().populate('buyer').populate({path : 'orderProduct',
                populate: {path : 'seller'}}).skip((req.query.page - 1) * 10).limit(10)
                .then(ord =>{
                    res.send(ord)
                })
            }
            else{
                Orderstate.find({orderStatus : `${req.query.filt}`}).populate('buyer').populate({path : 'orderProduct',
                populate: {path : 'seller'}}).skip((req.query.page - 1) * 10).limit(10)
                .then(ord =>{
                    res.send(ord)
                })
        }
        }
        else{
            if(keyword === 'buyer')
            {
                // {Name : keyText}
                Orderstate.find().populate('buyer').find({Name : keyText}).skip((req.query.page - 1) * 10).limit(10)
                .then(ord =>{
                    res.send(ord)
                })
            }
            // else if(keyword === 'seller')
            // {
            //     Orderstate.find({seller : keyText} ).populate('buyer').populate({path : 'orderProduct',
            //     populate: {path : 'seller'}}).skip((req.query.page - 1) * 10).limit(10)
            //     .then(ord =>{
            //         res.send(ord)
            //     })
            // }
            // else if(keyword === 'name')
            // {
            //     Orderstate.find({name : keyText} ).populate('buyer').populate({path : 'orderProduct',
            //     populate: {path : 'seller'}}).skip((req.query.page - 1) * 10).limit(10)
            //     .then(ord =>{
            //         res.send(ord)
            //     })
            // }
            // else if(keyword === 'orderNum')
            // {
            //     Orderstate.find({orderNum : keyText} ).populate('buyer').populate({path : 'orderProduct',
            //     populate: {path : 'seller'}}).skip((req.query.page - 1) * 10).limit(10)
            //     .then(ord =>{
            //         res.send(ord)
            //     })
            // }
        }





	})
    return router;	//라우터를 리턴
};