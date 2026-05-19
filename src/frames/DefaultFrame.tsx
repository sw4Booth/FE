import type { FrameSkin } from "../types/Frame";

export const DefaultFrame: FrameSkin = {
    decorations: (
        <img
            src={"/assets/frameImg/green.png"}
            alt="DefaultGreedyFrame"
            className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
        />
    ),
};
