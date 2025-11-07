import Heading from "../components/Heading";
import PhotoFrame from "../components/PhotoFrame";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { PRINT } from "../constants/routes";
import { usePhotoBooth } from "../hooks/usePhotoBooth";

export default function BackFrameSelect() {
    const { selectedPhotos } = usePhotoBooth();
    const navigate = useNavigate();

    return (
        <>
            <Heading>배경 프레임을 선택해주세요</Heading>
            <div className="mx-auto my-auto ml-20">
                <PhotoFrame frameType="landscape" photos={selectedPhotos} />
            </div>
            <Button
                size="lg"
                onClick={() => navigate(PRINT)}
                // disabled={selectedPhotos.length < PHOTO_SELECT_LIMIT}
            >
                선택 완료
            </Button>
        </>
    );
}
