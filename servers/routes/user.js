module.exports = function(app, User){//함수로 만들어 객체 app을 전달받음
	var express = require('express');
	var router = express.Router();
	// router.post('/', function(req, res){
    //     console.log('제발')
	// 	res.send('성공해라!');		
	// });
	const passport = require('passport');

	//로그인
	router.post('/', passport.authenticate('local-login', {
		successRedirect: '/App/Orders',
		failureRedirect: '/'
		})
	);

	//회원가입
	// router.post('/add', passport.authenticate('local-login', {
	// 	successRedirect: '/App/Orders',
	// 	failureRedirect: '/'
	// 	})
	// );


	//로그아웃
return router;	//라우터를 리턴
};