import type { FrameSkin } from "../types/Frame";

export const PurpleFrame: FrameSkin = {
    decorations: (
        <img
            src={"/assets/frameImg/purple.png"}
            alt="PurpleFrame"
            className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
        />
    ),
};
