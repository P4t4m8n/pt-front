import { TEntity } from "./app.type";
import { TProgram } from "./program.type";
import { TTrainee } from "./trainee.type";
import { TUser, TUserCreateDto, TUserUpdateDto } from "./user.type";

export type TTrainer = TEntity & {
  trainees?: TTrainee[];
  programs?: TProgram[];
  user?: TUser | null;
};
export type TTrainerDto = TEntity & {
  userDto: TUserUpdateDto | TUserCreateDto;
};
