import { TEntity } from "./app.type";
import { TSet, TSetDto } from "./set.type";

export type TTraining = TEntity & {
  name: string;
  defaultSets?: TSet[];
  description?: string;
};

export type TTrainingDto =  Omit<TTraining, "trainer"|"defaultSets"> & {
  trainerId: string;
  defaultSets: TSetDto[];
};

export type TTrainingFilter = {
  trainerId?: string | null;
  name?: string | null;
  skip?: number;
  take?: number;
};
