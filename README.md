# 목차
### 1. 프로젝트 소개 
### 2. 시스템 구성도  
### 3. 기술적 문제 해결 
### 4. Citation
### 5. Ruuning
<br/>
<br/>
<br/>
<br/>

# 1. 프로젝트 소개
***쇼핑몰 관련 스타트업 회사에서 사내 직원분들과 상품 판매자분들이 사용하는 백 오피스 웹 애플리케이션을 개발하였고, 이 Repository는 해당 프로젝트를 개인적으로 복기시킨 버전입니다.***
<img src="https://user-images.githubusercontent.com/48399897/137819373-3b0bfcaf-84a7-4b41-9ac6-5529c0f610c5.PNG" width="96%" height="64%"  >  
<br/>
<br/>
<br/>
<br/>
# 2. 시스템 구성도  
<img src="https://user-images.githubusercontent.com/48399897/136685496-e0c7864c-0d65-40b6-80f8-b5eedcb5ddd6.PNG" width="96%" height="64%"  >  
<br/>
<br/>
<br/>
<br/>

# 3. 기술적 문제 해결  
<details markdown="1">   
<summary>3-1. Refactoring</summary>  

</details> 


<details markdown="1">   
<summary>3-2. CORS</summary>  

</details> 

<details markdown="1">   
<summary>3-3. Denormalization</summary>  

</details> 

<br/>
<br/>
<br/>
<br/>


# 4. Citation
<details markdown="1">   
<summary>4-1. Solution</summary>  

> - mongdb --- express 연동 : https://velopert.com/594
> - react --- nodejs 연동 : https://hello-bryan.tistory.com/122
> - 클라 - 서버 통신 안됐던 이유 : cross domain문제로 setuproxy에서 지정한 루트로 접근해야함
</details> 

<details markdown="1">   
<summary>4-2. About DB</summary>  

> - 연동 : https://velopert.com/594
> - CRUD : https://velopert.com/mongodb-tutorial-list
> - 로그인, 회원가입 : https://j-remind.tistory.com/44
> - 비밀번호 HASH : https://hyeooona825.tistory.com/27
</details>
<br/>
<br/>
<br/>
<br/>

# 5. Running
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
