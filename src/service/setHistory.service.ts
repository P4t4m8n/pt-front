import { TSetHistoryDto, TSetType } from "../types/set.type";
import { TTraining } from "../types/training.type";
import { appUtil } from "../utils/app.util";

const getEmpty = (setType: TSetType, training: TTraining): TSetHistoryDto => {
  return {
    date: new Date(),
    setType,
    sets:
      training?.defaultSets?.map((set) => ({
        reps: set.reps,
        weight: set.weight,
        rest: set.rest,
        id: appUtil.generateRandomId(),
      })) || [],
    id: appUtil.generateRandomId(),
  };
};

export const setHistoryService = {
  getEmpty,
};
