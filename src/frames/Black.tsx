import type { FrameSkin } from "../types/Frame";

export const BlackFrame: FrameSkin = {
    decorations: (
        <img
            src={"/assets/frameImg/black.png"}
            alt="BlackFrame"
            className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
        />
    ),
};
