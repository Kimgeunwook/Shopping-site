module.exports = function(app, Product){//함수로 만들어 객체 app을 전달받음
	var express = require('express');
    var router = express.Router();
    router.post('/add' , function (req, res) {
        console.log(req)    
        res.redirect('/App/ProductAdd')
    })
    
    
    return router;	//라우터를 리턴
};