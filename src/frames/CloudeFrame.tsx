import type { FrameSkin } from "../types/Frame";

export const CloudFrame: FrameSkin = {
    bgColor: "#b3e5fc", // 하늘색 배경
    decorations: (
        <>
            <img
                src="/assets/frameImg/cloud.png"
                alt="cloud"
                className="absolute top-[1in] left-[0.01in] w-[1in] opacity-90 pointer-events-none"
            />

            <img
                src="/assets/frameImg/cloud.png"
                alt="cloud"
                className="absolute bottom-[-0.4in] right-[-0.1in] w-[2.5in] opacity-90 pointer-events-none "
            />
        </>
    ),
};
