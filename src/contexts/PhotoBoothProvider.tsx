import { useState } from "react";
import {
    PhotoBoothContext,
    type PhotoBoothContextType,
} from "./PhotoBoothContext";
import type { FrameType, FrameSkin } from "../types/Frame";
import { DefaultFrame } from "../frames/CloudFrame";

export const PhotoBoothProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [frameType, setFrameType] = useState<FrameType | null>(null);
    const [capturedPhotos, setCapturedPhotos] = useState<File[]>([]);
    const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
    const [selectedFrameSkin, setSelectedFrameSkin] = useState<FrameSkin | null>(DefaultFrame);
    const [printCount, setPrintCount] = useState(1);
    const [shouldPublishToGuestbook, setPublishToGuestbook] = useState(false);
    const [uploadedPhotoId, setUploadedPhotoId] = useState<number | null>(null);

    const value: PhotoBoothContextType = {
        frameType,
        capturedPhotos,
        selectedPhotos,
        selectedFrameSkin,
        printCount,
        shouldPublishToGuestbook,
        uploadedPhotoId,
        setFrameType,
        setCapturedPhotos,
        setSelectedPhotos,
        setSelectedFrameSkin,
        setPrintCount,
        setPublishToGuestbook,
        setUploadedPhotoId
    };

    return (
        <PhotoBoothContext.Provider value={value}>
            {children}
        </PhotoBoothContext.Provider>
    );
};
