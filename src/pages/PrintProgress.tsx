import Heading from "../components/Heading";

export default function PrintProgress() {
    return (
        <div className="flex flex-col w-full h-full items-center">
            <Heading>사진 출력이 진행중입니다!</Heading>
            <div className="flex flex-col items-center justify-center gap-12 w-[80%] h-[50%] my-24 p-12 bg-primary-100 rounded-lg">
                <span>미리보기 영역</span>
            </div>
            <span className="text-2xl font-semibold text-primary-600">잠시만 기다려주세요..!</span>
        </div>
    );
}
