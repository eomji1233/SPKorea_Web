import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from "uuid";

const SortableImage = ({ id, preview, onRemove, isThumbnail }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        width: "100px",
        height: "100px",
        objectFit: "cover",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        position: "relative",
        overflow: "hidden",
    };

    const badgeStyle = {
        position: "absolute",
        top: "10px",
        left: "10px",
        padding: "4px 10px",
        fontSize: "11px",
        fontWeight: "500",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(8px)",
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.12)",
        border: "1px solid rgba(200, 200, 200, 0.4)",
        userSelect: "none",
        zIndex: 10,
    };

    const overlayStyle = {
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.05)",
        borderRadius: "8px",
        pointerEvents: "none",
        zIndex: 5,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <img src={preview} alt="preview" style={{ width: "100%", height: "100%", borderRadius: "8px" }} />

            {isThumbnail && (
                <>
                    <div style={badgeStyle}>
                        썸네일
                    </div>
                    <div style={overlayStyle} />
                </>
            )}

            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove(id);
                }}
                style={{
                    position: "absolute",
                    top: "6px",
                    right: "4px",
                    background: "#ff4d4f",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    fontSize: "14px",
                    lineHeight: "18px",
                    cursor: "pointer",
                    zIndex: 20,
                }}
            >
                ×
            </button>
        </div>
    );
};

const ImageUploader = ({ images = [], onImagesChange }) => {
    const [previewImages, setPreviewImages] = useState([]);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized && images.length > 0) {
            const mapped = images.map((img) => {
                if (typeof img === "string") {
                    return {
                        id: uuidv4(),
                        file: null,
                        preview: img,
                    };
                } else {
                    return {
                        id: uuidv4(),
                        file: img,
                        preview: URL.createObjectURL(img),
                    };
                }
            });
            setPreviewImages(mapped);
            setInitialized(true);
        }
    }, [images, initialized]);

    const onDrop = useCallback(
        (acceptedFiles) => {
            const validFiles = acceptedFiles.filter((file) => file instanceof File);

            const newImages = validFiles.map((file) => ({
                id: uuidv4(),
                file,
                preview: URL.createObjectURL(file),
            }));

            const updated = [...previewImages, ...newImages];
            setPreviewImages(updated);

            const cleaned = updated
                .map((img) =>
                    img.file instanceof File
                        ? img.file
                        : typeof img.preview === "string"
                            ? img.preview
                            : null
                )
                .filter((item) => item !== null);

            onImagesChange(cleaned);
        },
        [previewImages, onImagesChange]
    );

    const removeImage = (id) => {
        const updated = previewImages.filter((img) => img.id !== id);
        setPreviewImages(updated);
        onImagesChange(updated.map((img) => img.file || img.preview));
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = previewImages.findIndex((img) => img.id === active.id);
            const newIndex = previewImages.findIndex((img) => img.id === over?.id);
            const sorted = arrayMove(previewImages, oldIndex, newIndex);
            setPreviewImages(sorted);
            onImagesChange(sorted.map((img) => img.file || img.preview));
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/*": [] },
        onDrop,
        multiple: true,
    });

    return (
        <div className="image-uploader">
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
                    justifyContent: previewImages.length > 0 ? "flex-start" : "center",
                    gap: "10px",
                }}
            >
                <input {...getInputProps()} />
                {previewImages.length === 0 && (
                    <p style={{ color: "#666" }}>이미지를 클릭하거나 드래그해서 업로드하세요.</p>
                )}

                {previewImages.length > 0 && (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={previewImages.map((img) => img.id)} strategy={rectSortingStrategy}>
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "10px",
                                    justifyContent: "center",
                                }}
                            >
                                {previewImages.map((item, index) => (
                                    <SortableImage
                                        key={item.id}
                                        id={item.id}
                                        preview={item.preview}
                                        onRemove={removeImage}
                                        isThumbnail={index === 0}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </div>
        </div>
    );
};

export default ImageUploader;
