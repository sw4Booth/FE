import type { FrameSkin } from "../types/Frame";

export const OceanGreedyFrame: FrameSkin = {
    bgColor: "#0477BF",
    decorations: (
        <>
            <img
                src={`/assets/frameImg/oceanGreedy/finish.png`}
                alt="finish"
                className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
            />
            {/* {[
                "bubble1",
                "bubble2",
                "bubble3",
                "bubble4",
                "bubble5",
                "bubble6",
                "bubble7",
                "clam",
                "fish1",
                "fish2",
                "oceanGreeny",
                "octopus",
                "seaweed",
                "starfish",
                "title",
                "whale",
            ].map((name, i) => (
                <img
                    key={i}
                    src={`/assets/frameImg/oceanGreedy/${name}.png`}
                    alt={name}
                    className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
                />
            ))} */}
        </>
    ),
};
