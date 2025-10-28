import { useState } from "react";
import { PhotoBoothContext, type PhotoBoothContextType } from "./PhotoBoothContext";
import type { FrameType } from "../types/FrameType";

export const PhotoBoothProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [frameType, setFrameType] = useState<FrameType | null>(null);
    const [capturedPhotos, setCapturedPhotos] = useState<File[]>([]);
    const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
    const [backgroundFrame, setBackgroundFrame] = useState<string | null>(null);
    const [printCount, setPrintCount] = useState(1);
    const [shouldPublishToGuestbook, setPublishToGuestbook] = useState(false);

    const value: PhotoBoothContextType = {
        frameType,
        capturedPhotos,
        selectedPhotos,
        backgroundFrame,
        printCount,
        shouldPublishToGuestbook,
        setFrameType,
        setCapturedPhotos,
        setSelectedPhotos,
        setBackgroundFrame,
        setPrintCount,
        setPublishToGuestbook
    };

    return (
        <PhotoBoothContext.Provider value={value}>
            {children}
        </PhotoBoothContext.Provider>
    );
};
