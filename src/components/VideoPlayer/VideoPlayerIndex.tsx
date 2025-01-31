import { MouseEvent, useRef, useState } from "react";
import { TVideo } from "../../types/video.type";
import ProgressBar from "./ProgressBar";
import Button from "../UI/Button";
import { icons } from "../UI/Icons/App.icons";

interface Props {
  video: TVideo;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function VideoPlayerIndex({ video, setIsOpen }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
      return;
    }
    videoRef.current?.play();
    setIsPlaying(true);
  };

  return (
    <div className="fixed p-4 top-16 left-0 w-full h-[calc(100svh-8rem)] bg-white flex flex-col gap-2">
      <Button
        styleMode="none"
        styleSize="none"
        className="border rounded p-1 w-8 aspect-square"
        onClick={() => setIsOpen!(false)}
      >
        X
      </Button>
      <div className="w-full h-full relative">
        <video
          ref={videoRef}
          src={video.url}
          className="w-full h-full object-cover"
          onEnded={() => setIsPlaying(false)}
        ></video>

        <Button
          styleMode="none"
          styleSize="none"
          className="h-12 aspect-square  fill-black absolute top-[calc(100%-2rem)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 border rounded-full flex items-center justify-center"
          onClick={(e) => handlePlay(e)}
        >
          {isPlaying
            ? icons.PauseSvg({ className: "h-8 aspect-square" })
            : icons.PlayBtnSvg({ className: "h-8 aspect-square" })}
        </Button>

        <ProgressBar videoRef={videoRef} />
      </div>
    </div>
  );
}
