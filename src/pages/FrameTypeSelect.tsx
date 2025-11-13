import { useEffect } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import PhotoFrame from "../components/PhotoFrame";
import { usePhotoBooth } from "../hooks/usePhotoBooth";
import type { FrameType } from "../types/Frame";
import { useNavigate } from "react-router";
import { PHOTO_SHOOT } from "../constants/routes";

export default function FrameTypeSelect() {
    const { frameType, setFrameType } = usePhotoBooth();
    const navigate = useNavigate();

    const handleFrameTypeClick = (frameType: FrameType) => {
        setFrameType(frameType);
    };

    useEffect(() => {
        console.log("frameType:", frameType);
    }, [frameType]);

    return (
        <div className="flex flex-col w-full h-full items-center gap-6">
            <Heading>가로 / 세로 프레임 선택</Heading>
            <div className="flex grow gap-32 items-center min-h-0">
                <div
                    className="relative flex flex-col items-center gap-6 p-8 h-full min-h-0 rounded-lg cursor-pointer data-[selected=true]:opacity-50"
                    onClick={() => handleFrameTypeClick("landscape")}
                    data-selected={frameType === "landscape"}
                >
                    <PhotoFrame frameType="landscape" />
                    <span className="text-lg font-semibold">가로 프레임</span>

                    {frameType === "landscape" && (
                        <div className="absolute inset-0 flex items-center justify-center z-10 rounded-md">
                            <img
                                src="/assets/check.svg"
                                alt="check"
                                className="w-25 h-25"
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-center gap-6 p-8 h-full min-h-0 rounded-lg opacity-50">
                    <PhotoFrame frameType="portrait" />
                    <span className="text-lg font-semibold">세로 프레임</span>
                </div>
            </div>
            <Button
                size="lg"
                onClick={() => navigate(PHOTO_SHOOT)}
                disabled={!frameType}
            >
                선택 완료
            </Button>
        </div>
    );
}
