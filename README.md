# SP KOREA

> 🔗 실제 배포 사이트: [https://www.spkorea.art/](https://www.spkorea.art/)

---

## 📌 프로젝트 개요

- React 기반 프론트엔드 설계 및 구현
- AWS S3 + CloudFront를 통한 정적 웹사이트 배포
- Presigned URL 방식 적용으로 보안 강화된 파일 업로드 기능 개발
- Github Actions 기반 CI/CD 자동화로 무중단 배포 시스템 구축
  
- Spring Boot 기반 RESTful API 서버 설계 및 구현
- AWS EC2 + Nginx + HTTPS 환경으로 보안 강화된 서버 배포
- JWT 인증 및 Spring Security 기반 사용자 인증 시스템 구축
- Hibernate + MySQL 기반 DB 설계 및 AWS RDS 연동
- Spring Booot Starter Mail 기반 이메일 발송 기능 개발
- CORS 및 HTTPS 환경 문제 해결로 서비스 안전성 확보

---

## 🛠️ 기술 스택

#### - FRONTEND
![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)  
![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)  
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)  
![CSS](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)  
![React Context](https://img.shields.io/badge/React_Context-%23007ACC.svg?style=for-the-badge&logo=react&logoColor=white)  
![JWT](https://img.shields.io/badge/JWT-000000.svg?style=for-the-badge&logo=jwt&logoColor=white)  

#### - BACKEND  
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F.svg?style=for-the-badge&logo=springboot&logoColor=white)  
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F.svg?style=for-the-badge&logo=springsecurity&logoColor=white)  
![JWT](https://img.shields.io/badge/JWT-000000.svg?style=for-the-badge&logo=jwt&logoColor=white)  

#### - INFRA
![AWS S3](https://img.shields.io/badge/AWS%20S3-569A31.svg?style=for-the-badge&logo=amazonaws&logoColor=white)  
![CloudFront](https://img.shields.io/badge/CloudFront-232F3E.svg?style=for-the-badge&logo=amazonaws&logoColor=white)  
![AWS EC2](https://img.shields.io/badge/AWS_EC2-FF9900.svg?style=for-the-badge&logo=amazonaws&logoColor=white)  
![Route 53](https://img.shields.io/badge/Route%2053-232F3E.svg?style=for-the-badge&logo=amazonaws&logoColor=white)  
![Nginx](https://img.shields.io/badge/Nginx-009639.svg?style=for-the-badge&logo=nginx&logoColor=white)  
![HTTPS](https://img.shields.io/badge/HTTPS-007ACC.svg?style=for-the-badge)  
![Maven](https://img.shields.io/badge/Maven-C71A36.svg?style=for-the-badge&logo=apachemaven&logoColor=white)   
![Presigned URL](https://img.shields.io/badge/Presigned%20URL-0A0A0A.svg?style=for-the-badge&logo=aws)  
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF.svg?style=for-the-badge&logo=githubactions&logoColor=white)  

#### - ETC
![GitHub](https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=github&logoColor=white)  
![MySQL](https://img.shields.io/badge/MySQL-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)  

---

## 🚀 주요 기능

- 회원가입 및 로그인 기능 (JWT 기반 인증 연동)
- 관리자 페이지
  - 포트폴리오 등록 / 수정 / 삭제
- 일반 사용자용 포트폴리오 열람
- Contact Form을 통한 문의 전송
- AWS S3 Presigned URL을 이용한 이미지 업로드

---

## 📂 폴더 구조


```
📦 SPKorea_Front-end
┣ 📜 package-lock.json
┣ 📜 package.json
┣ 📂 public
┃ ┣ 📜 favicon.ico
┃ ┣ 📜 index.html
┃ ┣ 📜 manifest.json
┃ ┗ 📜 robots.txt
┗ 📂 src
  ┣ 📜 App.jsx
  ┣ 📂 assets
  ┃ ┣ 📂 img
  ┃ ┃ ┗ 📜 Logo_Default.png
  ┃ ┗ 📂 videos
  ┃   ┗ 📜 introGif.gif
  ┣ 📂 components
  ┃ ┣ 📜 ContactForm.jsx
  ┃ ┣ 📜 CursorFollwer.jsx
  ┃ ┣ 📜 Footer.css
  ┃ ┣ 📜 Footer.jsx
  ┃ ┣ 📜 Header.css
  ┃ ┣ 📜 Header.jsx
  ┃ ┣ 📜 ImageUploader.jsx
  ┃ ┣ 📜 Logo.jsx
  ┃ ┣ 📜 ScrollToTop.jsx
  ┃ ┗ 📜 VideoUploader.jsx
  ┣ 📂 contexts
  ┃ ┗ 📜 AuthContext.jsx
  ┣ 📜 index.js
  ┣ 📂 pages
  ┃ ┣ 📜 About.css
  ┃ ┣ 📜 About.jsx
  ┃ ┣ 📂 admin
  ┃ ┃ ┣ 📜 WorkAdd.css
  ┃ ┃ ┣ 📜 WorkAdd.jsx
  ┃ ┃ ┣ 📜 WorkEdit.css
  ┃ ┃ ┗ 📜 WorkEdit.jsx
  ┃ ┣ 📜 Home.css
  ┃ ┣ 📜 Home.jsx
  ┃ ┣ 📂 user
  ┃ ┃ ┣ 📜 Login.css
  ┃ ┃ ┣ 📜 Login.jsx
  ┃ ┃ ┣ 📜 SignUp.css
  ┃ ┃ ┗ 📜 SignUp.jsx
  ┃ ┗ 📂 work
  ┃   ┣ 📜 WorkDetail.css
  ┃   ┣ 📜 WorkDetail.jsx
  ┃   ┣ 📜 WorkList.css
  ┃   ┗ 📜 WorkList.jsx
  ┗ 📂 utils
    ┣ 📜 authUtils.jsx
    ┗ 📜 s3Uploader.jsx
```
```
📦 SPKorea_Back-end
  📂src
   ┣ 📂main
   ┃ ┣ 📂java
   ┃ ┃ ┗ 📂com
   ┃ ┃ ┃ ┗ 📂spkorea
   ┃ ┃ ┃ ┃ ┣ 📂config
   ┃ ┃ ┃ ┃ ┃ ┣ 📜AwsS3Config.java
   ┃ ┃ ┃ ┃ ┃ ┣ 📜JwtAuthenticationFilter.java
   ┃ ┃ ┃ ┃ ┃ ┣ 📜JwtUtil.java
   ┃ ┃ ┃ ┃ ┃ ┣ 📜SecurityConfig.java
   ┃ ┃ ┃ ┃ ┃ ┗ 📜WebConfig.java
   ┃ ┃ ┃ ┃ ┣ 📂controller
   ┃ ┃ ┃ ┃ ┃ ┣ 📜AuthController.java
   ┃ ┃ ┃ ┃ ┃ ┣ 📜CategoryController.java
   ┃ ┃ ┃ ┃ ┃ ┣ 📜ContactController.java
   ┃ ┃ ┃ ┃ ┃ ┣ 📜S3Controller.java
   ┃ ┃ ┃ ┃ ┃ ┗ 📜WorkController.java
   ┃ ┃ ┃ ┃ ┣ 📂dto
   ┃ ┃ ┃ ┃ ┃ ┣ 📜LoginRequestDto.java
   ┃ ┃ ┃ ┃ ┃ ┣ 📜LoginResponseDto.java
   ┃ ┃ ┃ ┃ ┃ ┣ 📜MainThumbnailDto.java
   ┃ ┃ ┃ ┃ ┃ ┣ 📜NewThumbnailDto.java
   ┃ ┃ ┃ ┃ ┃ ┣ 📜SignupRequestDto.java
   ┃ ┃ ┃ ┃ ┃ ┣ 📜WorkRequestDto.java
   ┃ ┃ ┃ ┃ ┃ ┗ 📜WorkResponseDto.java
   ┃ ┃ ┃ ┃ ┣ 📂entity
   ┃ ┃ ┃ ┃ ┃ ┣ 📜Category.java
   ┃ ┃ ┃ ┃ ┃ ┣ 📜ContactMessage.java
   ┃ ┃ ┃ ┃ ┃ ┣ 📜User.java
   ┃ ┃ ┃ ┃ ┃ ┣ 📜Work.java
   ┃ ┃ ┃ ┃ ┃ ┗ 📜WorkImage.java
   ┃ ┃ ┃ ┃ ┣ 📂repository
   ┃ ┃ ┃ ┃ ┃ ┣ 📜CategoryRepository.java
   ┃ ┃ ┃ ┃ ┃ ┣ 📜ContactMessageRepository.java
   ┃ ┃ ┃ ┃ ┃ ┣ 📜UserRepository.java
   ┃ ┃ ┃ ┃ ┃ ┣ 📜WorkImageRepository.java
   ┃ ┃ ┃ ┃ ┃ ┗ 📜WorkRepository.java
   ┃ ┃ ┃ ┃ ┣ 📂service
   ┃ ┃ ┃ ┃ ┃ ┣ 📜AuthService.java
   ┃ ┃ ┃ ┃ ┃ ┣ 📜CategoryService.java
   ┃ ┃ ┃ ┃ ┃ ┣ 📜ContactService.java
   ┃ ┃ ┃ ┃ ┃ ┣ 📜S3Service.java
   ┃ ┃ ┃ ┃ ┃ ┣ 📜UserService.java
   ┃ ┃ ┃ ┃ ┃ ┗ 📜WorkService.java
   ┃ ┃ ┃ ┃ ┗ 📜SpKoreaBackEndApplication.java
   ┃ ┗ 📂resources
   ┃ ┃ ┣ 📂META-INF
   ┃ ┃ ┃ ┗ 📜additional-spring-configuration-metadata.json
   ┃ ┃ ┣ 📂static
   ┃ ┃ ┣ 📂templates
   ┃ ┃ ┗ 📜application.properties
```

</details>
