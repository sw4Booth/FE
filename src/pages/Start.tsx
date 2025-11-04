import { useNavigate } from "react-router";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { FRAME_TYPE_SELECT } from "../constants/routes";

export default function Start() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-full h-full py-12 items-center justify-around">
            <Heading>로고 영역</Heading>
            <Button size="lg" onClick={() => navigate(FRAME_TYPE_SELECT)}>시작하기</Button>
        </div>
    );
}
