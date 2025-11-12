import { useNavigate } from "react-router";
import Button from "../components/Button";
import Heading from "../components/Heading";
import PhotoFrame from "../components/PhotoFrame";
import { usePhotoBooth } from "../hooks/usePhotoBooth";
import { FRAME_SKIN_SELECT } from "../constants/routes";
import { DefaultFrame } from "../frames/DefaultFrame";

const PHOTO_SELECT_LIMIT = 4;

export default function PhotoSelect() {
    const { capturedPhotos, selectedPhotos, setSelectedPhotos } =
        usePhotoBooth();
    const navigate = useNavigate();

    const handlePhotoClick = (photo: string) => {
        const isExists = selectedPhotos.includes(photo);

        if (isExists) {
            setSelectedPhotos((prev) => prev.filter((p) => p !== photo));
        } else if (selectedPhotos.length < PHOTO_SELECT_LIMIT) {
            setSelectedPhotos((prev) => [...prev, photo]);
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <Heading>사진을 선택해주세요</Heading>
            <div className="flex w-full justify-center mt-10">
                <div className="mx-auto my-auto ml-20">
                    <PhotoFrame
                        frameType="landscape"
                        photos={selectedPhotos}
                        skin={DefaultFrame}
                    />
                </div>
                <div className="w-[70%] my-auto mx-auto mr-20">
                    {capturedPhotos.length > 0 && (
                        <div className="grid grid-cols-4">
                            {capturedPhotos.map((photo, i) => {
                                const isSelected =
                                    selectedPhotos.includes(photo);

                                return (
                                    <img
                                        key={i}
                                        src={photo}
                                        alt={`photo-${i}`}
                                        onClick={() => handlePhotoClick(photo)}
                                        data-selected={isSelected}
                                        className="aspect-[7/5] object-cover p-0.5 cursor-pointer transition-all duration-200 
                                        hover:opacity-80 data-[selected=true]:opacity-50"
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <Button
                size="lg"
                onClick={() => navigate(FRAME_SKIN_SELECT)}
                disabled={selectedPhotos.length < PHOTO_SELECT_LIMIT}
            >
                선택 완료
            </Button>
        </div>
    );
}
