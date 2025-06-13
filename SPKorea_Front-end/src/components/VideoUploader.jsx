import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const VideoUploader = ({ onVideoChange, initialVideoUrl }) => {
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (initialVideoUrl && typeof initialVideoUrl === "string") {
            setPreviewUrl(initialVideoUrl);
        }
    }, [initialVideoUrl]);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;
        if (file.size > 500 * 1024 * 1024) {
            alert("비디오는 500MB 이하만 업로드 가능합니다.");
            return;
        }
        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);
        onVideoChange(file);
    }, [onVideoChange]);

    const handleRemove = useCallback(() => {
        setPreviewUrl(null);
        onVideoChange(null);
    }, [onVideoChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "video/*": [] },
        onDrop,
        multiple: false,
    });

    return (
        <div className="video-uploader" style={{ position: "relative" }}>
            <div
                {...getRootProps()}
                style={{
                    border: "2px dashed #aaa",
                    borderRadius: "12px",
                    padding: "24px",
                    textAlign: "center",
                    backgroundColor: "#fafafa",
                    cursor: "pointer",
                    minHeight: "160px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    position: "relative",
                }}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>영상을 여기에 놓으세요...</p>
                ) : previewUrl ? (
                    <video
                        src={previewUrl}
                        autoPlay
                        muted
                        controls
                        width="500"
                        style={{
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                    />
                ) : (
                    <p>비디오를 클릭하거나 드래그해서 업로드</p>
                )}

                {previewUrl && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRemove();
                        }}
                        style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            background: "#ff4d4f",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "24px",
                            height: "24px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            zIndex: 10,
                        }}
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

export default VideoUploader;
