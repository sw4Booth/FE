import { createContext } from "react";
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
  setFrameType: (frame: FrameType) => void;
  setCapturedPhotos: React.Dispatch<React.SetStateAction<File[]>>;
  setSelectedPhotos: (photos: File[]) => void;
  setBackgroundFrame: (frame: string) => void;
  setPrintCount: (count: number) => void;
  setPublishToGuestbook: (enabled: boolean) => void;
}

export const PhotoBoothContext = createContext<
  PhotoBoothContextType | undefined
>(undefined);
