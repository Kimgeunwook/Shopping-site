module.exports = function(app){//함수로 만들어 객체 app을 전달받음
	var express = require('express');
	var router = express.Router();
	router.post('/', function(req, res){
        console.log('제발')
		res.send('Hello /p1/r1');		
	});

	router.post('/login', function(req, res){
        console.log('제발2')
		res.send('Hello /p1/r2');		
	});
	return router;	//라우터를 리턴
};