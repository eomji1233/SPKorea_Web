import './About.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from "../assets/img/Marketing.png";
import img2 from "../assets/img/con2.png";
import img3 from "../assets/img/con3.png";
import img4 from "../assets/img/con4.png";
import img5 from "../assets/img/CONTENT03.png";
import img6 from "../assets/img/MICE_02.png";
import img7 from "../assets/img/Mice22.png";
import { motion } from "framer-motion";

function About() {
    const settings = {
        infinite: true,
        speed: 8000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        arrows: false,
        pauseOnHover: false,
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut" },
        },
    };

    const slideDown = {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <div>
            <motion.div
                className="about-container"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
            >
                <div>ABOUT US</div>
                <p>SPKOREA meets the market fit using<br />
                    cutting-edge media technology.</p>
            </motion.div>

            <div className="bg-container">
                <img src={require('../assets/img/Black Data Flow (2).jpg')} alt="bg" className="bg-img" />

                <motion.p
                    initial="hidden"
                    animate="visible"
                    variants={slideDown}
                >
                    ' 국내 최초 언리얼엔진기반 AR카메라 시스템 개발'
                </motion.p>

                <motion.p
                    initial="hidden"
                    animate="visible"
                    variants={slideDown}
                >
                    ' 국내 최초 이동식 가상 스튜디오 개발 및 생중계 송출 '
                </motion.p>

                <motion.p
                    initial="hidden"
                    animate="visible"
                    variants={slideDown}
                >
                    ' 메타버스 연동 코더 시스템 개발 '
                </motion.p>
            </div>

            <div className='com-container'>
                <motion.p
                    className='p1'
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                >
                    (주)에스피코리아는<br />혁신적인 기술을 개발하고,<br />다양한 콘텐츠에 적용하여 실증합니다.
                </motion.p>
                <motion.p
                    className='p2'
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                >
                    기존에 없던 새로운 기술을 연구·개발하며, 이를 실질적인 비즈니스와 산업에 접목하여 가치를 창출합니다. 기술과 콘텐츠의 융합을 통해 시장을 선도하고, 독창적인 솔루션으로 고객과 파트너에게 최상의 경험을 제공합니다.
                </motion.p>

                <div className="slider-wrapper">
                    <Slider {...settings}>
                        <div><img src={img1} alt="slide1" /></div>
                        <div><img src={img2} alt="slide2" /></div>
                        <div><img src={img3} alt="slide3" /></div>
                        <div><img src={img4} alt="slide4" /></div>
                        <div><img src={img5} alt="slide5" /></div>
                        <div><img src={img6} alt="slide6" /></div>
                        <div><img src={img7} alt="slide7" /></div>
                    </Slider>
                </div>
                <motion.p
                    className='p1'
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    transition={{ duration: 1, ease: "easeOut", delay: 0 }}
                >
                    경계를 허물고 가능성을 확장하는 기업
                </motion.p>
                <motion.p
                    className='p2'
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                >
                    한 분야에 국한되지 않고 다양한 산업에서 활발히 활동하며 혁신을 만들어가고 있습니다. 각 분야에 적합한 맞춤형 솔루션을 제공하여 고객에게 최상의 경험과 가치를 선사합니다. 또한, 다양한 프로젝트를 통해 축적한 노하우와 전문성을 바탕으로 차별화된 전략과 창의적인 아이디어를 적용하여 최고의 결과물을 만들어냅니다. 우리는 끊임없이 새로운 도전에 나서며, 빠르게 변화하는 시장 환경 속에서도 앞서 나가기 위해 지속적으로 노력하고 있습니다.
                </motion.p>
            </div>

            <motion.div
                className="honors-section"
                initial="hidden"
                whileInView="visible" 
                viewport={{ once: true, amount: 0.1 }} 
                variants={fadeUp}
            >
                <div className="cards">
                    <motion.div className="card" variants={fadeUp}>
                        <h3>수상 이력</h3>
                        <ul>
                            <li><span>2018.11</span> 부산창조경제혁신센터 청년 혁신가 인큐베이팅 <em>‘금상’</em></li>
                            <li><span>2019.11</span> MBC 기억록 참여 차세대 미디어 대전<em> ‘대상’</em></li>
                            <li><span>2021.03</span> 중소벤처기업부 재도전 성공 패키지<em> ‘최우수<br /> 졸업’</em></li>
                            <li><span>2022.11</span> 부산시 해운대 구청장 <em> ‘해운대구청장상’</em></li>
                            <li><span>2022.12</span> 대교 플레이벤츄라 케이블 TV방송<em> ‘대상’</em></li>
                            <li><span>2023.11</span> 문화체육관광부 스포츠사회적기업센터 오픈 IR <em> ‘우수상’</em></li>
                            <li><span>2024.11</span> 문화체육관광부 스포츠통합데모데이 <em>3위</em></li>
                        </ul>
                    </motion.div>

                    <motion.div className="card" variants={fadeUp}>
                        <h3>특허</h3>
                        <ul>
                            <li>메타버스 기반 피트니스 플랫폼 시스템</li>
                            <li>개인건강기록 기반 운동영상 컴퓨팅 방법</li>
                            <li>모션캡쳐 및 트래킹 시스템</li>
                            <li>메타버스 생중계 시스템</li>
                            <li>운동 처방 알고리즘 및 장치</li>
                            <li>비디오 제공 전자장치 및 방법</li>
                            <li>문자/모션 인식 기반 영상 제공 장치</li>
                        </ul>
                    </motion.div>

                    <motion.div className="card" variants={fadeUp}>
                        <h3>상표 · 논문</h3>
                        <ul>
                            <li><strong>상표</strong> – WHOLENESS LAB</li>
                            <li>Comparison of Physical Activity Level among Childhood Cancer Survivors in Korea</li>
                            <li>The Relationship between Occupational Status and Physical Activity in Korea</li>
                            <li>Effect of dietary patterns on the blood/urine comcentration of the selected toxic metals(Cd, Hg, Pb) in Korean children</li>
                        </ul>
                    </motion.div>
                </div>
            </motion.div>


        </div>
    )
};

export default About