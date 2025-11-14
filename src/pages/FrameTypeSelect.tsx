import { useEffect, useState } from "react";
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

    const handleFrameTypeClick = (clickedType: FrameType) => {
        setFrameType(frameType !== clickedType ? clickedType : null);
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
                <div
                    className="pointer-events-none opacity-50 relative flex flex-col items-center gap-6 p-8 h-full min-h-0 data-[active=true]:opacity-50 rounded-lg cursor-pointer"
                    onClick={() => handleFrameTypeClick("portrait")}
                    data-active={frameType === "portrait"}
                >
                    <PhotoFrame frameType="portrait" />
                    <span className="text-lg font-semibold">세로 프레임</span>

                    {frameType === "portrait" && (
                        <div className="absolute inset-0 flex items-center justify-center z-10 rounded-md">
                            <img
                                src="/assets/check.svg"
                                alt="check"
                                className="w-25 h-25"
                            />
                        </div>
                    )}
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
