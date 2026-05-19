import type { FrameSkin } from "../types/Frame";

export const BrownFrame: FrameSkin = {
    decorations: (
        <img
            src={"/assets/frameImg/brown.png"}
            alt="BrownFrame"
            className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
        />
    ),
};
