module.exports = function(app, User){//함수로 만들어 객체 app을 전달받음
	var express = require('express');
	var router = express.Router();
	// router.post('/', function(req, res){
    //     console.log('제발')
	// 	res.send('성공해라!');		
	// });
	const passport = require('passport');
	router.post('/', passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/App/Orders'
		})
	);

return router;	//라우터를 리턴
};