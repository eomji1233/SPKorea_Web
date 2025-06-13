import { useEffect, useState } from "react";
import './WorkList.css';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";

function WorkList() {
    const [categoryList, setCategoryList] = useState(["ALL"]); const [active, setActive] = useState("ALL");
    const [work, setWork] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://spkorea.art/api/category")
            .then((res) => {
                if (!res.ok) throw new Error("카테고리 응답 오류");
                return res.json();
            })
            .then((data) => {
                setCategoryList(["ALL", ...data]);
            })
            .catch((err) => {
                console.error("카테고리 불러오기 실패:", err);
            });
    }, []);

    useEffect(() => {
        fetch("https://spkorea.art/api/work")
            .then(res => {
                if (!res.ok) throw new Error("서버 응답 오류");
                return res.json();
            })
            .then(data => {
                setWork(data);
            })
            .catch(err => {
                console.error("작업 데이터 불러오기 실패:", err);
            });
    }, []);

    const { user } = useAuth();

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
            <div>

                <motion.div
                    className="about-container"
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                >
                    <div>WORKS</div>
                    <p>We does contents including marketing,<br />
                        media technology, game, and so on.</p>
                </motion.div>

            </div>
            {user?.roles.includes('ROLE_ADMIN') && (
                <div className="add-btn-wrapper">
                    <Link to="/admin/work/add" className="add-btn">
                        ADD WORKS
                    </Link>
                </div>
            )}
            <div className="list-container">
                <div className="category-bar">
                    {categoryList.map((cat) => (
                        <button
                            key={cat}
                            className={`category-btn ${active === cat ? "active" : ""}`}
                            onClick={() => setActive(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {work
                    .filter((work) =>
                        active === "ALL" ? true : work.category === active
                    )
                    .map((work) => {
                        const fullUrl = `https://spkorea-portfolio-storage.s3.ap-northeast-2.amazonaws.com/${work.thumbnailUrl}`;
                        return (
                            <motion.div
                                key={work.id}
                                className="list-box"
                                onClick={() => navigate(`/work/${work.id}`)}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={fadeUp}
                            >
                                <div className="img-box">
                                    <img src={fullUrl} alt={work.title} className="image" />
                                    <div className="title-overlay">{work.title}</div>
                                </div>
                                <div className="info-top">
                                    <span>{work.type}</span>
                                    <span>({work.year})</span>
                                </div>
                                <p className="title">{work.title}</p>
                                {user?.roles.includes('ROLE_ADMIN') && (
                                    <div className="action-btns">
                                        <button
                                            type="button"
                                            className="edit-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/admin/work/edit/${work.id}`);
                                            }}
                                        >
                                            MODIFY
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}

            </div>
        </div >
    );
};

export default WorkList;
