import { motion } from "motion/react";
import type { Photo } from "../../types/Photo";

interface Props {
    photo: Photo;
    index: number;
    rowIndex: number;
    totalSize: number;
}

const PhotoStrip = ({ photo, index, rowIndex, totalSize }: Props) => {
    const baseRotation = (index % 2 === 0 ? -1 : 1) * (Math.random() * 3 + 1);
    const swingAmount = Math.random() * 4 + 2;

    const delay = (rowIndex * 6 + index) * 0.1;

    // rope 위치에 따른 이미지 y 위치 계산
    const t = (index + 1) / (totalSize + 1);
    const ropeY = 2 * (1 - t) * t * 15;
    const ropeHeight = 128;
    const yOffset = (ropeY / 15) * ropeHeight;

    return (
        <motion.div className="relative" style={{ top: `${yOffset}px` }} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay, type: "spring", damping: 10, stiffness: 100 }}>
            <motion.div className="relative flex flex-col items-center" style={{ transformOrigin: "top center" }} animate={{ rotate: baseRotation + swingAmount }}
                transition={{
                    duration: 4 + index * 0.3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
                initial={{ rotate: baseRotation - swingAmount }}
            >
                <div className="relative -translate-y-3 z-10">
                    <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
                        <rect x="11" y="0" width="10" height="28" rx="2" fill="#d4a574" />
                        <rect x="12" y="2" width="8" height="24" rx="1" fill="#e8b887" />
                    </svg>
                </div>
                <div className="relative -mt-6 w-[180px] z-0">
                    <img src={photo.imageUrl} alt={`strip-${photo.id}`} className="w-full h-auto shadow-xl pointer-events-none" />
                </div>
            </motion.div>
        </motion.div >
    );
};

export default PhotoStrip;
