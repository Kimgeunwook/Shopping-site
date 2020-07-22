module.exports = function(app, User){//함수로 만들어 객체 app을 전달받음
	var express = require('express');
	var router = express.Router();
	var bcrypt = require('bcryptjs')
	const passport = require('passport');
	//로그인
	router.post('/', passport.authenticate('local-login', {
		successRedirect: '/App/Orders',
		failureRedirect: '/'
		})
	);

	//회원가입
	router.post('/join', async function (req, res) {
        const {
            body: { firstName, lastName, email, password },
        } = req;
		//비번 없으면
        if (!password) {
            res.status(400);
            res.redirect('/SignUp')
        } else {
            try {
                const user = await User({
                    id: email,
                    password,
				});
				bcrypt.genSalt(10, (err,salt) => {
					bcrypt.hash(user.password, salt, async (err,hash) =>{
						if(err) throw err;
						user.password = hash;
						await User.register(user, password);
						res.redirect('/')
					})
				})
				// await User.register(user, password);
                // res.redirect('/')
            } catch (error) {
                console.log(error);
                res.redirect('/SignUp');
            }
        }
    })


	//로그아웃
	router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
	})
	
return router;	//라우터를 리턴
};