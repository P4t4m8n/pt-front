import { TUser } from "../types/user.type";
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
  return await apiService.post<FormData, TUser>(BASE_URL + "sign-up", formData);
};

const signIn = async (formData: FormData): Promise<TUser> => {
  return await apiService.post<FormData, TUser>(BASE_URL + "sign-in", formData);
};

const googleRedirect = async (): Promise<void> => {
  return await apiService.get(BASE_URL + "google");
};
export const authService = {
  getSessionUser,
  signOut,
  googleRedirect,
  signUp,
  signIn
};
