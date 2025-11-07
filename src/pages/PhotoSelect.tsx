import { useNavigate } from "react-router";
import Button from "../components/Button";
import Heading from "../components/Heading";
import PhotoFrame from "../components/PhotoFrame";
import { usePhotoBooth } from "../hooks/usePhotoBooth";
import { useMemo, useEffect } from "react";
import { FRAME_SKIN_SELECT } from "../constants/routes";

const PHOTO_SELECT_LIMIT = 4;

export default function PhotoSelect() {
    const { capturedPhotos, selectedPhotos, setSelectedPhotos } =
        usePhotoBooth();
    const navigate = useNavigate();

    const photoUrls = useMemo(() => {
        return capturedPhotos.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
    }, [capturedPhotos]);

    useEffect(() => {
        return () => {
            photoUrls.forEach(({ url }) => URL.revokeObjectURL(url));
        };
    }, [photoUrls]);

    const handlePhotoClick = (photo: File) => {
        const isExists = selectedPhotos.some(
            (p) =>
                p.name === photo.name && p.lastModified === photo.lastModified
        );

        if (isExists) {
            setSelectedPhotos((prev) =>
                prev.filter(
                    (p) =>
                        !(
                            p.name === photo.name &&
                            p.lastModified === photo.lastModified
                        )
                )
            );
        } else if (selectedPhotos.length < PHOTO_SELECT_LIMIT) {
            setSelectedPhotos((prev) => [...prev, photo]);
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <Heading>사진을 선택해주세요</Heading>
            <div className="flex w-full justify-center mt-10">
                <div className="mx-auto my-auto ml-20">
                    <PhotoFrame frameType="landscape" photos={selectedPhotos} />
                </div>
                <div className="w-[70%] my-auto mx-auto mr-20">
                    {photoUrls.length > 0 && (
                        <div className="grid grid-cols-4">
                            {photoUrls.map(({ file, url }, i) => {
                                const isSelected = selectedPhotos.some(
                                    (p) =>
                                        p.name === file.name &&
                                        p.lastModified === file.lastModified
                                );
                                return (
                                    <img
                                        key={i}
                                        src={url}
                                        alt={`photo-${i}`}
                                        onClick={() => handlePhotoClick(file)}
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
