import Button from "../components/Button";
import { useNavigate } from "react-router";
import { PRINT } from "../constants/routes";

export default function BackFrameSelect() {
    const navigate = useNavigate();
    return (
        <>
            <div>배경프레임선택</div>
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
