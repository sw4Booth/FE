import Heading from "../components/Heading";
import PhotoFrame from "../components/PhotoFrame";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { PRINT } from "../constants/routes";
import { usePhotoBooth } from "../hooks/usePhotoBooth";
import { CloudFrame, CloudFrame2, CloudFrame3 } from "../frames/CloudFrame";
import { DefaultFrame } from "../frames/DefaultFrame";
import { OceanGreedyFrame } from "../frames/OceanGreedyFrame";
import { SpaceGreedyFrame } from "../frames/SpaceGreedyFrame";

export default function FrameSkinSelect() {
    const { selectedPhotos, selectedFrameSkin, setSelectedFrameSkin } =
        usePhotoBooth();
    const navigate = useNavigate();

    const frameSkins = [
        DefaultFrame,
        OceanGreedyFrame,
        SpaceGreedyFrame,
        CloudFrame,
        CloudFrame2,
        CloudFrame3,
    ];

    return (
        <div className="flex flex-col items-center w-full">
            <Heading>배경 프레임을 선택해주세요</Heading>
            <div className="flex w-full justify-center mt-10">
                <div className="mx-auto my-auto ml-20">
                    <PhotoFrame
                        frameType="landscape"
                        photos={selectedPhotos}
                        skin={selectedFrameSkin ?? undefined}
                    />
                </div>

                <div className="w-[80%] my-auto mx-auto mr-20 scale-80 flex justify-start gap-8 overflow-x-auto overflow-y-hidden">
                    {frameSkins.map((skin, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedFrameSkin(skin)}
                            data-selected={selectedFrameSkin === skin}
                            className="cursor-pointer transition-all duration-200 
                            hover:opacity-80 data-[selected=true]:opacity-50"
                        >
                            <PhotoFrame
                                frameType="landscape"
                                photos={[]}
                                skin={skin}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Button size="lg" onClick={() => navigate(PRINT)}>
                선택 완료
            </Button>
        </div>
    );
}
