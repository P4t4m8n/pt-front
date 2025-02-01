import { TEntity } from "./app.type";
import { TSetHistory, TSetHistoryDto } from "./set.type";
import { TTraineeTraining } from "./trainee-training.type";
import { TTrainee } from "./trainee.type";
import { TTraining } from "./training.type";
import { TVideo, TVideoDto } from "./video.type";

export type TPersonalTraining = TEntity & {
  training?: Omit<TTraining, "defaultSets">;
  instructionVideos?: TVideo[];
  instructions?: string;
  setsHistory?: TSetHistory[];
  traineeTraining?: TTraineeTraining[];
  trainee?: TTrainee;
};

export type TPersonalTrainingDto = TEntity &
  Omit<TPersonalTraining, "training" | "instructionVideos" | " setsHistory"> & {
    trainingId: string;
    programId?: string;
    traineeId: string;
    instructionVideos?: Array<TVideoDto | Blob>;
    setsHistory?: TSetHistoryDto[];
  };

export type TPersonalTrainingFilter = {
  traineeId?: string;
  trainingId?: string;
  programId?: string;
  skip?: number;
  take?: number;
};
