![Logo_Default](https://github.com/user-attachments/assets/bb8e62db-cd8f-4eec-b1f3-c39ea534af51)
# SP KOREA


### 🚀 실제 서비스 배포 사이트  
### 🔗 [https://www.spkorea.art/](https://www.spkorea.art/)  
> **👉 클릭해서 바로 확인하세요!**

---

## 📌 프로젝트 개요

본 프로젝트는 제가 혼자 전 과정(기획, 설계, 개발, 배포)을 담당한 스타트업 공식 홈페이지입니다.  
React 프론트엔드와 Spring Boot 백엔드, AWS 인프라를 활용해 안정성과 보안을 고려한 완성도 높은 서비스를 구현했습니다.  
특히, Presigned URL 기반 보안 파일 업로드, JWT 인증 시스템, 그리고 GitHub Actions CI/CD 자동화 구축 등  
실무 환경에서 요구되는 다양한 기술들을 직접 설계하고 적용해 경험을 쌓았습니다.


- ⚛️ **React** 기반 프론트엔드 설계 및 구현  
- ☁️ **AWS S3 + CloudFront**를 이용한 정적 웹사이트 배포  
- 🔐 Presigned URL 방식 적용으로 **보안 강화된 파일 업로드 기능 개발**  
- ⚙️ **GitHub Actions** 기반 CI/CD 자동화로 무중단 배포 시스템 구축

- 🖥️ **Spring Boot** 기반 RESTful API 서버 설계 및 구현  
- 🔒 AWS EC2 + Nginx + HTTPS 환경에서 **보안 강화된 서버 배포**  
- 🔑 JWT 인증 및 Spring Security 기반 **사용자 인증 시스템 구축**  
- 🗄️ Hibernate + MySQL 기반 DB 설계 및 **AWS RDS 연동**  
- 📧 Spring Boot Starter Mail 기반 **이메일 발송 기능 개발**  
- 🌐 CORS 및 HTTPS 환경 문제 해결로 **서비스 안정성 확보**

---

## 🛠️ 기술 스택

#### - FRONTEND  
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Context](https://img.shields.io/badge/React_Context-3178C6?style=for-the-badge&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jwt&logoColor=white) 

#### - BACKEND  
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-4BAF4F?style=for-the-badge&logo=springsecurity&logoColor=white)

#### - INFRA  
![AWS S3](https://img.shields.io/badge/AWS_S3-569A31?style=for-the-badge&logo=amazonaws&logoColor=white)
![CloudFront](https://img.shields.io/badge/CloudFront-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white)
![EC2](https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white)
![Route 53](https://img.shields.io/badge/Route_53-4053A0?style=for-the-badge&logo=amazonaws&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![HTTPS](https://img.shields.io/badge/HTTPS-005C9C?style=for-the-badge&logo=letsencrypt&logoColor=white)
![Presigned URL](https://img.shields.io/badge/Presigned_URL-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)  

#### - ETC  
![MySQL](https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

---

## 🚀 주요 기능

- 회원가입 및 로그인 기능 (JWT 인증으로 보안 강화)
- 관리자 페이지 (포트폴리오 CRUD 및 이미지 업로드)
- 일반 사용자용 포트폴리오 열람
- Contact Form을 통한 문의 전송 (메일 발송 연동)
- AWS S3 Presigned URL 기반 이미지 업로드로 안전한 파일 처리

---

## 📂 폴더 구조
<details>
  <summary>접기/펼치기</summary>
  
```
📦 SPKorea_Front-end
  ┗ 📂 src
    ┣ 📜 App.jsx
    ┣ 📂 assets
    ┃ ┣ 📂 img
    ┃ ┗ 📂 videos
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
</details>
```

</details>

---

## 📄 API 명세서  
![image](https://github.com/user-attachments/assets/ec61fc21-a0b8-493e-b97a-9744adb73744)

| 메서드 | URL                | 설명                        | 요청 바디                | 응답 예                      | 인증 필요 여부 |
|:-------|:-------------------|:---------------------------|:------------------------|:-----------------------------|:--------------|
| GET    | /api/work          | 모든 작업(포트폴리오) 조회  | 없음                    | 작업 배열                   | 아니오        |
| POST   | /api/work          | 새 작업 생성               | WorkRequestDto          | 생성된 작업 객체            | 예            |
| GET    | /api/work/{id}     | 특정 작업 상세 조회        | 없음                    | WorkResponseDto             | 아니오        |
| PUT    | /api/work/{id}     | 특정 작업 수정             | WorkRequestDto          | 수정된 작업 객체            | 예            |
| DELETE | /api/work/{id}     | 특정 작업 삭제             | 없음                    | 성공 메시지                 | 예            |
| GET    | /api/work/thumbnails | 메인 썸네일 목록 조회     | 없음                    | MainThumbnailDto 배열       | 아니오        |
| GET    | /api/work/new      | 신규 썸네일 목록 조회       | 없음                    | NewThumbnailDto 배열        | 아니오        |
| POST   | /api/contact       | 문의 메시지 전송            | ContactMessage          | 성공 메시지                 | 아니오        |
| POST   | /api/auth/signup   | 회원가입                  | SignupRequestDto        | 성공 메시지                 | 아니오        |
| POST   | /api/auth/login    | 로그인                    | LoginRequestDto         | LoginResponseDto (토큰 포함)| 아니오        |
| GET    | /api/s3/presign    | S3 업로드 Presigned URL 발급| 쿼리파라미터: key, contentType | presigned URL 객체     | 예            |
| GET    | /api/category      | 카테고리 전체 조회          | 없음                    | 문자열 배열                 | 아니오        |

---

## 📄 ERD 다이어그램   
![image](https://github.com/user-attachments/assets/83a62dcb-8239-4480-a7ef-4baea021afa9)


---

## 📄 추가 예정 문서 및 자료

- API 명세서 (Swagger / Postman 등) 곧 추가 예정  
- 데이터베이스 ERD 및 관계도  
- AWS 아키텍처 다이어그램  
- GitHub Actions 기반 CI/CD 파이프라인 구성도  
- 개발 일지 (주요 오류 및 해결 과정 기록)
- 운영중인 서비스 스크린샷과 설명
- 핵심 기능별 기술 스택 및 구조 설명(예: Presigned URL 구조, JWT 인증 흐름도 등)
