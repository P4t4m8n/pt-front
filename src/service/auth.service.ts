import { TUser, TUserCreateDto, TUserUpdateDto } from "../types/user.type";
import { apiService } from "./api.service";

const BASE_URL = "auth/";

const getSessionUser = async (): Promise<TUser | null> => {
  return await apiService.get<TUser>(BASE_URL + "session");
};
const signOut = async (): Promise<void> => {
  await apiService.post(BASE_URL + "sign-out");
  return;
};
const signUp = async (formData: FormData): Promise<TUser> => {
  const dto = formDataToDto(formData);
  return await apiService.post<TUserUpdateDto, TUser>(
    BASE_URL + "sign-up",
    dto
  );
};
const signIn = async (formData: FormData): Promise<TUser> => {
  const dto = formDataToDto(formData);

  return await apiService.post<TUserCreateDto, TUser>(
    BASE_URL + "sign-in",
    dto as TUserCreateDto
  );
};
const googleRedirect = async (): Promise<void> => {
  return await apiService.get(BASE_URL + "google");
};

const formDataToDto = (formData: FormData): TUserCreateDto | TUserUpdateDto => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  return { email, password, firstName, lastName };
};
export const authService = {
  getSessionUser,
  signOut,
  googleRedirect,
  signUp,
  signIn,
};
