import Heading from "../components/Heading";
import PhotoFrame from "../components/PhotoFrame";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { CHARACTER_SELECT } from "../constants/routes";
import { usePhotoBooth } from "../hooks/usePhotoBooth";
import { DefaultFrame } from "../frames/DefaultFrame";
import { BlackFrame } from "../frames/BlackFrame";

const frameSkins = [DefaultFrame, BlackFrame];

export default function FrameSkinSelect() {
    const { selectedPhotos, selectedFrameSkin, setSelectedFrameSkin } =
        usePhotoBooth();
    const navigate = useNavigate();

    const handleFinishSelect = async () => {
        navigate(CHARACTER_SELECT);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <Heading>배경 프레임을 선택해주세요</Heading>
            <div className="flex w-full justify-center mt-10">
                <div className="mx-auto my-auto ml-20">
                    <PhotoFrame
                        frameType={"ai"}
                        photos={selectedPhotos}
                        skin={selectedFrameSkin ?? undefined}
                    />
                </div>

                <div className="w-[80%] my-auto mx-auto scale-60 flex justify-center gap-5 overflow-x-auto overflow-y-hidden">
                    {frameSkins.map((skin, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedFrameSkin(skin)}
                            data-selected={selectedFrameSkin === skin}
                            className="relative cursor-pointer transition-all duration-200 
                            hover:opacity-80 data-[selected=true]:opacity-50"
                        >
                            <PhotoFrame
                                frameType={"ai"}
                                photos={[]}
                                skin={skin}
                            />

                            {selectedFrameSkin === skin && (
                                <div className="absolute inset-0 flex items-center justify-center z-10 rounded-md">
                                    <img
                                        src="/assets/check.svg"
                                        alt="check"
                                        className="w-25 h-25"
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
