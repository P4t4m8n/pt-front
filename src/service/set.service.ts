import { TSet, TSetDto } from "../types/set.type";
import { appUtil } from "../utils/app.util";

const getEmpty = (): TSetDto => {
  return {
    id: appUtil.generateRandomId(),
    reps: 0,
    weight: 0,
    rest: 0,
  };
};

const fromDataToDto = (formData: FormData): TSetDto[] => {
  const data = new Map<
  string,
  { reps: number; weight: number; rest: number }
  >();
  
  formData.forEach((value, key) => {
    const [, field, id] = key.split("_");
    if (!data.has(id)) {
      data.set(id, { reps: 0, weight: 0, rest: 0 });
    }
    const set = data.get(id);
    if (set) {
      set[field as keyof Omit<TSet, "id">] = Number(value);
    }
  });

  const sets: TSetDto[] = [];
  data.forEach((value, key) => {
    sets.push({
      id: key.length < 10 ? undefined : key, //If key is less than 10 characters, it is a new set. Otherwise, it is an existing set.
      reps: value.reps,
      weight: value.weight,
      rest: value.rest,
    });
  });

  return sets;
};

export const setService = {
  getEmpty,
  fromDataToDto,
};
