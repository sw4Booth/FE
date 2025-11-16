import { useNavigate } from "react-router";
import Heading from "../components/Heading";
import { START } from "../constants/routes";
import { useEffect } from "react";
import { usePhotoBooth } from "../hooks/usePhotoBooth";

const NAVIGATE_DELAY = 15000;

export default function PrintProgress() {
    const { qrImage } = usePhotoBooth();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(START);
        }, NAVIGATE_DELAY);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col w-full h-full items-center gap-6">
            <Heading>사진 출력이 진행중입니다!</Heading>
            <div className="flex flex-col grow items-center justify-center gap-8 w-[70%] p-12 bg-gray-100 rounded-lg">
                <img className="overflow-hidden rounded-lg" src={qrImage} />
                <span className="bg-primary-600 text-white px-6 py-3 rounded-full font-semibold">사진 다운로드 QR</span>
            </div>
            <span className="text-2xl font-medium text-primary-600">잠시만 기다려주세요...</span>
        </div>
    );
}
