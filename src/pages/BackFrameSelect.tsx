import Heading from "../components/Heading";
import PhotoFrame from "../components/PhotoFrame";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { PRINT } from "../constants/routes";
import { usePhotoBooth } from "../hooks/usePhotoBooth";
import { CloudFrame } from "../frames/CloudeFrame";

export default function BackFrameSelect() {
    const { selectedPhotos, backgroundFrame, setBackgroundFrame } =
        usePhotoBooth();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center w-full">
            <Heading>배경 프레임을 선택해주세요</Heading>
            <div className="flex w-full justify-center mt-10">
                <div className="mx-auto my-auto ml-20">
                    <PhotoFrame
                        frameType="landscape"
                        photos={selectedPhotos}
                        skin={backgroundFrame ?? undefined}
                    />
                </div>
                <div className="w-[70%] my-auto mx-auto mr-20 bg-primary-100 scale-80">
                    <div
                        className="cursor-pointer"
                        onClick={() => setBackgroundFrame(CloudFrame)}
                    >
                        <PhotoFrame
                            frameType="landscape"
                            photos={[]}
                            skin={CloudFrame}
                        />
                    </div>
                </div>
            </div>
            <Button
                size="lg"
                onClick={() => navigate(PRINT)}
                // disabled={selectedPhotos.length < PHOTO_SELECT_LIMIT}
            >
                선택 완료
            </Button>
        </div>
    );
}
