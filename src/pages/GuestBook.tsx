import { useEffect, useState } from "react";
import type { Photo } from "../types/Photo";
import PhotoRow from "../components/guestbook/PhotoRow";
import { api } from "../libs/api";
import { API_GUESTBOOK } from "../constants/api";
import { type GuestbookResponse } from "../types/api";

const PER_PAGE_SIZE = 16;
const SLIDE_INTERVAL = 8000; // 8s

export default function GuestBook() {
    const [currentPhotos, setCurrentPhotos] = useState<Photo[]>([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchPage = async (page: number) => {
        try {
            const { data } = await api.get<GuestbookResponse>(API_GUESTBOOK, {
                page,
                size: PER_PAGE_SIZE,
            });

            setTotalPages(data.totalPages);

            return data.content;
        } catch (e) {
            console.error("Failed to fetch guestbook photos:", e);
            return [];
        }
    };

    useEffect(() => {
        const init = async () => {
            const first = await fetchPage(0);
            setCurrentPhotos(first);
        };
        init();
    }, []);

    // 자동 슬라이드
    useEffect(() => {
        if (totalPages <= 1) return;

        const interval = setInterval(async () => {
            const nextPage = pageIndex + 1 >= totalPages ? 0 : pageIndex + 1;
            const data = await fetchPage(nextPage);
            setCurrentPhotos(data);
            setPageIndex(nextPage);
        }, SLIDE_INTERVAL);

        return () => clearInterval(interval);
    }, [pageIndex, totalPages]);

    return (
        <div className="flex flex-col gap-4 w-full h-screen overflow-hidden">
            <PhotoRow
                photos={currentPhotos.slice(0, PER_PAGE_SIZE / 2)}
                rowIndex={0}
            />
            <PhotoRow
                photos={currentPhotos.slice(PER_PAGE_SIZE / 2)}
                rowIndex={1}
            />
        </div>
    );
}
