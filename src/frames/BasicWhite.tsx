import type { FrameSkin } from "../types/Frame";

export const BasicWhiteFrame: FrameSkin = {
    decorations: (
        <img
            src={"/assets/frameImg/basicWhite.png"}
            alt="BasicWhiteFrame"
            className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
        />
    ),
};
