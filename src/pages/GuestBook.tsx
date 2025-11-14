import { useEffect, useState } from "react";
import type { Photo } from "../types/Photo";
import PhotoRow from "../components/guestbook/PhotoRow";
import { api } from "../libs/api";
import { API_GUESTBOOK } from "../constants/api";
import { type GuestbookResponse } from "../types/api";

const PER_PAGE_SIZE = 20;

export default function GuestBook() {
    const page = 0; // TODO: configurable
    const [photos, setPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            const { data } = await api.get<GuestbookResponse>(API_GUESTBOOK, { page, size: PER_PAGE_SIZE, sort: "createdAt,desc" });

            setPhotos(data.content);
        };

        fetchPhotos();
    }, []);

    const row1Photos = photos.slice(0, PER_PAGE_SIZE / 2);
    const row2Photos = photos.slice(PER_PAGE_SIZE / 2, PER_PAGE_SIZE);

    return (
        <div className="flex flex-col gap-4 w-full h-screen overflow-hidden">
            <PhotoRow photos={row1Photos} rowIndex={0} />
            <PhotoRow photos={row2Photos} rowIndex={1} />
        </div>
    );
}
