import { useEffect, useState } from "react";
import { api, clearAuthToken, setAuthToken } from "../libs/api";
import type { PhotosResponse, PrintQueueResponse, PrintJob } from "../types/api";
import { API_PHOTOS, API_PRINT_QUEUE } from "../constants/api";
import Button from "../components/Button";
import { SITE_BRANDING } from "../constants/constants";
import { ADMIN, ADMIN_LOGIN } from "../constants/routes";
import type { Photo } from "../types/Photo";
import { useNavigate } from "react-router";

const PER_PAGE_SIZE = 16;

export default function Admin() {
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState<string>("photos");
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [printJobs, setPrintJobs] = useState<PrintJob[]>([]);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const fetchPhotos = async () => {
        try {
            const { data } = await api.get<PhotosResponse>(API_PHOTOS, { page, size: PER_PAGE_SIZE });
            setPhotos(data.content);
            setTotalPages(data.totalPages);
        } catch (e) {
            console.error(e);
        }
    };

    const fetchPrintQueue = async () => {
        try {
            const { data } = await api.get<PrintQueueResponse>(API_PRINT_QUEUE);
            setPrintJobs(data);
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
        fetchPhotos();
    };

    const handlePrint = async (id: number) => {
        await api.post(`${API_PHOTOS}/${id}/print`);
        setModalOpen(false);
        alert("출력 요청이 완료되었습니다.");
    };

    const handleRetry = async (jobId: string) => {
        await api.post(`${API_PRINT_QUEUE}/${jobId}/retry`);
        fetchPrintQueue();
    };

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        clearAuthToken();
        navigate(ADMIN_LOGIN);
    };

    useEffect(() => {
        const saved = localStorage.getItem("admin_token");
        if (!saved) {
            navigate(ADMIN_LOGIN);
            return;
        }
        setAuthToken(saved);
        fetchPhotos();
    }, []);

    useEffect(() => {
        if (selectedMenu === "photos") fetchPhotos();
        if (selectedMenu === "print-queue") fetchPrintQueue();
    }, [selectedMenu]);

    useEffect(() => {
        fetchPhotos();
    }, [page]);

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-white text-primary-600 border-b border-gray-100 py-4 px-6 flex justify-between items-center">
                <a href={ADMIN} className="text-2xl font-bold">{SITE_BRANDING} 관리자</a>
                <Button variant="outline" color="gray" size="sm" onClick={handleLogout}>로그아웃</Button>
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
                            <li>
                                <a className="block px-4 py-2 rounded-lg font-semibold text-primary-600 hover:bg-gray-100 cursor-pointer data-[active=true]:bg-gray-100" onClick={() => setSelectedMenu("print-queue")} data-active={selectedMenu === "print-queue"}>
                                    프린트 큐
                                </a>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <main className="flex-1 p-6">
                    {selectedMenu === "photos" && (
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    사진 관리
                                    <span className="px-2 py-0.5 text-sm bg-primary-600 text-white rounded-lg">{photos.length ?? 0}</span>
                                </h2>
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
                                            <Button variant="outline" onClick={() => handlePrint(selectedPhoto.id)}>인쇄</Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {selectedMenu === "print-queue" && (
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    프린트 큐
                                    <span className="px-2 py-0.5 text-sm bg-primary-600 text-white rounded-lg">{printJobs.length ?? 0}</span>
                                </h2>
                                <Button variant="outline" color="gray" size="sm" onClick={fetchPrintQueue}>새로고침</Button>
                            </div>
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-left">
                                        <th className="p-3 border border-gray-100">Job ID</th>
                                        <th className="p-3 border border-gray-100">사진</th>
                                        <th className="p-3 border border-gray-100">상태</th>
                                        <th className="p-3 border border-gray-100">프린터</th>
                                        <th className="p-3 border border-gray-100">요청 시각</th>
                                        <th className="p-3 border border-gray-100">작업</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {printJobs.map((job) => (
                                        <tr key={job.id} className="border border-gray-100">
                                            <td className="p-3 font-mono text-xs">{job.id}</td>
                                            <td className="p-3">
                                                {job.imageUrl && (
                                                    <img src={job.imageUrl} className="w-12 h-12 object-cover rounded" />
                                                )}
                                            </td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${job.status === "completed" ? "bg-green-100 text-green-700" :
                                                    job.status === "printing" ? "bg-blue-100 text-blue-700" :
                                                        job.status === "failed" ? "bg-red-100 text-red-700" :
                                                            "bg-gray-100 text-gray-700"}`}>{job.status}</span>
                                            </td>
                                            <td className="p-3">{job.printerId ?? "-"}</td>
                                            <td className="p-3">{new Date(job.createdAt).toLocaleTimeString()}</td>
                                            <td className="p-3">
                                                {job.status === "failed" && (
                                                    <Button variant="outline" size="sm" onClick={() => handleRetry(job.id)}>재시도</Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {printJobs.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="p-6 text-center text-gray-400">대기 중인 작업이 없습니다.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
