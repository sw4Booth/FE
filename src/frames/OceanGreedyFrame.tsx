import type { FrameSkin } from "../types/Frame";

export const OceanGreedyFrame: FrameSkin = {
    bgColor: "#0477BF",
    decorations: (
        <img
            src={`/assets/frameImg/oceanGreedy.png`}
            alt="oceanGreedy"
            className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
        />
    ),
};
