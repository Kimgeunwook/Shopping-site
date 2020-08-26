# Shopping website
# Stack
- React
- Material Ui
- Node js
- Express
- Mongo DB
- Mongoose

# running
```
로컬버전

1. mongodb setup(env)   
2. create folder in C:\data\db 
3. cmd -> mongod
4. npm install 
5. npm start


클라이언트 - 서버 분리버전
1. servers/server.js 38 line에 몽고서버 url로 변경
2. cmd에 cd servers 명령어 실행후 node server.js명령어로 서버구동
3. 클라이언트 실행시키기 위해서는 package.json의 scripts의 1~3줄을 [ "start": "react-scripts start", ] 로 대체
4. 그후 프로젝트 폴더 최상위에서 npm start로 클라이언트 실행
```

# solution
1. mongdb --- express 연동 : https://velopert.com/594
2. react --- nodejs 연동 : https://hello-bryan.tistory.com/122
3. 클라 - 서버 통신 안됐던 이유 : 포토번호 조정위해 setuproxy에서 지정한 루트로 접근해야함

# mongdb  사용법
0. 연동 : https://velopert.com/594
1. CRUD : https://velopert.com/mongodb-tutorial-list
2. 로그인, 회원가입 : https://j-remind.tistory.com/44
3. 비밀번호 HASH : https://hyeooona825.tistory.com/27
