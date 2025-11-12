import { useParams } from "react-router";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { API_SHARE } from "../constants/api";
import { api } from "../libs/api";
import { type ShareLinkResponse } from "../types/api";
import axios from "axios";

export default function Share() {
    const { id } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [photoUrl, setPhotoUrl] = useState("");

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const response = await api.get<ShareLinkResponse>(`${API_SHARE}/${id}`);
                setPhotoUrl(response.data.imageUrl);
            } catch (e) {
                setError(true);
                console.error("Failed to fetch photo with id:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchPhoto();
    }, [id]);

    const handleClickDownload = async () => {
        try {
            const { data } = await axios.get(photoUrl, { responseType: "blob", headers: { "Cache-Control": "no-cache" } });
            const url = URL.createObjectURL(data);

            const link = document.createElement("a");
            link.href = url;
            link.download = "photobooth.png";
            link.click();

            URL.revokeObjectURL(url);
        } catch (e) {
            console.error("Failed to download image:", e);
        }
    };

    if (isLoading) {
        return (
            <></>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <h2 className="text-xl font-bold mb-2">사진을 찾을 수 없습니다.</h2>
                <p className="text-gray-500">링크가 만료되었거나 잘못된 주소일 수 있습니다.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full h-full min-h-0 items-center gap-6">
            <Heading>로고 영역</Heading>
            <div className="flex flex-col h-full min-h-0">
                <div className="flex grow min-h-0 items-center justify-center">
                    <img className="h-full w-auto object-contain" src={photoUrl} />
                </div>
            </div>
            <Button variant="solid" onClick={handleClickDownload}>사진 다운로드</Button>
        </div>
    );
}
