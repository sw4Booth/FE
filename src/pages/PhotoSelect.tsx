import Heading from "../components/Heading";
import PhotoFrame from "../components/PhotoFrame";
import { usePhotoBooth } from "../hooks/usePhotoBooth";

export default function PhotoSelect() {
    const { capturedPhotos } = usePhotoBooth();
    console.log(capturedPhotos);
    return (
        <div className="flex flex-col items-center w-full gap-10">
            <Heading>사진을 선택해주세요</Heading>
            <div className="flex flex-row w-full">
                <div className="w-[30%]">
                    <PhotoFrame
                        frameType="landscape"
                        className="h-[70vh] mx-auto"
                    />
                </div>

                <div className="w-[65%] p-10 bg-primary-600">
                    {capturedPhotos.length > 0 && (
                        <div className="grid grid-cols-4">
                            {capturedPhotos.map((file, i) => (
                                <img
                                    key={i}
                                    src={URL.createObjectURL(file)}
                                    alt={`photo-${i}`}
                                    className="aspect-[7/5] object-cover rounded-md border"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
