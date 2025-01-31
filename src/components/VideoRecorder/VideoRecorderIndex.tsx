import { useRef, useState } from "react";
import { useModel } from "../../hooks/useModel";
import Button from "../UI/Button";

import { TVideo } from "../../types/video.type";

import { icons } from "../UI/Icons/App.icons";

import { videoUtil } from "../../utils/videoUtil";

interface Props {
  addVideosURL: (video: TVideo) => void;
}

export default function VideoRecorderIndex({ addVideosURL }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const recordedChunksRef = useRef<Blob[]>([]);
  const cameraModel = useRef<HTMLVideoElement>(null);
  const [isOpen, setIsOpen] = useModel(cameraModel);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startPreview = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
      setStream(mediaStream);
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  const startRecording = () => {
    if (!stream) return;

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = async (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
        await previewRecording();
      }
    };
    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;

    setRecording(true);
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const previewRecording = async () => {
    if (recordedChunksRef.current.length) {
      try {
        const blob = new Blob(recordedChunksRef.current, {
          type: "video/webm",
        });
        const video = videoUtil.blobToPreview(blob);

        addVideosURL(video);
        setIsOpen(false);
      } catch (error) {
        console.error("Error saving recording:", error);
      }
    }
  };
  return (
    <div>
      <Button
        styleMode="none"
        styleSize="none"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
          startPreview();
        }}
      >
        {icons.CameraSvg({
          className: "h-6 aspect-square stroke-white fill-none ",
        })}
      </Button>
      {isOpen && (
        <div>
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full border"
          ></video>
          <div className="flex gap-2 mt-4">
            {stream && !recording && (
              <Button
                styleMode="primary"
                styleSize="large"
                onClick={startRecording}
              >
                Start Recording
              </Button>
            )}
            {recording && (
              <Button
                styleMode="primary"
                styleSize="large"
                onClick={stopRecording}
              >
                Stop Recording
              </Button>
            )}
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}
