import type { FrameSkin } from "../types/Frame";

export const BasicBlackFrame: FrameSkin = {
    decorations: (
        <img
            src={"/assets/frameImg/basicBlack.png"}
            alt="BasicBlackFrame"
            className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
        />
    ),
};
