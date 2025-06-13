import { useEffect, useRef, useState } from "react";
import "./WorkEdit.css";
import ImageUploader from "../../components/ImageUploader";
import VideoUploader from "../../components/VideoUploader";
import { useNavigate, useParams } from "react-router-dom";
import { uploadToS3 } from "../../utils/s3Uploader";

function WorkEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categoryList, setCategoryList] = useState([]);
    const [errors, setErrors] = useState({});
    const [showCustomCategoryInput, setShowCustomCategoryInput] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const categoryRef = useRef(null);
    const customCategoryRef = useRef(null);

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        customCategory: "",
        type: "",
        year: "",
        description: "",
        link: "",
        images: [],
        video: "",
        thumbnailUrl: ""
    });



    useEffect(() => {
        fetch(`https://spkorea.art/api/work/${id}`)
            .then(res => res.json())
            .then(data => {
                const imagesWithUrl = (data.images || []).map(img => {
                    return `https://spkorea-portfolio-storage.s3.ap-northeast-2.amazonaws.com/${img}`;
                });
                setFormData(prev => ({
                    ...prev,
                    ...data,
                    images: imagesWithUrl || [],
                    video: data.video || "",
                    category: data.category || "",
                }));
            })
            .catch(err => console.error("작업 불러오기 실패:", err));

        fetch("https://spkorea.art/api/category")
            .then(res => res.json())
            .then(setCategoryList)
            .catch(err => console.error("카테고리 불러오기 실패:", err));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, category: value }));

        setShowCustomCategoryInput(value === "ADD_NEW");

        if (value !== "ADD_NEW") {
            setFormData(prev => ({ ...prev, customCategory: "" }));
            if (errors.customCategory) {
                setErrors(prev => ({ ...prev, customCategory: "" }));
            }
        }

        if (errors.category) {
            setErrors(prev => ({ ...prev, category: "" }));
        }
    };

    useEffect(() => {
        if (formData.images.length > 0) {
            const first = formData.images[0];
            if (typeof first === "string") {
                setFormData(prev => ({ ...prev, thumbnailUrl: first }));
            } else if (first instanceof File) {
                const previewUrl = URL.createObjectURL(first);
                setFormData(prev => ({ ...prev, thumbnailUrl: previewUrl }));
            }
        }
    }, [formData.images]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "제목을 입력하세요.";
        if (!(formData.customCategory || formData.category)) newErrors.category = "카테고리를 입력하세요.";
        if (!formData.type.trim()) newErrors.type = "유형을 입력하세요.";
        if (!formData.year.trim()) newErrors.year = "연도를 입력하세요.";
        if (!formData.description.trim()) newErrors.description = "설명을 입력하세요.";

        if (showCustomCategoryInput && !formData.customCategory.trim()) {
            newErrors.customCategory = "새 카테고리명을 입력하세요.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const confirmed = window.confirm("이대로 수정하시겠습니까?");
        if (!confirmed) return;

        setIsSubmitting(true);
        try {
            // const existingImages = formData.images.filter(img => typeof img === "string");
            // 이건 formData.images에서 기존 이미지들만 골라서 원래 순서 유지한 배열을 existingImages에 저장

            // const newFiles = formData.images.filter(img => img instanceof File);
            // 이건 새 파일들만 골라서 newFiles에 저장, 원래 formData.images에서의 순서는 유지되지만, 기존 이미지 제외한 새 이미지들만 모은 배열

            // const cleanImageUrls = [...existingImages, ...uploadedImages];
            // 하지만 cleanImageUrls 병합은 그냥 이어붙임 => [기존 이미지들..., 새 이미지들...] 순서 엉키는 문제 발생!

            // 새로 추가 된 이미지 파일만 골라내기(기존꺼는 String, 새로 추가하면 File)
            const newFiles = formData.images.filter(img => img instanceof File);
            const uploadedImagesMap = new Map();

            // 먼저 업로드된 새 이미지들을 매핑
            await Promise.all(
                newFiles.map(async (file) => {
                    const url = await uploadToS3(file, "images/");
                    uploadedImagesMap.set(file, url);
                })
            );
            // 원래 순서를 유지하면서 URL을 재구성
            const cleanImageUrls = formData.images.map(img => {
                if (typeof img === "string") {
                    return img.split("https://spkorea-portfolio-storage.s3.ap-northeast-2.amazonaws.com/")[1]; // 상대 경로만 추출
                }
                if (img instanceof File) {
                    // 새로 업로드된 이미지는 상대 경로로만 저장
                    return uploadedImagesMap.get(img);
                }
                return null;
            }).filter(Boolean); // null 값 제거

            const thumbnailUrl = cleanImageUrls[0];


            let videoUrl = null;
            if (formData.video instanceof File) {
                // 사용자가 새로 비디오 파일을 업로드했으면
                // S3에 업로드하고, 그 결과 URL(상대경로) 받아서 videoUrl에 저장
                videoUrl = await uploadToS3(formData.video, "videos/");
            } else if (typeof formData.video === "string") {
                // 이미 저장된 비디오 상대경로가 있다면 그대로 사용
                videoUrl = formData.video;
            }

            const token = localStorage.getItem("token");
            const response = await fetch(`https://spkorea.art/api/work/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: formData.title,
                    category: formData.customCategory || formData.category,
                    type: formData.type,
                    year: formData.year,
                    description: formData.description,
                    link: formData.link,
                    thumbnailUrl,
                    images: cleanImageUrls,
                    videoUrl
                })
            });

            if (!response.ok) throw new Error("작업 수정 실패");

            alert("성공적으로 수정되었습니다.");
            navigate("/work");
        } catch (err) {
            console.error("작업 수정 오류:", err);
            alert("수정에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteWork = async () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`https://spkorea.art/api/work/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "삭제에 실패했습니다.");
            }

            alert("삭제가 완료되었습니다.");
            navigate("/work");
        } catch (error) {
            console.error("삭제 오류:", error);
            alert(`삭제 중 오류가 발생했습니다: ${error.message}`);
        }
    };

    const baseUrl = "https://spkorea-portfolio-storage.s3.ap-northeast-2.amazonaws.com/";

    return (
        <div className="admin-wrapper">
            <div className="admin-container">
                <h2 className="admin-title">MODIFY WORKS</h2>
                <form className="admin-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">제목</label>
                        <input
                            name="title"
                            className={`form-input ${errors.title ? "error" : ""}`}
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                        {errors.title && <p className="error-text">{errors.title}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">카테고리</label>
                        <select
                            ref={categoryRef}
                            className={`form-input ${errors.category ? "error" : ""}`}
                            value={formData.category}
                            onChange={handleCategoryChange}
                        >
                            <option value="" disabled hidden>
                                카테고리 선택 *
                            </option>
                            {categoryList.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                            <option value="ADD_NEW">+ 새 카테고리 추가</option>
                        </select>
                        {errors.category && <p className="error-text">{errors.category}</p>}
                    </div>

                    {showCustomCategoryInput && (
                        <div className="form-group">
                            <input
                                ref={customCategoryRef}
                                name="customCategory"
                                className={`form-input ${errors.customCategory ? "error" : ""}`}
                                type="text"
                                placeholder="새 카테고리 이름 *"
                                value={formData.customCategory}
                                onChange={handleInputChange}
                            />
                            {errors.customCategory && (
                                <p className="error-text">{errors.customCategory}</p>
                            )}
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">유형</label>
                        <input
                            name="type"
                            className={`form-input ${errors.type ? "error" : ""}`}
                            value={formData.type}
                            onChange={handleInputChange}
                        />
                        {errors.type && <p className="error-text">{errors.type}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">연도</label>
                        <input
                            name="year"
                            className={`form-input ${errors.year ? "error" : ""}`}
                            value={formData.year}
                            onChange={handleInputChange}
                        />
                        {errors.year && <p className="error-text">{errors.year}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">설명</label>
                        <textarea
                            name="description"
                            className={`form-input ${errors.description ? "error" : ""}`}
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                        {errors.description && <p className="error-text">{errors.description}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">외부 링크</label>
                        <input
                            name="link"
                            className="form-input"
                            value={formData.link}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">이미지</label>
                        <ImageUploader
                            images={formData.images}
                            onImagesChange={(newImages) =>
                                setFormData((prev) => ({ ...prev, images: newImages }))
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">영상</label>
                        <VideoUploader
                            initialVideoUrl={
                                typeof formData.video === "string" && formData.video
                                    ? baseUrl + formData.video
                                    : formData.video || null
                            } onVideoChange={(fileOrUrl) =>
                                setFormData((prev) => ({ ...prev, video: fileOrUrl }))
                            }
                        />
                    </div>

                    <button className="submit-btn" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? <div className="spinner" /> : "수정"}
                    </button>
                    <button className="delete-btn" type="button" onClick={deleteWork}>
                        삭제
                    </button>
                </form>
            </div>
        </div>
    );
}

export default WorkEdit;
