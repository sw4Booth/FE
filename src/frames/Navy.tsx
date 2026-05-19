import type { FrameSkin } from "../types/Frame";

export const NavyFrame: FrameSkin = {
    decorations: (
        <img
            src={"/assets/frameImg/navy.png"}
            alt="NavyFrame"
            className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
        />
    ),
};
