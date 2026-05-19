import type { FrameSkin } from "../types/Frame";

export const YellowFrame: FrameSkin = {
    decorations: (
        <img
            src={"/assets/frameImg/yellow.png"}
            alt="YellowFrame"
            className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
        />
    ),
};
