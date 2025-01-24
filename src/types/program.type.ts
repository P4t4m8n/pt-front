import { TEntity } from "./app.type";
import { TPersonalTraining } from "./personal-training.type";
import { TTrainee } from "./trainee.type";
import { TTrainer } from "./trainer.type";

export type TProgram = TEntity & {
  name?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  isActive?: boolean;
  days?: TDaysOfWeek[];
  trainings?: TPersonalTraining[];
  trainee?: TTrainee | null;
  trainer?: TTrainer | null;
};

export type TProgramDto = TEntity &
  Omit<TProgram, "trainings" | "trainee" | "trainer"> & {
    traineeId?: string;
    trainerId?: string;
  };
export type TProgramFilter = {
  name?: string;
  startDate?: Date;
  endDate?: Date;
  isActive?: boolean;
  traineeId?: string;
  trainerId?: string;
};

export const DAY_OF_WEEK = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
] as const;
export type TDaysOfWeek = (typeof DAY_OF_WEEK)[number];
