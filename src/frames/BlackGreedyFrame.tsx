import type { FrameSkin } from "../types/Frame";

export const BlackGreedyFrame: FrameSkin = {
    decorations: (
        <img
            src={`/assets/frameImg/blackGreedy.png`}
            alt="BlackGreedyFrame"
            className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
        />
    ),
};
