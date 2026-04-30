import Heading from "../components/Heading";
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AI_PROGRESS } from "../constants/routes";

const STYLES = [
    {
        id: "watercolor",
        name: "수채화 & 아날로그",
        example: "(지브리 스타일)",
        thumbSrc: "/assets/styles/watercolor.png",
    },
    {
        id: "cartoon",
        name: "말랑 카툰",
        example: "(짱구 스타일)",
        thumbSrc: "/assets/styles/cartoon.png",
    },
    {
        id: "village",
        name: "포근한 마을 감성",
        example: "(동물의 숲 스타일)",
        thumbSrc: "/assets/styles/village.png",
    },
];

export default function CharacterSelect() {
    const navigate = useNavigate();
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

    const handleConfirm = () => {
        if (!selectedStyle) return;
        navigate(AI_PROGRESS, { state: { style: selectedStyle } });
    };

    return (
        <div className="flex flex-col items-center w-full">
            <Heading>변환할 AI 캐릭터 스타일을 선택해주세요</Heading>
            <div className="flex gap-10 justify-center mt-40 mb-40 w-full px-8">
                {STYLES.map((style) => {
                    const isSelected = selectedStyle === style.id;
                    return (
                        <div
                            key={style.id}
                            onClick={() => setSelectedStyle(style.id)}
                            className={[
                                "flex flex-col rounded-2xl overflow-hidden cursor-pointer",
                                "transition-all duration-200 hover:scale-[1.02]",
                                isSelected
                                    ? "ring-2 ring-primary-600 scale-[1.02]"
                                    : "",
                            ].join(" ")}
                            style={{
                                background: "white",
                                width: 300,
                                boxShadow: isSelected
                                    ? "0 0 0 4px #007ce020"
                                    : "0 1px 4px rgba(0,0,0,0.08)",
                            }}
                        >
                            <div
                                className="w-full relative"
                                style={{ height: 200 }}
                            >
                                <img
                                    src={style.thumbSrc}
                                    alt={style.name}
                                    className="w-full h-full object-cover"
                                />
                                {isSelected && (
                                    <div
                                        className="absolute top-2 right-2 flex items-center justify-center rounded-full"
                                        style={{
                                            width: 24,
                                            height: 24,
                                            background: "#007ce0",
                                        }}
                                    >
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                        >
                                            <path
                                                d="M2 6l3 3 5-5"
                                                stroke="#fff"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            <div className="px-4 py-3 flex flex-col items-center justify-center">
                                <p className="font-medium text-gray-800">
                                    {style.name}
                                </p>
                                <p className="text-sm text-gray-400">
                                    {style.example}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Button
                size="lg"
                onClick={handleConfirm}
                disabled={!selectedStyle}
            >
                선택 완료
            </Button>
        </div>
    );
}
