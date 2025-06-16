![Logo_Default](https://github.com/user-attachments/assets/bb8e62db-cd8f-4eec-b1f3-c39ea534af51)
# SP KOREA  
### 🚀 실 서비스 운영 중인 스타트업 공식 홈페이지  
🔗 [www.spkorea.art](https://www.spkorea.art)  
> 👉 직접 확인해보세요! (React + Spring Boot + AWS 인프라 기반)

---

## 📌 프로젝트 개요

**React + Spring Boot 기반으로 개발한 스타트업 공식 홈페이지입니다.**  
S3 Presigned URL 이미지 업로드, JWT 인증 시스템, CI/CD 자동화 등  
**보안성과 운영 효율성을 고려한 실무 수준의 인프라와 서비스를 직접 설계·구현했습니다.**

### 🧩 주요 구현 기술

#### 🟦 프론트엔드 (React)
- ⚛️ React SPA 아키텍처 및 Context 기반 상태 관리
- ☁️ AWS S3 + CloudFront 기반 정적 웹사이트 배포
- 🔐 사용자 직접 업로드 방식(Presigned URL)으로 성능 개선 및 보안 강화
- ⚙️ GitHub Actions 기반 CI/CD 자동화
- 🌐 CORS, HTTPS 대응으로 안정적인 API 통신 구현

#### 🟥 백엔드 (Spring Boot)
- 🖥️ RESTful API 서버 설계 (Spring Boot + Spring Security)
- 🔑 JWT 토큰 기반 인증 흐름 및 Spring Security Role 인가 처리
- 🗄️ Hibernate + MySQL → AWS RDS 연동으로 DB 구성
- 🔒 EC2 + Nginx + HTTPS 환경에 수동 배포
- 📧 Spring Mail 기반 이메일 발송 기능

#### 🔒 보안 설계 포인트
- JWT 토큰의 만료·재발급 정책 및 Spring Security 기반 Role 인가 관리
- HTTP to HTTPS 강제 리디렉션 및 SSL 인증서 적용
- `.env` 등 환경변수 분리로 민감 정보 GitHub 노출 방지
- S3에 직접 접근 차단 → CloudFront OAC 기반 경로 통제
- EC2는 보안 그룹 설정으로 특정 IP만 SSH 접근 허용

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
![MySQL](https://img.shields.io/badge/RDS(MySQL)-00758F?style=for-the-badge&logo=mysql&logoColor=white)
![Route 53](https://img.shields.io/badge/Route_53-4053A0?style=for-the-badge&logo=amazonaws&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![HTTPS](https://img.shields.io/badge/HTTPS-005C9C?style=for-the-badge&logo=letsencrypt&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)  

#### - ETC  
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Presigned URL](https://img.shields.io/badge/Presigned_URL-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white)
![email(spring mail)](https://img.shields.io/badge/Email(spring_mail)-3178C6?style=for-the-badge&logo=amazonaws&logoColor=white)

---

## 🎯 주요 기능

#### 👤 사용자
- 포트폴리오 목록 / 상세 열람
- 문의(이메일 전송) 폼

#### 🔐 관리자
- 회원가입 / 로그인 (JWT 인증)
- 포트폴리오 등록, 수정, 삭제
- 이미지 업로드 (S3 Presigned URL)

---

## ⚙️ 아키텍처 및 배포 구조

- **Frontend**
  - React 기반 정적 SPA → AWS S3 + CloudFront로 배포
  - GitHub Actions를 통한 CI/CD 자동화 (S3 업로드 및 CloudFront 캐시 무효화)
  
- **Backend**
  - Spring Boot 애플리케이션 → EC2 + Nginx에서 호스팅
  - 수동 배포 방식 (JAR 파일 `scp` 전송 후 `nohup`으로 실행)
  
- **기타**
  - 데이터베이스: AWS RDS (MySQL)
  - 도메인 및 SSL: Route53 + 가비아 도메인 연동, AWS ACM으로 HTTPS 인증서 관리

---

## 📄 상세 문서  

<details>
  <summary>AWS 아키텍처</summary>
    <img src="https://github.com/user-attachments/assets/e033bc7a-700f-4439-9dc7-1c6099ce5ea2" />
</details>

<details>
  <summary>CI/CD 파이프라인</summary>
    <img src="https://github.com/user-attachments/assets/64da268a-9d71-4800-8077-514bd2f1475d" />
</details>
  
<details>
  <summary>API 명세서</summary>
    <img src="https://github.com/user-attachments/assets/ec61fc21-a0b8-493e-b97a-9744adb73744" alt="API 명세서" />
  
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
</details>

<details>
  <summary>ERD 다이어그램</summary>
    <img src="https://github.com/user-attachments/assets/83a62dcb-8239-4480-a7ef-4baea021afa9" />
</details>

---

## ⚠️ 주요 오류 해결 기록

<details>
<summary>클라우드 인프라 아키텍처 - 404 오류 및 API 라우팅 문제</summary>

### 🚨 문제상황
- 배포 후 전체 서비스에서 404 오류 발생  
- API 요청이 의도와 다르게 S3 정적 리소스로 라우팅됨

### 🔥 기술적 분석
- CloudFront + EC2 + S3 하이브리드 아키텍처에서 요청 분산 로직 부재  
- API 엔드포인트(`/api/**`)와 정적 리소스 간 명확한 라우팅 규칙 필요

### 🌀 해결방안
- CloudFront Behaviors 설정  
  - `/api/**` → EC2 Spring Boot 서버 (Origin)  
  - `/*` (기본) → S3 정적 리소스 (Origin)  
- Origin Protocol Policy 최적화

</details>

<details>
<summary>클라우드 인프라 아키텍처 - 백엔드 API 호출 403 Forbidden 오류</summary>

### 🚨 문제상황
- 프론트엔드는 정상 작동하나 백엔드 API 호출 시 403 Forbidden 오류 발생

### 🔥 기술적 분석
- CloudFront Origin 설정이 HTTPS Only로 구성됨  
- EC2 서버는 HTTP(포트 8080)만 리스닝하여 프로토콜 불일치 발생

### 🌀 해결방안
- Origin Protocol Policy를 HTTP Only로 변경하여 프로토콜 불일치 해결

</details>

<details>
<summary>AWS 보안 아키텍처 개선 - presignedURL 보안 강화 및 이미지 로딩 문제</summary>

### 🚨 문제상황
- 클라이언트 측에 AWS Access Key 하드코딩으로 보안 위험 노출  
- presignedURL 도입 후 기존 이미지 URL 경로 이슈 발생 (이미지 로딩 실패)

### 🔥 기술적 분석
- 초기 개발 시 프론트엔드에서 직접 S3 업로드 (보안 취약점)  
- presignedURL 도입 후 상대경로 저장으로 인해 이미지가 정상 노출되지 않음

### 🌀 해결방안
- presignedURL 방식 도입으로 보안 강화  
- CloudFront 캐시 무효화 수행하여 URL 정합성 확보  
- 절대경로 및 상대경로 문제 해결하여 이미지 서빙 안정화

</details>

<details>
<summary>SPA 최적화 - React Router 새로고침 404 오류</summary>

### 🚨 문제상황
- React Router를 사용하는 SPA에서 새로고침 또는 직접 URL 접근 시 404 오류 발생

### 🔥 기술적 분석
- S3 + CloudFront 환경에서 SPA 라우팅 처리 로직 부재  
- 서버가 해당 경로에 실제 파일이 없다고 판단하여 404 오류 반환

### 🌀 해결방안
- CloudFront Error Pages 설정:  
  - 403, 404 오류 발생 시 `/index.html`로 리다이렉트  
  - 응답 코드(Response Code)를 200으로 변경하여 SPA 라우팅 지원

</details>


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
```
</details>

## 📄 추가 예정 문서 및 자료
- 개발 일지 (주요 오류 및 해결 과정 기록)
- 운영중인 서비스 스크린샷과 설명
- 핵심 기능별 기술 스택 및 구조 설명(예: Presigned URL 구조, JWT 인증 흐름도 등)
