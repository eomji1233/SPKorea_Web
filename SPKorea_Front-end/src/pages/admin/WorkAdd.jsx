import { useEffect, useState, useRef } from "react";
import "./WorkAdd.css";
import ImageUploader from "../../components/ImageUploader";
import VideoUploader from "../../components/VideoUploader";
import { useNavigate } from "react-router-dom";
import { uploadToS3 } from "../../utils/s3Uploader";

const WorkAdd = () => {
    const nav = useNavigate();
    const [title, setTitle] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [category, setCategory] = useState("");
    const [customCategory, setCustomCategory] = useState("");
    const [showCustomCategoryInput, setShowCustomCategoryInput] = useState(false);
    const [type, setType] = useState("");
    const [year, setYear] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [images, setImages] = useState([]);
    const [video, setVideo] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const titleRef = useRef(null);
    const categoryRef = useRef(null);
    const customCategoryRef = useRef(null);
    const typeRef = useRef(null);
    const yearRef = useRef(null);
    const descriptionRef = useRef(null);
    const imageRef = useRef(null);

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = "제목을 입력하세요.";

        if (!category.trim() && !customCategory.trim()) {
            newErrors.category = "카테고리를 선택하거나 새로 입력하세요.";
        } else if (showCustomCategoryInput && !customCategory.trim()) {
            newErrors.customCategory = "새 카테고리 이름을 입력하세요.";
        }

        if (!type.trim()) newErrors.type = "타입을 입력하세요.";
        if (!year.trim()) newErrors.year = "연도를 입력하세요.";
        if (!description.trim()) newErrors.description = "설명을 입력하세요.";
        if (images.length === 0) newErrors.images = "썸네일 이미지 최소 1장은 필수입니다.";

        return newErrors;
    };

    const focusFirstError = (errors) => {
        const errorFields = [
            { key: 'title', ref: titleRef },
            { key: 'category', ref: categoryRef },
            { key: 'customCategory', ref: customCategoryRef },
            { key: 'type', ref: typeRef },
            { key: 'year', ref: yearRef },
            { key: 'description', ref: descriptionRef }
        ];

        for (const field of errorFields) {
            if (errors[field.key] && field.ref.current) {
                field.ref.current.focus();
                field.ref.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                return;
            }
        }

        if (errors.images && imageRef.current) {
            imageRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    };

    useEffect(() => {
        fetch("https://spkorea.art/api/category")
            .then((res) => res.json())
            .then((data) => setCategoryList(data))
            .catch((err) => console.error("카테고리 불러오기 실패:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            focusFirstError(validationErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        const confirmed = window.confirm("이대로 등록하시겠습니까?");
        if (!confirmed) return;

        try {
            const imageUploadPromises = images.map(img => uploadToS3(img, "images/"));
            const uploadedImageUrls = await Promise.all(imageUploadPromises);

            let videoUrl = null;
            if (video) {
                videoUrl = await uploadToS3(video, "videos/");
            }

            const jsonData = {
                title,
                category: customCategory || category,
                type,
                year,
                description,
                link,
                thumbnailUrl: uploadedImageUrls[0],
                images: uploadedImageUrls,
                videoUrl
            };
            const token = localStorage.getItem('token');
            const response = await fetch("https://spkorea.art/api/work", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(jsonData)
            });

            if (!response.ok) throw new Error(await response.text());

            alert("성공적으로 등록되었습니다.");
            nav("/work");
        } catch (error) {
            alert("등록 실패: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field, value, setter) => {
        setter(value);
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <div className="admin-wrapper">
            <div className="admin-container">
                <h1 className="admin-title">ADD WORKS</h1>
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-group">
                        <input
                            ref={titleRef}
                            className={`form-input ${errors.title ? "error" : ""}`}
                            type="text"
                            placeholder="제목 *"
                            value={title}
                            onChange={(e) => handleInputChange('title', e.target.value, setTitle)}
                        />
                        {errors.title && <p className="error-text">{errors.title}</p>}
                    </div>

                    <div className="form-group">

                        <select
                            ref={categoryRef}
                            className={`form-input ${errors.category ? "error" : ""}`}
                            value={category}
                            onChange={(e) => {
                                const value = e.target.value;
                                handleInputChange('category', value, setCategory);
                                setShowCustomCategoryInput(value === "ADD_NEW");
                                if (value !== "ADD_NEW") {
                                    setCustomCategory("");
                                    if (errors.customCategory) {
                                        setErrors(prev => ({ ...prev, customCategory: '' }));
                                    }
                                }
                            }}
                        >
                            <option value="" disabled hidden>카테고리 선택 *</option>
                            {categoryList.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                            <option value="ADD_NEW">+ 새 카테고리 추가</option>
                        </select>
                        {errors.category && <p className="error-text">{errors.category}</p>}
                    </div>

                    {showCustomCategoryInput && (
                        <div className="form-group">
                            <input
                                ref={customCategoryRef}
                                className={`form-input ${errors.customCategory ? "error" : ""}`}
                                type="text"
                                placeholder="새 카테고리 이름 *"
                                value={customCategory}
                                onChange={(e) => handleInputChange
                                    ('customCategory', e.target.value, setCustomCategory)}
                            />
                            {errors.customCategory && <p className="error-text">{errors.customCategory}</p>}
                        </div>
                    )}

                    <div className="form-group">
                        <input
                            ref={typeRef}
                            className={`form-input ${errors.type ? "error" : ""}`}
                            type="text"
                            placeholder="타입 (예: 애니메이션) *"
                            value={type}
                            onChange={(e) => handleInputChange('type', e.target.value, setType)}
                        />
                        {errors.type && <p className="error-text">{errors.type}</p>}
                    </div>

                    <div className="form-group">
                        <input
                            ref={yearRef}
                            className={`form-input ${errors.year ? "error" : ""}`}
                            type="number"
                            placeholder="연도 *"
                            value={year}
                            onChange={(e) => handleInputChange('year', e.target.value, setYear)}
                        />
                        {errors.year && <p className="error-text">{errors.year}</p>}
                    </div>

                    <div className="form-group">
                        <textarea
                            ref={descriptionRef}
                            className={`form-input ${errors.description ? "error" : ""}`}
                            placeholder="설명 *"
                            value={description}
                            onChange={(e) => handleInputChange('description', e.target.value, setDescription)}
                        />
                        {errors.description && <p className="error-text">{errors.description}</p>}
                    </div>

                    <div className="form-group">
                        <input
                            className="form-input"
                            type="text"
                            placeholder="유튜브 링크"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </div>

                    <div className="form-group" ref={imageRef}>
                        <label className="form-label">이미지 업로드 (여러 장 선택 가능) *</label>
                        <div className={`upload-container ${errors.images ? "error" : ""}`}>
                            <ImageUploader
                                onImagesChange={(imgs) => {
                                    setImages(imgs);
                                    if (errors.images && imgs.length > 0) {
                                        setErrors(prev => ({ ...prev, images: '' }));
                                    }
                                }}
                                thumbnailIndex={0}
                            />
                        </div>
                        {errors.images && <p className="error-text">{errors.images}</p>}
                        {images.length === 0 && !errors.images && (
                            <p className="info-text">※ 썸네일 이미지는 최소 1장 필수입니다.</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">영상 업로드</label>
                        <VideoUploader onVideoChange={(file) => setVideo(file)} />
                    </div>

                    <button
                        type="submit"
                        className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner"></span>
                                업로드 중...
                            </>
                        ) : (
                            '등록'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WorkAdd;