import { useEffect } from "react";

interface LightboxProps {
    src: string | null;
    onClose: () => void;
    actions?: React.ReactNode;
}

export default function Lightbox({ src, onClose, actions }: LightboxProps) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [onClose]);

    if (!src) return null;

    return (
        <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={onClose}
        >
            {actions ? (
                <div
                    className="bg-white rounded-xl p-4 flex flex-col items-center gap-4 max-w-[90vw]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={src}
                        className="max-h-[75vh] max-w-full object-contain rounded-lg"
                    />
                    <div className="flex gap-3">{actions}</div>
                </div>
            ) : (
                <div
                    className="max-w-[90vw] max-h-[90vh]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={src}
                        className="max-h-[90vh] max-w-full object-contain rounded-lg"
                    />
                </div>
            )}
        </div>
    );
}
