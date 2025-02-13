import { TEntity } from "./app.type";
import { TSet, TSetDto } from "./set.type";
import { TTrainer } from "./trainer.type";
import { TVideo } from "./video.type";

export type TTraining = TEntity & {
  name: string;
  defaultSets?: TSet[];
  description?: string;
  trainer?: TTrainer | null;
  bodyPart: string;
  imgUrl?: string;
  defaultVideo?: TVideo | null;
  trainingType?: TTrainingType;
};

export type TTrainingDto = Omit<
  TTraining,
  "trainer" | "defaultSets" | "defaultVideo"
> & {
  trainerId: string;
  defaultVideoId?: string;
  defaultSets: TSetDto[];
};

export type TTrainingFilter = {
  trainerId?: string | null;
  name?: string | null;
  skip?: number;
  take?: number;
};

export const TRAINING_TYPE = [
  "WARM_UP",
  "STRETCH",
  "CARDIO",
  "STRENGTH",
] as const;

export type TTrainingType = (typeof TRAINING_TYPE)[number];
