import type { FrameSkin } from "../types/Frame";

export const GreenFrame: FrameSkin = {
    decorations: (
        <img
            src={"/assets/frameImg/green.png"}
            alt="GreenFrame"
            className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
        />
    ),
};
