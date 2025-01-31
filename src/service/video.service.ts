import { TVideo } from "../types/video.type";
import { apiService } from "./api.service";

const BASE_URL = "video/";

const save = async (blob: FormData): Promise<TVideo> => {
  
  return await apiService.post<FormData, TVideo>(BASE_URL + "edit", blob);
};

export const videoService = {
  save,
};
