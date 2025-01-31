import { TEntity } from "./app.type";
import { TPersonalTraining } from "./personal-training.type";
import { TTraineeTraining } from "./trainee-training.type";

export type TSet = TEntity & {
  reps: number;
  weight: number;
  rest: number;
};

export type TSetDto = TSet & {
  trainingId?: string;
};

export type TSetHistory = TEntity & {
  date: Date;
  personalTraining?: TPersonalTraining;
  traineeTraining?: TTraineeTraining;
  setType: TSetType;
  sets: TSet[];
};
export type TSetHistoryDto = Omit<
  TSetHistory,
  "personalTraining" | "traineeTraining"
> & {
  date: Date;
  personalTraining?: TPersonalTraining;
  traineeTraining?: TTraineeTraining;
};

export type TSetFilter = {
  reps?: number;
  weight?: number;
  rest?: number;
  setType?: TSetType;
  trainingId?: string;
  traineeSetsId?: string;
  trainerSetsId?: string;
};

export const SET_TYPES = [
  "DEFAULT",
  "TRAINEE_HISTORY",
  "TRAINER",
  "TRAINER_HISTORY",
] as const;
export type TSetType = (typeof SET_TYPES)[number];
