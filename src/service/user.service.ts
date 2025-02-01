import { TUser, TUserFilter } from "../types/user.type";
import { apiService } from "./api.service";

const BASE_URL = "user";

const get = async (filter: TUserFilter): Promise<TUser[]> => {
  const url = BASE_URL + apiService.buildQuery(filter);
  const users = await apiService.get<TUser[]>(url);
  return users;
};

const getById = async (id: string): Promise<TUser> => {
  const user = await apiService.get<TUser>(`${BASE_URL}/${id}`);
  if (!user) throw new Error("User not found");
  return user;
};

const getByTraineeId = async (traineeId?: string): Promise<TUser> => {
  if (!traineeId) throw new Error("TraineeId is required");
  const user = await apiService.get<TUser>(`${BASE_URL}/trainee/${traineeId}`);
  return user;
};

export const userService = {
  get,
  getById,
  getByTraineeId,
};
