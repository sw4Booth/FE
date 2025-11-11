import Button from "../components/Button";
import Heading from "../components/Heading";
import { usePhotoBooth } from "../hooks/usePhotoBooth";
import { useNavigate } from "react-router";
import { PRINT_PROGRESS } from "../constants/routes";
import { api } from "../libs/api";
import { API_GUESTBOOK, API_SHARE_CREATE } from "../constants/api";
import { type GuestbookCreateResponse, type GuestbookCreatePayload, type ShareLinkCreateResponse, type ShareLinkCreatePayload } from "../types/api";
import { useEffect, useState } from "react";

const MAX_PRINT_COUNT = 4;

export default function Print() {
    const { printCount, shouldPublishToGuestbook, uploadedPhotoId, setPrintCount, setPublishToGuestbook } = usePhotoBooth();
    const [mergedDataUrl, setMergedDataUrl] = useState<string | null>(null);
    const navigate = useNavigate();

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
        if (!mergedDataUrl) return;

        window.print();

        if (shouldPublishToGuestbook) publishToGuestbook();

        navigate(PRINT_PROGRESS);
    }, [mergedDataUrl]);

    const handlePrintClick = async () => {
        try {
            const { data } = await api.post<ShareLinkCreateResponse, ShareLinkCreatePayload>(API_SHARE_CREATE, { photoId: uploadedPhotoId });

            const merged = await mergeImageWithQR(data.imageUrl, data.qrImageBase64);

            console.log(merged);

            setMergedDataUrl(merged);
        } catch (e) {
            console.error(e);
        }
    };

    const mergeImageWithQR = async (photoUrl: string, qrBase64: string) => {
        const photo = await loadImage(photoUrl);
        const qr = await loadImage(qrBase64);

        const canvas = document.createElement("canvas");
        canvas.width = photo.width;
        canvas.height = photo.height;

        const ctx = canvas.getContext("2d")!;

        ctx.drawImage(photo, 0, 0, canvas.width, canvas.height);

        // QR 오른쪽 아래 배치
        const qrSize = canvas.width * 0.15;
        const qrX = canvas.width - qrSize - 24;
        const qrY = canvas.height - qrSize - 24;

        ctx.drawImage(qr, qrX, qrY, qrSize, qrSize);

        return canvas.toDataURL("image/png");
    };

    const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.crossOrigin = "anonymous";
            image.onload = () => resolve(image);
            image.onerror = (e) => reject(e);
            image.src = src;
        });
    };

    const publishToGuestbook = async () => {
        try {
            const response = await api.post<GuestbookCreateResponse, GuestbookCreatePayload>(API_GUESTBOOK, { photoId: uploadedPhotoId, message: "" });

            if (response.code === 201) console.log("Successfully published photo to guestbook for id:", uploadedPhotoId);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <div className="flex flex-col w-full h-full items-center gap-6 print:hidden">
                <Heading>사진 출력</Heading>
                <div className="flex flex-col grow items-center justify-center gap-12 w-[70%] p-12 bg-primary-100 rounded-lg">
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
                <Button size="lg" onClick={handlePrintClick}>출력하기</Button>
            </div>
            {mergedDataUrl && (
                <div className="hidden print:flex justify-center items-center w-full h-full">
                    <img src={mergedDataUrl} className="print:w-[102mm] print:h-[154mm] print:object-contain" />
                    <img src={mergedDataUrl} className="print:w-[102mm] print:h-[154mm] print:object-contain" />
                </div>
            )}
        </>
    );
}
