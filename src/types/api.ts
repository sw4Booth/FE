import type { Photo } from "./Photo";

export type PhotoUploadPayload = FormData;
export type PhotoUploadResponse = Photo;

interface PaginatedResponse<T> {
    content: T;
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    empty: boolean;
}

export type PhotosResponse = PaginatedResponse<Photo[]>;

export interface Guestbook {
    id: number;
    imageUrl: string;
    message: string;
    createdAt: string;
}

export type GuestbookResponse = PaginatedResponse<Guestbook[]>;

export interface GuestbookCreatePayload {
    photoId: number;
    message: string;
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
