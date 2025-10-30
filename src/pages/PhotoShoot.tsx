import Heading from "../components/Heading";
import { useEffect, useRef, useState } from "react";

export default function PhotoShoot() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentCount, setCurrentCount] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);

  const TOTAL_SHOTS = 8;
  const INTERVAL = 7000;

  const [remainingTime, setRemainingTime] = useState(INTERVAL / 1000);

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
        for (let t = INTERVAL / 1000; t > 0; t--) {
          setRemainingTime(t);
          await new Promise((res) => setTimeout(res, 1000));
        }

        takePhoto();
        setCurrentCount(i + 1);
      }
    }

    setupCamera();
    startShooting();

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
    <div className="flex flex-col w-full h-full items-center gap-2">
      <Heading>사진 촬영</Heading>
      <div className="flex w-[70%] justify-between items-center mt-5">
        <div className="bg-primary-600 text-white px-4 py-2 flex rounded-full text-sm font-semibold gap-2 items-center">
          <img src="/assets/camera.svg" alt="camera" />
          <span>
            {currentCount}/{TOTAL_SHOTS}
          </span>
        </div>
        <div className="flex bg-primary-600 text-white px-4 py-2 text-sm rounded-full font-semibold gap-2 items-center">
          <img src="/assets/timer.svg" alt="timer" />
          <span> 00:0{remainingTime}</span>
        </div>
      </div>
      <div className="w-[70%] aspect-[7/5] bg-gray-200 relative overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover -scale-x-100"
        />
      </div>

      {/* {photos.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mt-6">
          {photos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`photo-${i}`}
              className="aspect-[4/3] object-cover rounded-md border"
            />
          ))}
        </div>
      )} */}
    </div>
  );
}
