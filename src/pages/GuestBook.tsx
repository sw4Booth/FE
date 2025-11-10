import { useEffect, useState } from "react";
import type { Photo } from "../types/Photo";
import PhotoRow from "../components/guestbook/PhotoRow";

export default function GuestBook() {
    const [photos, setPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            // TODO: API 연동
            const mockPhotos: Photo[] = Array.from({ length: 20 }, (_, i) => ({
                id: `photo-${i}`,
                url: "/assets/frame_2x6.png"
            }));

            setPhotos(mockPhotos);
        };

        fetchPhotos();
    }, []);

    const row1Photos = photos.slice(0, 10);
    const row2Photos = photos.slice(10, 20);

    return (
        <div className="flex flex-col gap-4 w-full h-screen overflow-hidden">
            <PhotoRow photos={row1Photos} rowIndex={0} />
            <PhotoRow photos={row2Photos} rowIndex={1} />
        </div>
    );
}
