module.exports = function(app, User){//함수로 만들어 객체 app을 전달받음
	var express = require('express');
    var router = express.Router();
    router.get('/table', function (req, res) {
        User.find().skip((req.query.page - 1) * 10).limit(10)
                .then(ord =>{
                    res.send(ord)
                })
        
	})
    return router;	//라우터를 리턴
};