import { TVideo } from "../types/video.type";
import { appUtil } from "./app.util";

const blobToPreview = (blob: Blob): TVideo => {
  const url = URL.createObjectURL(blob.slice());

  const video: TVideo = {
    url,
    id: appUtil.generateRandomId(),
  };
  return video;
};

export const videoUtil = {
  blobToPreview,
};
