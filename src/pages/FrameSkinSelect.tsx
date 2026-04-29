import Heading from "../components/Heading";
import PhotoFrame from "../components/PhotoFrame";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { CHARACTER_SELECT } from "../constants/routes";
import { usePhotoBooth } from "../hooks/usePhotoBooth";
import { DefaultFrame } from "../frames/DefaultFrame";
import { BlueFrame } from "../frames/BlueFrame";
import { YellowFrame } from "../frames/YellowFrame";
import { GreenFrame } from "../frames/GreenFrame";

const frameSkins = [DefaultFrame, BlueFrame, YellowFrame, GreenFrame];

export default function FrameSkinSelect() {
    const { selectedPhotos, selectedFrameSkin, setSelectedFrameSkin } =
        usePhotoBooth();
    const navigate = useNavigate();

    const handleFinishSelect = async () => {
        navigate(CHARACTER_SELECT);
    };

    return (
        <div className="flex flex-col items-center w-full h-full">
            <Heading>배경 프레임을 선택해주세요</Heading>
            <div className="flex flex-1 items-center justify-center gap-50 px-8 w-full">
                <div
                    className="relative overflow-hidden flex-shrink-0"
                    style={{ width: "288px", height: "432px" }}
                >
                    <div
                        style={{
                            transform: "scale(0.75)",
                            transformOrigin: "top left",
                        }}
                    >
                        <PhotoFrame
                            frameType={"ai"}
                            photos={selectedPhotos}
                            skin={selectedFrameSkin ?? undefined}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {frameSkins.map((skin, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedFrameSkin(skin)}
                            data-selected={selectedFrameSkin === skin}
                            className="relative cursor-pointer overflow-hidden transition-all duration-200
                            hover:opacity-80 data-[selected=true]:opacity-50"
                            style={{ width: "144px", height: "216px" }}
                        >
                            <div
                                style={{
                                    transform: "scale(0.375)",
                                    transformOrigin: "top left",
                                }}
                            >
                                <PhotoFrame
                                    frameType={"ai"}
                                    photos={[]}
                                    skin={skin}
                                />
                            </div>

                            {selectedFrameSkin === skin && (
                                <div className="absolute inset-0 flex items-center justify-center z-10 rounded-md">
                                    <img
                                        src="/assets/check.svg"
                                        alt="check"
                                        className="w-12 h-12"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Button size="lg" onClick={handleFinishSelect}>
                선택 완료
            </Button>
        </div>
    );
}
