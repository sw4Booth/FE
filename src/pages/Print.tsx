import { useEffect } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { usePhotoBooth } from "../hooks/usePhotoBooth";

const MAX_PRINT_COUNT = 4;

export default function Print() {
    const { printCount, shouldPublishToGuestbook, setPrintCount, setPublishToGuestbook } = usePhotoBooth();

    const handleCountDecrementClick = () => {
        setPrintCount((prev) => Math.max(1, prev - 1));
    };

    const handleCountIncrementClick = () => {
        setPrintCount((prev) => Math.min(MAX_PRINT_COUNT, prev + 1));
    };

    const handlePublishGuestbookClick = () => {
        setPublishToGuestbook(!shouldPublishToGuestbook);
    };

    useEffect(() => {
        console.log("printCount:", printCount);
        console.log("shouldPublishToGuestbook:", shouldPublishToGuestbook);
    }, [printCount, shouldPublishToGuestbook]);

    return (
        <div className="flex flex-col w-full h-full items-center gap-6">
            <Heading>사진 출력</Heading>
            <div className="flex flex-col items-center justify-center gap-12 w-[80%] h-[50%] mt-24 p-12 bg-primary-100 rounded-lg">
                <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold">출력 매수 선택</span>
                    <div className="flex items-center gap-4 bg-white p-1 rounded-full">
                        <button className="flex justify-center items-center p-1 w-8 h-8 rounded-full text-white bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:pointer-events-none cursor-pointer" onClick={handleCountDecrementClick} disabled={printCount <= 1}>-</button>
                        <span className="flex justify-center items-center text-lg w-8">{printCount}</span>
                        <button className="flex justify-center items-center p-1 w-8 h-8 rounded-full text-white bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:pointer-events-none cursor-pointer" onClick={handleCountIncrementClick} disabled={printCount >= MAX_PRINT_COUNT}>+</button>
                    </div>
                </div>
                <label className="flex items-center gap-3 cursor-pointer select-none group">
                    <input type="checkbox" checked={shouldPublishToGuestbook} onChange={handlePublishGuestbookClick} className="hidden" />
                    <div className="w-6 h-6 border-2 border-primary-600 rounded-md flex items-center justify-center group-has-checked:bg-primary-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white opacity-0 group-has-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                        </svg>
                    </div>
                    <span className="text-lg font-semibold">방명록에 등록하기</span>
                </label>
            </div>
            <Button size="lg">출력하기</Button>
        </div>
    );
}
