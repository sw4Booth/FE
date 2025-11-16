import { useEffect, useState, type FormEvent } from "react";
import { api } from "../libs/api";
import { type AuthResponse, type AuthPayload, type PhotosResponse } from "../types/api";
import { API_AUTH, API_PHOTOS } from "../constants/api";
import Button from "../components/Button";
import { SITE_BRANDING } from "../constants/constants";
import { ADMIN } from "../constants/routes";
import type { Photo } from "../types/Photo";

const PER_PAGE_SIZE = 16;

export default function Admin() {
    const [isAuthorized, setAuthorized] = useState(false);
    const [password, setPassword] = useState("");
    const [selectedMenu, setSelectedMenu] = useState<string>("photos");
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const { data } = await api.post<AuthResponse, AuthPayload>(API_AUTH, { password });

            if (data.status) setAuthorized(true);
        } catch (e) {
            console.error(e);
            alert("권한이 없습니다.");
        }
    };

    const fetchPhotos = async () => {
        try {
            const { data } = await api.get<PhotosResponse>(API_PHOTOS, { page, size: PER_PAGE_SIZE, sort: "createdAt,desc" });

            setPhotos(data.content);
            setTotalPages(data.totalPages);
        } catch (e) {
            console.error(e);
        }
    };

    const handlePhotoClick = (item: Photo) => {
        setSelectedPhoto(item);
        setModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("정말 삭제하시겠습니까?")) return;

        await api.delete(`${API_PHOTOS}/${id}`);

        setModalOpen(false);
        fetchPhotos(); // refresh
    };

    useEffect(() => {
        if (selectedMenu === "photos") {
            fetchPhotos();
        }
    }, [selectedMenu]);

    useEffect(() => {
        fetchPhotos();
    }, [page]);

    if (!isAuthorized) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="flex flex-col bg-white p-8 rounded-lg shadow-sm w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center text-primary-600">관리자 로그인</h2>
                    <form className="flex flex-col" onSubmit={handleLogin}>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-100 rounded-lg mb-4 focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호 입력"
                        />
                        <Button type="submit">로그인</Button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-white text-primary-600 border-b border-gray-100 py-4 px-6">
                <a href={ADMIN} className="text-2xl font-bold">{SITE_BRANDING} 관리자</a>
            </header>
            <div className="flex flex-1">
                <aside className="w-48 bg-gray-50 border-r border-gray-100 p-6">
                    <nav className="space-y-4">
                        <h2 className="text-md text-gray-500 mb-2">메뉴</h2>
                        <ul className="space-y-2">
                            <li>
                                <a className="block px-4 py-2 rounded-lg font-semibold text-primary-600 hover:bg-gray-100 cursor-pointer data-[active=true]:bg-gray-100" onClick={() => setSelectedMenu("photos")} data-active={selectedMenu === "photos"}>
                                    사진 관리
                                </a>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <main className="flex-1 p-6">
                    {selectedMenu === "photos" && (
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold">사진 관리</h2>
                                <div className="flex items-center justify-center gap-4">
                                    <Button variant="outline" color="gray" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)}>이전</Button>
                                    <span className="text-gray-700 text-lg">{page + 1} / {totalPages}</span>
                                    <Button variant="outline" color="gray" size="sm" disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>다음</Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-8 gap-4">
                                {photos.map((item) => (
                                    <div
                                        key={item.id}
                                        className="w-full cursor-pointer"
                                        onClick={() => handlePhotoClick(item)}
                                    >
                                        <img
                                            src={item.imageUrl}
                                            alt="photo"
                                            className="w-full object-contain rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                            {isModalOpen && selectedPhoto && (
                                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                    <div className="bg-white p-6 rounded-lg w-[320px]">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-semibold">작업 선택</h3>
                                            <span className="flex items-center justify-center w-6 h-6 p-4 hover:bg-gray-50 rounded-lg cursor-pointer" onClick={() => setModalOpen(false)}>X</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <Button variant="solid" onClick={() => handleDelete(selectedPhoto.id)}>삭제</Button>
                                            {/* <Button variant="outline">인쇄</Button> */}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
