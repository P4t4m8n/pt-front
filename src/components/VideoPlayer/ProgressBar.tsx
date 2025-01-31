import { useEffect, useState } from "react";

interface Props {
  videoRef: React.RefObject<HTMLVideoElement>;
}

export default function ProgressBar({ videoRef }: Props) {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const video = videoRef.current;

    const updateProgress = () => {
      if (video) {
        const currentTime = video.currentTime;
        const duration = video.duration;
        setProgress((currentTime / duration) * 100);
      }
    };

    if (video) {
      video.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [videoRef]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const video = videoRef.current;
    if (video) {
      const rect = (e.target as HTMLDivElement).getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const percentage = clickPosition / rect.width;

      video.currentTime = percentage * video.duration;
    }
  };
  return (
    <div
      className="relative w-full max-w-xl h-4 bg-gray-300 rounded cursor-pointer"
      onClick={handleClick}
    >
      <div
        className="absolute top-0 left-0 h-full bg-blue-500 rounded"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
