import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { api, setAuthToken } from "../libs/api";
import type { AuthResponse, AuthPayload } from "../types/api";
import { API_AUTH } from "../constants/api";
import { ADMIN } from "../constants/routes";
import Button from "../components/Button";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const { data } = await api.post<AuthResponse, AuthPayload>(API_AUTH, { password });

            setAuthToken(data.token);
            localStorage.setItem("admin_token", data.token);
            navigate(ADMIN);
        } catch (e) {
            console.error(e);
            alert("권한이 없습니다.");
        }
    };

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
