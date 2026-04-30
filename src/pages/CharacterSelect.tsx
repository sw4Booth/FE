import Heading from "../components/Heading";
import Button from "../components/Button";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router";
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

const STYLES = [
    {
        id: "watercolor",
        name: "수채화 & 아날로그",
        example: "(지브리 스타일)",
        thumbSrc: "/assets/styles/watercolor.png",
    },
    {
        id: "cartoon",
        name: "말랑 카툰",
        example: "(짱구 스타일)",
        thumbSrc: "/assets/styles/cartoon.png",
    },
    {
        id: "village",
        name: "포근한 마을 감성",
        example: "(동물의 숲 스타일)",
        thumbSrc: "/assets/styles/village.png",
    },
];

export default function CharacterSelect() {
    const frameRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { selectedFrameSkin, selectedPhotos, setUploadedPhotoId } =
        usePhotoBooth();
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [transformedPhotos, setTransformedPhotos] = useState<string[]>([]);

    const handleConfirm = async () => {
        if (!selectedStyle) return;
        setIsLoading(true);

        const frameSrc = frameRef.current;
        if (!frameSrc) {
            console.warn("No frameRef available for capture.");
            return;
        }

        try {
            const { data } = await api.post<
                PhotosTransformResponse,
                PhotosTransformRequest
            >(API_PHOTOS_TRANSFORM, {
                images: selectedPhotos.map((dataUrl) =>
                    dataUrl.replace(/^data:[^;]+;base64,/, ""),
                ),
                style: selectedStyle,
            });
            flushSync(() => {
                setTransformedPhotos(data.transformedImages);
            });

            const clone = frameSrc.cloneNode(true) as HTMLElement;
            document.body.appendChild(clone);
            await generateAndUploadImage(clone);

            navigate(PRINT);
        } catch (e) {
            console.error("Transform failed:", e);
        } finally {
            setIsLoading(false);
        }
    };

    const generateAndUploadImage = async (element: HTMLElement) => {
        if (!frameRef.current) return;

        try {
            const canvas = await html2canvas(element, { scale: 3 }); // TODO: 인쇄 상태에 따라 scale(DPI) 수정

            canvas.toBlob(async (blob) => {
                if (!blob) return;

                // FormData에 담기
                const formData = new FormData();
                formData.append(
                    "file",
                    new File([blob], "image.jpg", { type: "image/jpeg" }),
                );

                // 서버 업로드
                try {
                    const { data } = await api.post<
                        PhotoUploadResponse,
                        PhotoUploadPayload
                    >(API_PHOTOS_UPLOAD, formData);
                    setUploadedPhotoId(data.id);

                    console.log(
                        "Upload success with id:",
                        data.id,
                        data.imageUrl,
                    );
                } catch (e) {
                    console.error("Upload failed:", e);
                }

                // 다운로드 테스트
                // const link = document.createElement("a");
                // link.download = "photobooth.jpg";
                // link.href = URL.createObjectURL(blob);
                // link.click();
            }, "image/jpeg");
        } catch (e) {
            console.error("Failed to generate image:", e);
        } finally {
            element.remove();
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <Heading>변환할 AI 캐릭터 스타일을 선택해주세요</Heading>
            <div className="flex gap-10 justify-center mt-40 mb-40 w-full px-8">
                {STYLES.map((style) => {
                    const isSelected = selectedStyle === style.id;
                    return (
                        <div
                            key={style.id}
                            onClick={() => setSelectedStyle(style.id)}
                            className={[
                                "flex flex-col rounded-2xl overflow-hidden cursor-pointer",
                                "transition-all duration-200 hover:scale-[1.02]",
                                isSelected
                                    ? "ring-2 ring-primary-600 scale-[1.02]"
                                    : "",
                            ].join(" ")}
                            style={{
                                background: "white",
                                width: 300,
                                boxShadow: isSelected
                                    ? "0 0 0 4px #007ce020"
                                    : "0 1px 4px rgba(0,0,0,0.08)",
                            }}
                        >
                            <div
                                className="w-full relative"
                                style={{ height: 200 }}
                            >
                                <img
                                    src={style.thumbSrc}
                                    alt={style.name}
                                    className="w-full h-full object-cover"
                                />
                                {isSelected && (
                                    <div
                                        className="absolute top-2 right-2 flex items-center justify-center rounded-full"
                                        style={{
                                            width: 24,
                                            height: 24,
                                            background: "#007ce0",
                                        }}
                                    >
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                        >
                                            <path
                                                d="M2 6l3 3 5-5"
                                                stroke="#fff"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            <div className="px-4 py-3 flex flex-col items-center justify-center">
                                <p className="font-medium text-gray-800">
                                    {style.name}
                                </p>
                                <p className="text-sm text-gray-400">
                                    {style.example}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Button
                size="lg"
                onClick={handleConfirm}
                disabled={!selectedStyle || isLoading}
            >
                {isLoading ? "변환 중..." : "선택 완료"}
            </Button>
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
