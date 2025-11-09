import { createContext, type Dispatch, type SetStateAction } from "react";
import type { FrameSkin, FrameType } from "../types/Frame";

export interface PhotoBoothState {
    frameType: FrameType | null;
    capturedPhotos: File[];
    selectedPhotos: File[];
    selectedFrameSkin: FrameSkin | null;
    printCount: number;
    shouldPublishToGuestbook: boolean;
    uploadedPhotoId: number | null;
}

export interface PhotoBoothContextType extends PhotoBoothState {
    setFrameType: Dispatch<SetStateAction<FrameType | null>>;
    setCapturedPhotos: Dispatch<SetStateAction<File[]>>;
    setSelectedPhotos: Dispatch<SetStateAction<File[]>>;
    setSelectedFrameSkin: Dispatch<SetStateAction<FrameSkin | null>>;
    setPrintCount: Dispatch<SetStateAction<number>>;
    setPublishToGuestbook: Dispatch<SetStateAction<boolean>>;
    setUploadedPhotoId: Dispatch<SetStateAction<number | null>>;
}

export const PhotoBoothContext = createContext<
    PhotoBoothContextType | undefined
>(undefined);
