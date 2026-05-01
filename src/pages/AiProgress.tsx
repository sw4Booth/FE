import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePhotoBooth } from "../hooks/usePhotoBooth";
import { api } from "../libs/api";
import { PRINT } from "../constants/routes";
import { API_PHOTOS_TRANSFORM, API_PHOTOS_UPLOAD } from "../constants/api";
import type {
    PhotoUploadPayload,
    PhotoUploadResponse,
    PhotosTransformRequest,
    PhotosTransformResponse,
} from "../types/api";
import PhotoFrame from "../components/PhotoFrame";
import html2canvas from "html2canvas";
import Heading from "../components/Heading";

const TIMELAPSE_SPEED = 4;
const TRANSFORM_MAX_RETRIES = 3;
const TRANSFORM_RETRY_DELAY = 2000;

export default function AiProgress() {
    const location = useLocation();
    const { style } = (location.state ?? {}) as { style: string };
    const navigate = useNavigate();
    const {
        selectedPhotos,
        selectedFrameSkin,
        shootingVideoUrl,
        setUploadedPhotoId,
    } = usePhotoBooth();
    const [transformedPhotos, setTransformedPhotos] = useState<string[]>([]);
    const frameRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const uploadDone = useRef(false);
    const transformDone = useRef(false);

    useEffect(() => {
        if (transformDone.current) return;
        transformDone.current = true;

        async function transform() {
            for (let attempt = 0; attempt <= TRANSFORM_MAX_RETRIES; attempt++) {
                try {
                    const { data } = await api.post<
                        PhotosTransformResponse,
                        PhotosTransformRequest
                    >(API_PHOTOS_TRANSFORM, {
                        images: selectedPhotos.map((dataUrl) =>
                            dataUrl.replace(/^data:[^;]+;base64,/, ""),
                        ),
                        style,
                    });
                    setTransformedPhotos(data.transformedImages);
                    return;
                } catch (e: unknown) {
                    const status = (e as { response?: { status?: number } })?.response?.status;
                    if (attempt < TRANSFORM_MAX_RETRIES && status !== undefined && status >= 500) {
                        await new Promise((r) => setTimeout(r, TRANSFORM_RETRY_DELAY * (attempt + 1)));
                        continue;
                    }
                    console.error("Transform failed:", e);
                    return;
                }
            }
        }

        transform();
    }, []);

    useEffect(() => {
        if (
            transformedPhotos.length === 0 ||
            !frameRef.current ||
            uploadDone.current
        )
            return;
        uploadDone.current = true;

        const clone = frameRef.current.cloneNode(true) as HTMLElement;
        document.body.appendChild(clone);

        html2canvas(clone, { scale: 3 })
            .then((canvas) => {
                canvas.toBlob(async (blob) => {
                    if (!blob) {
                        navigate(PRINT);
                        return;
                    }
                    const formData = new FormData();
                    formData.append(
                        "file",
                        new File([blob], "image.jpg", { type: "image/jpeg" }),
                    );
                    try {
                        const { data } = await api.post<
                            PhotoUploadResponse,
                            PhotoUploadPayload
                        >(API_PHOTOS_UPLOAD, formData);
                        setUploadedPhotoId(data.id);
                    } catch (e) {
                        console.error("Upload failed:", e);
                    }
                    navigate(PRINT);
                }, "image/jpeg");
            })
            .catch((e) => {
                console.error("Failed to generate image:", e);
                navigate(PRINT);
            })
            .finally(() => {
                clone.remove();
            });
    }, [transformedPhotos]);

    return (
        <div className="flex flex-col w-full h-full items-center gap-6">
            <Heading>AI 이미지 변환 중...</Heading>
            <div className="flex flex-col grow items-center justify-center gap-8 w-[70%] p-4 bg-gray-100 rounded-lg overflow-hidden">
                {shootingVideoUrl ? (
                    <video
                        ref={videoRef}
                        src={shootingVideoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover rounded-lg -scale-x-100"
                        onLoadedMetadata={(e) => {
                            (e.target as HTMLVideoElement).playbackRate =
                                TIMELAPSE_SPEED;
                        }}
                    />
                ) : (
                    <div className="flex flex-wrap gap-2 justify-center">
                        {selectedPhotos.map((photo, i) => (
                            <img
                                key={i}
                                src={photo}
                                className="w-28 h-28 object-cover rounded-lg"
                            />
                        ))}
                    </div>
                )}
            </div>
            <span className="text-2xl font-medium text-primary-600">
                잠시만 기다려주세요...
            </span>

            <div
                ref={frameRef}
                style={{
                    position: "absolute",
                    top: "-9999px",
                    left: "-9999px",
                }}
            >
                <PhotoFrame
                    frameType="ai"
                    photos={selectedPhotos}
                    transformedPhotos={transformedPhotos}
                    skin={selectedFrameSkin ?? undefined}
                />
            </div>
        </div>
    );
}
