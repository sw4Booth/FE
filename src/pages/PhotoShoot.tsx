import Heading from "../components/Heading";
import { useEffect, useRef, useState } from "react";

export default function PhotoShoot() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentCount, setCurrentCount] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);

  const TOTAL_SHOTS = 8;
  const INTERVAL = 7000;

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error(err);
      }
    }

    async function startShooting() {
      for (let i = 0; i < TOTAL_SHOTS; i++) {
        await new Promise((res) => setTimeout(res, INTERVAL));
        takePhoto();
        setCurrentCount(i + 1);
      }
    }

    // setupCamera();
    // startShooting();

    return () => {
      //다음페이지로 넘어가면 종료
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d")!;
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL("image/png");
    setPhotos((prev) => [...prev, dataURL]);
  };

  return (
    <div className="flex flex-col w-full h-full items-center">
      <Heading>사진 촬영</Heading>
      <div>
        <div></div>
        <div></div>
      </div>
      <div className="w-[80%] aspect-[7/5] bg-gray-200">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover -scale-x-100"
        />
      </div>
    </div>
  );
}
