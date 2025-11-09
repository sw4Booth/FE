import type { FrameSkin } from "../types/Frame";

export const SpaceGreedyFrame: FrameSkin = {
    decorations: (
        <img
            src={`/assets/frameImg/spaceGreedy.png`}
            alt="spaceGreedy"
            className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
        />
    ),
};
