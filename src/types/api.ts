export interface PhotoUploadPayload {
    file: string;
}

export interface PhotoUploadResponse {
    id: number;
    imageUrl: string;
}

export interface GuestbookCreatePayload {
    photoId: number;
    message: string;
}

export interface GuestbookCreateResponse {
    id: number;
    imageUrl: string;
    message: string;
    createdAt: string;
}

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
