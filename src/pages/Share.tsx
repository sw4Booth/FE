import { useParams } from "react-router";
import Heading from "../components/Heading";
import PhotoFrame from "../components/PhotoFrame";
import Button from "../components/Button";
import { useEffect } from "react";

export default function Share() {
    const { id } = useParams();

    // TODO: ID 통해 API 요청 보내서 이미지 받아오기
    useEffect(() => {
        console.log("id:", id);
    }, []);

    return (
        <div className="flex flex-col w-full h-full items-center gap-6">
            <Heading>로고 영역</Heading>
            <div className="flex grow">
                <PhotoFrame frameType="landscape" />
            </div>
            <Button variant="solid">사진 다운로드</Button>
        </div>
    );
}
