import Heading from "../components/Heading";
import { useEffect, useRef, useState } from "react";
import { usePhotoBooth } from "../hooks/usePhotoBooth";
import { useNavigate } from "react-router";
import { PHOTO_SELECT } from "../constants/routes";

const TOTAL_SHOTS = 8;
const SHOOT_INTERVAL = 5000;

export default function PhotoShoot() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [currentCount, setCurrentCount] = useState(0);
    const { setCapturedPhotos, setShootingVideoUrl } = usePhotoBooth();
    const [remainingTime, setRemainingTime] = useState(SHOOT_INTERVAL);
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState<number | null>(null);
    const [flash, setFlash] = useState(false);
    const timeLeft = useRef(SHOOT_INTERVAL);
    const timer = useRef<number | null>(null);
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const recordedChunks = useRef<Blob[]>([]);

    function stopCamera() {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = (
                videoRef.current.srcObject as MediaStream
            ).getTracks();
            tracks.forEach((track) => track.stop());
        }
    }

    function stopRecording() {
        if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
            mediaRecorder.current.stop();
        }
    }

    useEffect(() => {
        async function setupCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }

                recordedChunks.current = [];
                const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
                recorder.ondataavailable = (e) => {
                    if (e.data.size > 0) recordedChunks.current.push(e.data);
                };
                recorder.onstop = () => {
                    const blob = new Blob(recordedChunks.current, { type: "video/webm" });
                    setShootingVideoUrl(URL.createObjectURL(blob));
                };
                mediaRecorder.current = recorder;
                recorder.start();
            } catch (err) {
                console.error(err);
            }
        }

        async function startShooting() {
            timer.current = window.setInterval(() => {
                timeLeft.current -= 1000;
                setRemainingTime(timeLeft.current);

                if (timeLeft.current <= 3000 && timeLeft.current > 0) {
                    const seconds = Math.ceil(timeLeft.current / 1000);
                    setCountdown(seconds);
                }

                if (timeLeft.current <= 0) {
                    takePhoto();
                    setCurrentCount((prev) => {
                        const newCount = prev + 1;
                        if (newCount >= TOTAL_SHOTS) {
                            clearInterval(timer.current!);
                            stopRecording();
                            stopCamera();
                            navigate(PHOTO_SELECT);
                        }
                        return newCount;
                    });

                    timeLeft.current = SHOOT_INTERVAL;
                    setRemainingTime(SHOOT_INTERVAL);
                    setCountdown(null);
                }
            }, 1000);
        }

        setupCamera();
        startShooting();

        return () => {
            if (timer.current) clearInterval(timer.current);
            stopRecording();
            stopCamera();
        };
    }, [navigate]);

    const takePhoto = () => {
        setFlash(true);
        setTimeout(() => setFlash(false), 150);

        const video = videoRef.current;
        if (!video) return;

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d")!;
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL("image/webp");

        setCapturedPhotos((prev) => [...prev, dataUrl]);
    };

    const handleClickedShot = () => {
        takePhoto();

        setCurrentCount((prev) => {
            const newCount = prev + 1;
            if (newCount >= TOTAL_SHOTS) {
                clearInterval(timer.current!);
                stopRecording();
                stopCamera();
                navigate(PHOTO_SELECT);
            }
            return newCount;
        });

        timeLeft.current = SHOOT_INTERVAL;
        setRemainingTime(SHOOT_INTERVAL);
        setCountdown(null);
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
                    <span>{Math.ceil(remainingTime / 1000)}초</span>
                </div>
            </div>
            <div
                className="w-[70%] aspect-[7/5] bg-gray-200 relative overflow-hidden"
                onClick={() => handleClickedShot()}
            >
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover -scale-x-100"
                />

                {flash && (
                    <div className="absolute inset-0 bg-white animate-flash" />
                )}

                {countdown && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-9xl font-extrabold animate-ping-slow">
                        {countdown}
                    </div>
                )}
            </div>
        </div>
    );
}
