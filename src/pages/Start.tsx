import { useNavigate } from "react-router";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { FRAME_TYPE_SELECT } from "../constants/routes";
import { SITE_BRANDING } from "../constants/constants";
import { usePhotoBooth } from "../hooks/usePhotoBooth";
import { useEffect } from "react";
import { DefaultFrame } from "../frames/DefaultFrame";

export default function Start() {
    const navigate = useNavigate();
    const {
        setFrameType,
        setCapturedPhotos,
        setSelectedPhotos,
        setSelectedFrameSkin,
        setPrintCount,
        setPublishToGuestbook,
        setUploadedPhotoId,
        setQrImage,
    } = usePhotoBooth();

    useEffect(() => {
        // reset
        setFrameType(null);
        setSelectedPhotos([]);
        setCapturedPhotos([]);
        setSelectedFrameSkin(DefaultFrame);
        setPrintCount(1);
        setPublishToGuestbook(true);
        setUploadedPhotoId(-1);
        setQrImage("");
    }, []);

    return (
        <div className="flex flex-col w-full h-full py-12 items-center justify-center gap-12">
            <div className="flex flex-col items-center gap-6">
                <img
                    className="w-48 h-auto rounded-full"
                    src="/assets/greedy_badge.jpg"
                />
                <Heading>{SITE_BRANDING}</Heading>
            </div>
            <Button size="lg" onClick={() => navigate(FRAME_TYPE_SELECT)}>
                시작하기
            </Button>
        </div>
    );
}
