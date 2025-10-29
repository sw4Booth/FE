import { useNavigate } from "react-router";
import Heading from "../components/Heading";

export default function Start() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-full h-full py-12 items-center justify-around">
            <Heading>로고 영역</Heading>
            <button className="text-white bg-primary-600 hover:bg-primary-500 font-medium rounded-full px-12 py-3 text-lg text-center cursor-pointer" onClick={() => navigate("/frame-type")}>시작하기</button>
        </div>
    );
}
