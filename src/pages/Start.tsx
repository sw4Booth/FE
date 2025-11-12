import { useNavigate } from "react-router";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { FRAME_TYPE_SELECT } from "../constants/routes";
import { SITE_BRANDING } from "../constants/constants";

export default function Start() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-full h-full py-12 items-center justify-around">
            <div className="flex items-center gap-6">
                <img className="w-20 h-auto" src="/assets/greeny.png" style={{ filter: "brightness(0) saturate(100%) invert(22%) sepia(61%) saturate(2792%) hue-rotate(150deg) brightness(99%) contrast(105%)" }} />
                <Heading>{SITE_BRANDING}</Heading>
            </div>
            <Button size="lg" onClick={() => navigate(FRAME_TYPE_SELECT)}>시작하기</Button>
        </div>
    );
}
