import type { Photo } from "../../types/Photo";
import PhotoStrip from "./PhotoStrip";

interface Props {
    photos: Photo[];
    rowIndex: number;
}

const PhotoRow = ({ photos, rowIndex }: Props) => {
    return (
        <div className="relative w-full h-[500px]">
            <svg className="absolute left-1/2 top-0 h-32 -translate-x-1/2 w-[calc(100%+12rem)] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 15">
                <path d="M 0,0 Q 50,15 100,0" stroke="#4a3f35" strokeWidth="0.3" fill="none" strokeLinecap="round" />
                <path d="M 0,0.2 Q 50,15.2 100,0.2" stroke="#5c4f42" strokeWidth="0.2" fill="none" strokeLinecap="round" opacity="0.7" />
            </svg>
            <div className="flex justify-around items-start absolute top-0 left-0 w-full h-full">
                {photos.map((photo, index) => (
                    <PhotoStrip key={photo.id} photo={photo} index={index} rowIndex={rowIndex} totalSize={photos.length} />
                ))}
            </div>
        </div>
    );
};

export default PhotoRow;
