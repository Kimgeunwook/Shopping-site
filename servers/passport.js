const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./models/user');
var bcrypt = require('bcryptjs')
module.exports = () => {

  passport.use(new LocalStrategy(Users.authenticate()));
  passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    done(null, user); // 여기의 user가 req.user가 됨
  });

  passport.use('local-login',new LocalStrategy({ // local 전략을 세움
    usernameField: 'id',
    passwordField: 'password',
    session: true, // 세션에 저장 여부
    passReqToCallback: false,
  }, (id, password, done) => {
    Users.findOne({ id: id }, (findError, user) => {
      if (findError) return done(findError); // 서버 에러 처리
      if (!user) return done(null, false, { message: '존재하지 않는 아이디입니다' }); // 임의 에러 처리
      // console.log(user.password)
      // console.log(password)
      // bcrypt.genSalt(10, (err,salt) => {
      //   bcrypt.hash(user.password, salt, async (err,hash) =>{
      //     if(err) throw err;
      //     password = hash;
      //     console.log(user.password)
      // console.log(password)
      //     return user.comparePassword(password, (passError, isMatch) => {
      //     if (isMatch) {
      //       return done(null, user); // 검증 성공
      //     }
      //     return done(null, false, { message: '비밀번호가 틀렸습니다' }); // 임의 에러 처리
      //   });
      //   })
      // })
      bcrypt.compare(password, user.password,(err,res)=>{
        if(err) console.log('에러다@@@@@@')
        else{
          if(res){
            console.log('비번맞음')
            return done(null, user); 
          } 
          else {
            console.log('비번 틀림')
            return done(null, false, { message: '비밀번호가 틀렸습니다' });
          }
        }
      })

      // return user.comparePassword(password, (passError, isMatch) => {
      //   if (isMatch) {
      //     return done(null, user); // 검증 성공
      //   }
      //   return done(null, false, { message: '비밀번호가 틀렸습니다' }); // 임의 에러 처리
      // });
    });
  }));
};