import { useState } from "react";
import {
    PhotoBoothContext,
    type PhotoBoothContextType,
} from "./PhotoBoothContext";
import type { FrameType, FrameSkin } from "../types/Frame";
import { DefaultFrame } from "../frames/DefaultFrame";

export const PhotoBoothProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [frameType, setFrameType] = useState<FrameType | null>(null);
    const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
    const [selectedFrameSkin, setSelectedFrameSkin] =
        useState<FrameSkin | null>(DefaultFrame);
    const [printCount, setPrintCount] = useState(2);
    const [shouldPublishToGuestbook, setPublishToGuestbook] = useState(true);
    const [uploadedPhotoId, setUploadedPhotoId] = useState<number>(-1);
    const [qrImage, setQrImage] = useState<string>("");
    const [transformedPhotos, setTransformedPhotos] = useState<string[]>([]);
    const [shootingVideoUrl, setShootingVideoUrl] = useState<string | null>(null);

    const value: PhotoBoothContextType = {
        frameType,
        capturedPhotos,
        selectedPhotos,
        selectedFrameSkin,
        printCount,
        shouldPublishToGuestbook,
        uploadedPhotoId,
        qrImage,
        transformedPhotos,
        shootingVideoUrl,
        setFrameType,
        setCapturedPhotos,
        setSelectedPhotos,
        setSelectedFrameSkin,
        setPrintCount,
        setPublishToGuestbook,
        setUploadedPhotoId,
        setQrImage,
        setTransformedPhotos,
        setShootingVideoUrl,
    };

    return (
        <PhotoBoothContext.Provider value={value}>
            {children}
        </PhotoBoothContext.Provider>
    );
};
