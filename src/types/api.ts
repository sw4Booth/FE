import type { Photo } from "./Photo";

export type PhotoUploadPayload = FormData;
export type PhotoUploadResponse = Photo;

interface PaginatedResponse<T> {
    content: T;
    totalPages: number;
    totalElements: number;
    size: number;
    page: number;
}

export type PhotosResponse = PaginatedResponse<Photo[]>;

export interface Guestbook {
    id: number;
    imageUrl: string;
    createdAt: string;
}

export type GuestbookResponse = PaginatedResponse<Guestbook[]>;

export interface GuestbookCreatePayload {
    photoId: number;
}

export type GuestbookCreateResponse = Guestbook;

export interface ShareLinkCreatePayload {
    photoId: number;
}

export interface ShareLinkCreateResponse {
    id: number;
    uuid: string;
    imageUrl: string;
    qrImageBase64: string;
}

export interface ShareLinkResponse {
    id: number;
    uuid: string;
    imageUrl: string;
    qrImageBase64: string;
}

export interface AuthPayload {
    password: string;
}

export interface AuthResponse {
    status: boolean;
}
