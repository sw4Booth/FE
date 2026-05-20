import type { FrameSkin } from "../types/Frame";

export const VintageFrame: FrameSkin = {
    decorations: (
        <img
            src={"/assets/frameImg/vintage.png"}
            alt="VintageFrame"
            className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
        />
    ),
};
