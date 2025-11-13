import { forwardRef } from "react";
import type { FrameType, FrameSkin } from "../types/Frame";

interface Props {
    frameType: FrameType;
    photos?: string[];
    skin?: FrameSkin;
}

const PHOTO_COUNT = 4;

const PhotoFrame = forwardRef<HTMLDivElement, Props>(({ frameType, photos = [], skin }, ref) => {
    return (
        <div
            ref={ref}
            className={[
                "flex",
                "flex-col",
                "relative",
                frameType === "landscape" ? "w-[2in]" : "w-[4in]",
                "h-[6in]",
                "p-[0.125in]",
                "gap-[0.0625in]",
                "bg-primary-600",
            ].join(" ")}
            style={{ backgroundColor: skin?.bgColor }}
        >
            {frameType === "landscape" ? (
                // 2x6
                Array.from({ length: PHOTO_COUNT }).map((_, i) => (
                    <div
                        key={i}
                        className="w-[1.75in] h-[1.25in] bg-white overflow-hidden"
                    >
                        {photos[i] ? (
                            <img
                                src={photos[i]}
                                alt={`photo-${i}`}
                                className="w-full h-full object-cover block"
                            />
                        ) : (
                            <div className="w-full h-full bg-white" />
                        )}
                    </div>
                ))
            ) : (
                // 4x6
                <div className="grid grid-cols-[repeat(2,1.84375in)] grid-rows-[repeat(2,2.6875in)] gap-[0.0625in]">
                    {Array.from({ length: PHOTO_COUNT }).map((_, i) => (
                        <div key={i} className="bg-white overflow-hidden">
                            {photos[i] ? (
                                <img
                                    src={photos[i]}
                                    alt={`photo-${i}`}
                                    className="w-full h-full object-cover block"
                                />
                            ) : (
                                <div className="w-full h-full bg-white" />
                            )}
                        </div>
                    ))}
                </div>
            )}
            {skin?.decorations}
        </div>
    );
});

export default PhotoFrame;
