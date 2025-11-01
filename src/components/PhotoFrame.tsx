import type { FrameType } from "../types/FrameType";

interface Props {
    frameType: FrameType;
    className?: string;
    photos?: File[];
}

const PhotoFrame = ({ frameType, className, photos }: Props) => {
    const imgUrls = photos?.map((file) => URL.createObjectURL(file));

    console.log("PhotoFrame photos:", photos);

    return frameType === "landscape" ? (
        <svg
            className={["fill-primary-500", className].join(" ")}
            viewBox="0 0 600 1800"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlSpace="preserve"
            style={{
                fillRule: "evenodd",
                clipRule: "evenodd",
                strokeLinejoin: "round",
                strokeMiterlimit: 2,
            }}
        >
            <rect x="0" y="0" width="600" height="1800" />
            <g transform="matrix(1.12661,0,0,1.44222,-36.8562,-67.6914)">
                <rect
                    x="66"
                    y="73"
                    width="466"
                    height="260"
                    style={{ fill: "white" }}
                />
                {imgUrls![0] && (
                    <image
                        href={imgUrls![0]}
                        x="66"
                        y="73"
                        width="466"
                        height="260"
                        preserveAspectRatio="xMidYMid slice"
                    />
                )}
            </g>
            <g transform="matrix(1.12661,0,0,1.44222,-36.8562,344.717)">
                <rect
                    x="66"
                    y="73"
                    width="466"
                    height="260"
                    style={{ fill: "white" }}
                />
                {imgUrls![1] && (
                    <image
                        href={imgUrls![1]}
                        x="66"
                        y="73"
                        width="466"
                        height="260"
                        preserveAspectRatio="xMidYMid slice"
                    />
                )}
            </g>
            <g transform="matrix(1.12661,0,0,1.44222,-36.8562,757.069)">
                <rect
                    x="66"
                    y="73"
                    width="466"
                    height="260"
                    style={{ fill: "white" }}
                />
                {imgUrls![2] && (
                    <image
                        href={imgUrls![2]}
                        x="66"
                        y="73"
                        width="466"
                        height="260"
                        preserveAspectRatio="xMidYMid slice"
                    />
                )}
            </g>
            <g transform="matrix(1.12661,0,0,1.44222,-36.8562,1169.72)">
                <rect
                    x="66"
                    y="73"
                    width="466"
                    height="260"
                    style={{ fill: "white" }}
                />
                {imgUrls![3] && (
                    <image
                        href={imgUrls![3]}
                        x="66"
                        y="73"
                        width="466"
                        height="260"
                        preserveAspectRatio="xMidYMid slice"
                    />
                )}
            </g>
        </svg>
    ) : (
        <svg
            className={["fill-primary-500", className].join(" ")}
            viewBox="0 0 1200 1800"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlSpace="preserve"
            style={{
                fillRule: "evenodd",
                clipRule: "evenodd",
                strokeLinejoin: "round",
                strokeMiterlimit: 2,
            }}
        >
            <g transform="matrix(2,0,0,1,0,0)">
                <rect x="0" y="0" width="600" height="1800" />
            </g>
            <g transform="matrix(1.16521,0,0,3.0285,-39.4037,-183.489)">
                <rect
                    x="66"
                    y="73"
                    width="466"
                    height="260"
                    style={{ fill: "white" }}
                />
            </g>
            <g transform="matrix(1.16521,0,0,3.0285,542.529,-183.489)">
                <rect
                    x="66"
                    y="73"
                    width="466"
                    height="260"
                    style={{ fill: "white" }}
                />
            </g>
            <g transform="matrix(1.16521,0,0,3.0285,-39.4037,641.4)">
                <rect
                    x="66"
                    y="73"
                    width="466"
                    height="260"
                    style={{ fill: "white" }}
                />
            </g>
            <g transform="matrix(1.16521,0,0,3.0285,542.529,641.4)">
                <rect
                    x="66"
                    y="73"
                    width="466"
                    height="260"
                    style={{ fill: "white" }}
                />
            </g>
        </svg>
    );
};

export default PhotoFrame;
