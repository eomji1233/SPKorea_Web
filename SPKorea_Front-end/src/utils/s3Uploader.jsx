export const uploadToS3 = async (file, pathPrefix = "uploads/") => {
    const token = localStorage.getItem('token');
    const fileName = `${pathPrefix}${Date.now()}-${file.name}`;

    const res = await fetch(`https://spkorea.art/api/s3/presign?key=${encodeURIComponent(fileName)}&contentType=${encodeURIComponent(file.type)}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error("Presigned URL 요청 실패");

    const data = await res.json();
    const presignedUrl = data.url;

    if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(`Presigned URL 요청 실패: ${res.status} ${errMsg}`);
    }

    const putRes = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
            "Content-Type": file.type,
        },
    });

    if (!putRes.ok) throw new Error("S3 업로드 실패");

    return fileName;
};
