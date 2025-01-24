import { TUser, TUserFilter } from "../types/user.type";
import { apiService } from "./api.service";

const BASE_URL = "user";

const get = async (filter: TUserFilter): Promise<TUser[]> => {
  const url = BASE_URL + apiService.buildQuery(filter);
  const users = await apiService.get<TUser[]>(url);
  return users;
};

export const userService = {
  get,
};
