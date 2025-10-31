import { createContext, type Dispatch, type SetStateAction } from "react";
import type { FrameType } from "../types/FrameType";

export interface PhotoBoothState {
  frameType: FrameType | null;
  capturedPhotos: File[];
  selectedPhotos: File[];
  backgroundFrame: string | null;
  printCount: number;
  shouldPublishToGuestbook: boolean;
}

export interface PhotoBoothContextType extends PhotoBoothState {
    setFrameType: Dispatch<SetStateAction<FrameType | null>>;
    setCapturedPhotos: Dispatch<SetStateAction<File[]>>;
    setSelectedPhotos: Dispatch<SetStateAction<File[]>>;
    setBackgroundFrame: Dispatch<SetStateAction<string | null>>;
    setPrintCount: Dispatch<SetStateAction<number>>;
    setPublishToGuestbook: Dispatch<SetStateAction<boolean>>;
}

export const PhotoBoothContext = createContext<
  PhotoBoothContextType | undefined
>(undefined);
