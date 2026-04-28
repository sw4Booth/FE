import Heading from "../components/Heading";
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { usePhotoBooth } from "../hooks/usePhotoBooth";
import { api } from "../libs/api";
import { PRINT } from "../constants/routes";
import { API_PHOTOS_TRANSFORM, API_PHOTOS_UPLOAD } from "../constants/api";
import type { PhotoUploadPayload, PhotoUploadResponse } from "../types/api";

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

const imageUrlToBase64 = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext("2d")?.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/jpeg").split(",")[1]);
        };
        img.onerror = reject;
        img.src = url;
    });
};

const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });

export default function CharacterSelect() {
    const navigate = useNavigate();
    const { selectedPhotos, setUploadedPhotoId } = usePhotoBooth();
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    interface TransformRequest {
        images: string[];
        style: string;
    }

    interface TransformResponse {
        transformedImages: string[];
    }

    const handleConfirm = async () => {
        if (!selectedStyle) return;
        setIsLoading(true);

        try {
            // 1. 선택된 사진 base64 변환
            const base64Photos = await Promise.all(
                selectedPhotos.map((url) => imageUrlToBase64(url)),
            );

            // 2. transform API 호출
            const { data } = await api.post<
                TransformResponse,
                TransformRequest
            >(API_PHOTOS_TRANSFORM, {
                images: base64Photos,
                style: selectedStyle,
            });

            // 3. 원본 + 변환본 합성 후 업로드
            await generateAndUploadMerged(
                selectedPhotos,
                data.transformedImages,
            );

            navigate(PRINT);
        } catch (e) {
            console.error("Transform failed:", e);
        } finally {
            setIsLoading(false);
        }
    };

    const generateAndUploadMerged = async (
        originals: string[],
        transformed: string[],
    ) => {
        const canvas = document.createElement("canvas");
        canvas.width = 1200;
        canvas.height = 1800;
        const ctx = canvas.getContext("2d")!;

        const cellW = 600;
        const cellH = 450;

        for (let i = 0; i < 4; i++) {
            const y = i * cellH;
            const orig = await loadImage(originals[i]);
            ctx.drawImage(orig, 0, y, cellW, cellH);

            const trans = await loadImage(
                `data:image/jpeg;base64,${transformed[i]}`,
            );
            ctx.drawImage(trans, cellW, y, cellW, cellH);
        }

        // toBlob을 Promise로 감쌈
        const blob = await new Promise<Blob>((resolve, reject) =>
            canvas.toBlob((b) =>
                b ? resolve(b) : reject(new Error("toBlob failed")),
            ),
        );

        const formData = new FormData();
        formData.append(
            "file",
            new File([blob], "merged.png", { type: "image/png" }),
        );

        const { data } = await api.post<
            PhotoUploadResponse,
            PhotoUploadPayload
        >(API_PHOTOS_UPLOAD, formData);
        setUploadedPhotoId(data.id);
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
        </div>
    );
}
