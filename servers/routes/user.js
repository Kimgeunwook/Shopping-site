module.exports = function(app){//함수로 만들어 객체 app을 전달받음
	var express = require('express');
	var router = express.Router();
	router.post('/', function(req, res){
        console.log('제발')
		res.send('성공해라!');		
	});

	return router;	//라우터를 리턴
};