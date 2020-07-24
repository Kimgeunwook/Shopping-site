# Shopping website
# Stack
- React
- Material Ui
- React Router
- Node js
- Express
- Mongo DB
- Mongoose

# prepare
```
npm install 
```
# running
1. C:\data\db 폴더생성
2. cmd에 mongod (디비 서버 실행)
3. 다른 cmd에 mongo치고 적절한 디비 넣어주기
4. 또 다른 cmd에 프로젝트 폴더가서 npm install 후 npm start 하기

# router
1. 기본 router기능 main.js참고
2. 클릭했을때 페이지 이동시 usehistory사용 


# issue
1. main.js 에서 App부분 라우트 할때 app/ 은 어케 따로 지정하는지
2. ex) 페이지 번호 넘기는건 페이지 컴포넌트에서 하는데 그 변수값을 import하는 컴포넌트에서 어떻게 관리할 것인지  
3. 회원리스트 화면 grid 너무 삐뚤빼뚤

# solution
1. component 사용시 component함수이름과 파일이름일치
2. 컴포넌트 첫글자는 대문자
3. mongdb --- express 연동 : https://velopert.com/594
4. react --- nodejs 연동 : https://hello-bryan.tistory.com/122
5. 클라 - 서버 통신 안됐던 이유 : setuproxy에서 지정한 루트로 접근해야함

# mongdb  사용법
1. mongod로 서버구동(만들어질 폴더 path는 자신이 지정할 수 있음)
2. mongo로 서버 (환경변수설정 필요)
3. use {내가원하는 db이름}   (여기까지만 하면 show dbs했을때 안보임)
4. db.{3에서 만든 db이름}.insert({"name" : "김근욱"});
5. 제거를 원하면 db.dropDatabase();
6. collection생성 원할시 db.createCollection("{내가 원하는 컬렉션 이름}")
7. 컬렉션에 데이터 넣기
```
> db.createCollection("articles", {
... capped: true,
... autoIndex: true,
... size: 6142800,
... max: 10000
... })
{ "ok" : 1 }
```
또는
```
db.people.insert({"name": "velopert"})
```
8. collection 리스트 확인 : show collections
9. 컬렉션 제거 : db.{지우고 싶은 collection이름}.drop()
10. 컬렉션 안의 내용 확인 : db.{컬렉션이름}.find().pretty()
11. 컬렉션의 다큐먼트 삭제: db.{컬렉션이름}.remove({"name": "Book1"})
