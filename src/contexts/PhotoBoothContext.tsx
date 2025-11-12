import { createContext, type Dispatch, type SetStateAction } from "react";
import type { FrameSkin, FrameType } from "../types/Frame";

export interface PhotoBoothState {
    frameType: FrameType | null;
    capturedPhotos: string[];
    selectedPhotos: string[];
    selectedFrameSkin: FrameSkin | null;
    printCount: number;
    shouldPublishToGuestbook: boolean;
    uploadedPhotoId: number;
}

export interface PhotoBoothContextType extends PhotoBoothState {
    setFrameType: Dispatch<SetStateAction<FrameType | null>>;
    setCapturedPhotos: Dispatch<SetStateAction<string[]>>;
    setSelectedPhotos: Dispatch<SetStateAction<string[]>>;
    setSelectedFrameSkin: Dispatch<SetStateAction<FrameSkin | null>>;
    setPrintCount: Dispatch<SetStateAction<number>>;
    setPublishToGuestbook: Dispatch<SetStateAction<boolean>>;
    setUploadedPhotoId: Dispatch<SetStateAction<number>>;
}

export const PhotoBoothContext = createContext<
    PhotoBoothContextType | undefined
>(undefined);
