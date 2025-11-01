import Heading from "../components/Heading";
import PhotoFrame from "../components/PhotoFrame";
import { usePhotoBooth } from "../hooks/usePhotoBooth";

const PHOTO_SELECT_LIMIT = 4;

export default function PhotoSelect() {
    const { capturedPhotos } = usePhotoBooth();
    const { selectedPhotos, setSelectedPhotos } = usePhotoBooth();

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
            <div className="flex flex-row w-full justify-center mt-10">
                <div className="mx-auto my-auto ml-20">
                    <PhotoFrame frameType="landscape" className="h-[70vh]" />
                </div>

                <div className="w-[70%] my-auto mx-auto mr-20">
                    {capturedPhotos.length > 0 && (
                        <div className="grid grid-cols-4">
                            {capturedPhotos.map((file, i) => {
                                const isSelected = selectedPhotos.some(
                                    (p) =>
                                        p.name === file.name &&
                                        p.lastModified === file.lastModified
                                );
                                return (
                                    <img
                                        key={i}
                                        src={URL.createObjectURL(file)}
                                        alt={`photo-${i}`}
                                        onClick={() => handlePhotoClick(file)}
                                        className={`aspect-[7/5] object-cover p-0.5 cursor-pointer transition-all duration-200 ${
                                            isSelected
                                                ? "opacity-50"
                                                : "opacity-100 hover:opacity-80"
                                        }`}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <button className="flex items-end ml-auto mt-5 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg rounded-full mr-10">
                <img
                    src="/assets/next.svg"
                    alt="next"
                    className="w-[50px] h-[50px]"
                />
            </button>
        </div>
    );
}
