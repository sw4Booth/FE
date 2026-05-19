import Heading from "../components/Heading";
import PhotoFrame from "../components/PhotoFrame";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { PRINT } from "../constants/routes";
import { usePhotoBooth } from "../hooks/usePhotoBooth";
import { api } from "../libs/api";
import { API_PHOTOS_UPLOAD } from "../constants/api";
import type { PhotoUploadPayload, PhotoUploadResponse } from "../types/api";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { BlackFrame } from "../frames/Black";
import { GreenFrame } from "../frames/Green";
import { YellowFrame } from "../frames/Yellow";
import { NavyFrame } from "../frames/Navy";
import { BrownFrame } from "../frames/brown";
import { BlueFrame } from "../frames/blue";
import { PurpleFrame } from "../frames/Purple";

const frameSkins = [
    BlackFrame,
    GreenFrame,
    YellowFrame,
    NavyFrame,
    BrownFrame,
    BlueFrame,
    PurpleFrame,
];

export default function FrameSkinSelect() {
    const frameRef = useRef<HTMLDivElement>(null);
    const {
        selectedPhotos,
        selectedFrameSkin,
        setSelectedFrameSkin,
        setUploadedPhotoId,
    } = usePhotoBooth();
    const navigate = useNavigate();

    const handleFinishSelect = async () => {
        const frameSrc = frameRef.current;
        if (!frameSrc) {
            console.warn("No frameRef available for capture.");
            return;
        }

        const clone = frameSrc.cloneNode(true) as HTMLElement;
        document.body.appendChild(clone);

        navigate(PRINT);

        // 이미지 업로드
        generateAndUploadImage(clone);
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
                    new File([blob], "image.png", { type: "image/png" }),
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
                // link.download = "photobooth.png";
                // link.href = URL.createObjectURL(blob);
                // link.click();
            });
        } catch (e) {
            console.error("Failed to generate image:", e);
        } finally {
            element.remove();
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <Heading>배경 프레임을 선택해주세요</Heading>
            <div className="flex w-full justify-center mt-10">
                <div className="mx-auto my-auto ml-20">
                    <PhotoFrame
                        frameType="landscape"
                        photos={selectedPhotos}
                        skin={selectedFrameSkin ?? undefined}
                    />
                </div>

                <div className="w-[80%] my-auto mx-auto scale-80 flex justify-start gap-5 overflow-x-auto overflow-y-hidden">
                    {frameSkins.map((skin, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedFrameSkin(skin)}
                            data-selected={selectedFrameSkin === skin}
                            className="relative shrink-0 cursor-pointer transition-all duration-200
                            hover:opacity-80 data-[selected=true]:opacity-50"
                        >
                            <PhotoFrame
                                frameType="landscape"
                                photos={[]}
                                skin={skin}
                            />

                            {selectedFrameSkin === skin && (
                                <div className="absolute inset-0 flex items-center justify-center z-10 rounded-md">
                                    <img
                                        src="/assets/check.svg"
                                        alt="check"
                                        className="w-25 h-25"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Button size="lg" onClick={handleFinishSelect}>
                선택 완료
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
                    frameType="landscape"
                    photos={selectedPhotos}
                    skin={selectedFrameSkin ?? undefined}
                />
            </div>
        </div>
    );
}
