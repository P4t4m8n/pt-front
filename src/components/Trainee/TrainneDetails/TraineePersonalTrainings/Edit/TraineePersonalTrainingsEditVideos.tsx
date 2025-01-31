import { TVideo } from "../../../../../types/video.type";

import ItemList from "../../../../UI/ItemList";
import Model from "../../../../UI/Model";
import VideoPlayerIndex from "../../../../VideoPlayer/VideoPlayerIndex";

interface Props {
  instructionVideos: TVideo[];
  onRemoveVideo: (video: TVideo) => void;
}
export default function TraineePersonalTrainingsEditVideos({
  instructionVideos,
  onRemoveVideo,
}: Props) {
  return (
    <ItemList
      items={instructionVideos}
      renderItem={(video) => (
        <Model
          button={{
            content: (
              <div>
                <video
                  src={video.url}
                  className="w-24 h-24 rounded object-cover"
                ></video>
              </div>
            ),
            props: {
              className:
                "btn btn-primary p-2 shadow-border rounded bg-secondary-light dark:bg-primary-dark h-fit flex flex-col gap-2 justify-center items-center",
            },
          }}
          model={
            <VideoPlayerIndex video={video} onRemoveVideo={onRemoveVideo} />
          }
        />
      )}
    />
  );
}
