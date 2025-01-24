import { TEntity } from "./app.type";

export type TVideo = TEntity & {
  duration: number;
  height: number;
  width: number;
  playbackUrl: string;
  url: string;
  assetId: string;
  format: TVideoFormat;
  videoOwner: TVideoOwner;
};

export type TVideoDto = TVideo & {
  trainerInstructionVideoId?: string;
  traineeFeedbackVideoId?: string;
};

export type TVideoFilter = {
  assetId?: string;
  format?: TVideoFormat;
  traineeId?: string;
};

export const VIDEO_FORMATS = ["mp4", "webm", "ogg"] as const;
export type TVideoFormat = (typeof VIDEO_FORMATS)[number];

export const VIDEO_OWNERS = ["trainer", "trainee"] as const;
export type TVideoOwner = (typeof VIDEO_OWNERS)[number];
