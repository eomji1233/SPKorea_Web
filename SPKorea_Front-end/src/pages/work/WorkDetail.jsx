import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "./WorkDetail.css";

function WorkDetail() {
    const { id } = useParams();
    const [work, setWork] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        fetch(`https://spkorea.art/api/work/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("데이터 로딩 실패");
                return res.json();
            })
            .then((data) => {
                setWork(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>오류: {error}</div>;
    if (!work) return <div>데이터 없음</div>;


    const uniqueImages = [...new Set(work.images || [])];
    const images = uniqueImages.length > 1 ? uniqueImages.slice(1) : [];
    const baseUrl = 'https://spkorea-portfolio-storage.s3.ap-northeast-2.amazonaws.com/'; 
    const fullUrl = `${baseUrl}${work.thumbnailUrl}`;


    const settings = {
        dots: true,
        arrows: false,
        infinite: images.length > 2,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
    };

    return (
        <div className="work-detail">
            <div
                className="hero-image"
                style={{ backgroundImage: `url(${fullUrl})` }}
            >
                <div className="hero-overlay">
                    <h1 className="hero-title">{work.title}</h1>
                    <p className="hero-category">{work.category}</p>
                </div>
            </div>

            <div className="work-content">
                <div className="meta-info">
                    <div className="meta-block">
                        <span className="meta-label">Type</span>
                        <span className="meta-value">{work.type}</span>
                    </div>
                    <div className="meta-block">
                        <span className="meta-label">Release</span>
                        <span className="meta-value">{work.year}</span>
                    </div>
                </div>

                <p className="description">{work.description}</p>

                {work.link?.trim() && (
                    <div className="youtube-wrapper">
                        <iframe
                            width="100%"
                            src={getYouTubeEmbedURL(work.link)}
                            title={work.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}

                {work.video?.trim() && (
                    <div className="video-wrapper">
                        <video width="100%" controls autoPlay muted playsInline>
                            <source
                                src={`https://spkorea-portfolio-storage.s3.ap-northeast-2.amazonaws.com/${work.video}`}
                                type="video/mp4"
                            />
                            브라우저가 video 태그를 지원하지 않습니다.
                        </video>
                    </div>
                )}

                {images.length > 0 && (
                    <div className="carousel-wrapper">
                        <Slider {...settings}>
                            {images.map((img) => (
                                <div key={img} onClick={() => setPreviewImage(img)}>
                                    <img
                                        src={`https://spkorea-portfolio-storage.s3.ap-northeast-2.amazonaws.com/${img}`}
                                        alt="img"
                                        className="carousel-image"
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                )}

                {previewImage && window.innerWidth > 768 && (
                    <div className="lightbox-overlay" onClick={() => setPreviewImage(null)}>
                        <img
                            src={`https://spkorea-portfolio-storage.s3.ap-northeast-2.amazonaws.com/${previewImage}`}
                            alt="Preview"
                            className="lightbox-image"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button className="lightbox-close" onClick={() => setPreviewImage(null)}>✕</button>
                    </div>
                )}

            </div>
        </div>
    );
}

function getYouTubeEmbedURL(url) {
    let videoId = "";
    if (url.includes("watch?v=")) {
        videoId = url.split("watch?v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("/shorts/")) {
        videoId = url.split("/shorts/")[1].split("?")[0];
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
}

export default WorkDetail;