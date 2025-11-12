export type PhotoUploadPayload = FormData;

export interface PhotoUploadResponse {
    id: number;
    imageUrl: string;
}

export interface Guestbook {
    id: number;
    imageUrl: string;
    message: string;
    createdAt: string;
}

export interface GuestbookResponse {
    content: Guestbook[];
}

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
