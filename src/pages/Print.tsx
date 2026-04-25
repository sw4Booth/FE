import Button from "../components/Button";
import Heading from "../components/Heading";
import { usePhotoBooth } from "../hooks/usePhotoBooth";
import { useNavigate } from "react-router";
import { PRINT_PROGRESS } from "../constants/routes";
import { api } from "../libs/api";
import { API_GUESTBOOK, API_SHARE } from "../constants/api";
import { type GuestbookCreateResponse, type GuestbookCreatePayload, type ShareLinkCreateResponse, type ShareLinkCreatePayload } from "../types/api";
import { useEffect, useState } from "react";

const MAX_PRINT_COUNT = 4;

export default function Print() {
    const { printCount, shouldPublishToGuestbook, uploadedPhotoId, setPrintCount, setPublishToGuestbook, setQrImage } = usePhotoBooth();
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
            const { data } = await api.post<ShareLinkCreateResponse, ShareLinkCreatePayload>(API_SHARE, { photoId: uploadedPhotoId });

            setQrImage(data.qrImageBase64);
            const merged = await mergeImageWithQR(data.imageUrl, data.qrImageBase64);

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
        const qrSize = canvas.width * 0.2;
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
            const response = await api.post<GuestbookCreateResponse, GuestbookCreatePayload>(API_GUESTBOOK, { photoId: uploadedPhotoId });

            if (response.code === 201) console.log("Successfully published photo to guestbook for id:", uploadedPhotoId);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <div className="flex flex-col w-full h-full items-center gap-6 print:hidden">
                <Heading>사진 출력</Heading>
                <div className="flex flex-col grow items-center justify-center gap-12 w-[70%] p-12 bg-gray-100 rounded-lg">
                    <div className="flex items-center gap-4">
                        <span className="text-lg font-semibold">출력 매수 선택</span>
                        <div className="flex items-center gap-4 bg-white p-1 rounded-full">
                            <button className="flex justify-center items-center p-1 w-8 h-8 rounded-full text-white bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:pointer-events-none cursor-pointer" onClick={handleCountDecrementClick} disabled>-</button>
                            <span className="flex justify-center items-center text-lg w-8">{printCount}</span>
                            <button className="flex justify-center items-center p-1 w-8 h-8 rounded-full text-white bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:pointer-events-none cursor-pointer" onClick={handleCountIncrementClick} disabled>+</button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 border-2 border-primary-600 rounded-full">
                        <svg className="stroke-primary-600" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 7.99995C18.7956 7.99995 19.5587 8.31602 20.1213 8.87863C20.6839 9.44124 21 10.2043 21 11C21 11.7956 20.6839 12.5587 20.1213 13.1213C19.5587 13.6839 18.7956 14 18 14M10 7.99995V19C10 19.2652 9.89464 19.5195 9.70711 19.7071C9.51957 19.8946 9.26522 20 9 20H8C7.73478 20 7.48043 19.8946 7.29289 19.7071C7.10536 19.5195 7 19.2652 7 19V14M12 7.99995L16.524 4.22995C16.6555 4.12046 16.8154 4.0507 16.9851 4.02885C17.1548 4.00701 17.3271 4.03398 17.482 4.1066C17.6369 4.17922 17.7679 4.29449 17.8597 4.4389C17.9514 4.5833 18.0001 4.75087 18 4.92195V17.0779C18.0001 17.249 17.9514 17.4166 17.8597 17.561C17.7679 17.7054 17.6369 17.8207 17.482 17.8933C17.3271 17.9659 17.1548 17.9929 16.9851 17.971C16.8154 17.9492 16.6555 17.8794 16.524 17.7699L12 13.9999H4C3.73478 13.9999 3.48043 13.8946 3.29289 13.7071C3.10536 13.5195 3 13.2652 3 12.9999V8.99995C3 8.73473 3.10536 8.48038 3.29289 8.29284C3.48043 8.1053 3.73478 7.99995 4 7.99995H12Z" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-primary-600 font-semibold text-lg">원활한 현장 운영을 위해 사진 출력은 2장으로 제한됩니다!</span>
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
                <Button size="lg" onClick={handlePrintClick} disabled={uploadedPhotoId === -1}>출력하기</Button>
            </div>
            {mergedDataUrl && (
                <div className="hidden print:flex justify-center items-center w-full h-full">
                    <img src={mergedDataUrl} className="mb-[1mm] print:w-[102mm] print:h-[150mm] print:object-contain" />
                    <img src={mergedDataUrl} className="mb-[1mm] print:w-[102mm] print:h-[150mm] print:object-contain" />
                </div>
            )}
        </>
    );
}
