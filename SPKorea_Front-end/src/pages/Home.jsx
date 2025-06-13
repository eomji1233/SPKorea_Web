import introGif from '../assets/videos/introGif.gif';
import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useNavigate } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import { useEffect, useState } from 'react';
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { useInView } from 'react-intersection-observer';

function Home() {
    const [thumbnails, setThumbnails] = useState([]);
    const [newWorks, setNewWorks] = useState([]);
    const navigate = useNavigate();
    const { scrollYProgress } = useViewportScroll();
    const yOurCom = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const ySlogan = useTransform(scrollYProgress, [0, 1], [0, 350]);
    const yBtn = useTransform(scrollYProgress, [0, 1], [0, 400]);

    useEffect(() => {
        fetch("https://spkorea.art/api/work/thumbnails")
            .then(res => res.json())
            .then(data => setThumbnails(data))
            .catch(err => console.error("카테고리 불러오기 실패:", err));
    }, []);

    useEffect(() => {
        fetch("https://spkorea.art/api/work/new")
            .then(res => res.json())
            .then(data => setNewWorks(data))
            .catch(err => console.error("최신순 불러오기 실패:", err));
    }, []);

    const settings1 = {
        dots: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        pauseOnFocus: true,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "ease-in-out",
    };
    const settings2 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const [refSlogan, inViewSlogan] = useInView({ triggerOnce: true, threshold: 0.3 });
    const [refProjects, inViewProjects] = useInView({ triggerOnce: true, threshold: 0.3 });
    const [refWorks, inViewWorks] = useInView({ triggerOnce: true, threshold: 0.3 });
    
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

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut" },
        },
    };

    return (
        <div>
            <div className="main-container">
                <div className="carousel-wrapper1">
                    <Slider {...settings1}>
                        <video
                            src="https://spkorea-portfolio-storage.s3.ap-northeast-2.amazonaws.com/videos/%ED%8C%8C%EB%8F%84.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="hero-video"
                        />
                        <div className='img-wrapper'>
                            <img src={introGif} alt='introGif' className='introGif' />
                            <button
                                className='start-btn'
                                onClick={() => alert('게임 시작')}
                            >
                                START GAME
                            </button>
                        </div>
                    </Slider>
                </div>
            </div>

            <div className="slogan-container">
                <img src={require("../assets/img/14.jpg")} alt="bg" className="bg-image" />

                <motion.p
                    ref={refSlogan}
                    className="ourCom"
                    initial="hidden"
                    animate={inViewSlogan ? "visible" : "hidden"}
                    variants={slideDown}
                >
                    OUR COMPANY
                </motion.p>

                <motion.p
                    className="slogan"
                    initial="hidden"
                    animate={inViewSlogan ? "visible" : "hidden"}
                    variants={slideDown}
                    transition={{ duration: 1.7, ease: "easeOut", delay: 0.3 }}
                >
                    SPKOREA opens up new possibilities and creates the best content with technology
                    that has never existed in the world.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={inViewSlogan ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                    transition={{ duration: 1.9, ease: "easeOut", delay: 0.6 }}
                >
                    <Link to="/about" className="btn-link">
                        ABOUT US
                    </Link>
                </motion.div>
            </div>

            <motion.div
                ref={refProjects}
                className="project-container"
                initial="hidden"
                animate={inViewProjects ? "visible" : "hidden"}
                variants={fadeUp}
            >
                <p className="slogan">PROJECTS</p>
                <div>
                    <div className="slider-wrapper">
                        <Slider {...settings2}>
                            {thumbnails.map((thumb, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <img
                                        src={`https://spkorea-portfolio-storage.s3.ap-northeast-2.amazonaws.com/${thumb.thumbnailUrl}`}
                                        alt={`slide${index + 1}`}
                                        onClick={() => navigate(`/work/${thumb.workId}`)}
                                        className="project-img"
                                    />
                                </motion.div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </motion.div>

            <motion.div
                ref={refWorks}
                className="work-container"
                initial="hidden"
                animate={inViewWorks ? "visible" : "hidden"}
                variants={fadeUp}
            >
                <p className="slogan">WORKS</p>
                <div className='works-frame'>
                    {newWorks.map((work, index) => (
                        <motion.div
                            key={index}
                            className={(index === 1 || index === 4) ? 'shift-down' : ''}
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.1, type: "spring", stiffness: 200 }}
                        >
                            <img
                                src={`https://spkorea-portfolio-storage.s3.ap-northeast-2.amazonaws.com/${work.thumbnailUrl}`}
                                alt="slide1"
                                onClick={() => navigate(`/work/${work.workId}`)}
                                className="work-img"
                            />
                            <p className='subtitle'>{work.type}</p>
                            <p className='workTitle'>{work.title}</p>
                        </motion.div>
                    ))}
                </div>

                <Link to="/work" className="btn-link">
                    ALL WORK
                </Link>
            </motion.div>

            <ContactForm />
        </div>
    );
}

export default Home;
