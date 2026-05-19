import type { FrameSkin } from "../types/Frame";

export const BlueFrame: FrameSkin = {
    decorations: (
        <img
            src={"/assets/frameImg/blue.png"}
            alt="BlueFrame"
            className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
        />
    ),
};
