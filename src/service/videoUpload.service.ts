import { TVideo, TVideoDto } from "../types/video.type";

export const uploadVideoToCloudinary = async (file: Blob): Promise<TVideo> => {
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET!;
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME!;
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`;

  try {
    const formData = new FormData();
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("file", file);
    formData.append("folder", "training");
    const res = await fetch(UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    const video: TVideoDto = {
      duration: result.duration,
      height: result.height,
      width: result.width,
      playbackUrl: result.playback_url,
      url: result.url,
      assetId: result.asset_id,
      format: result.format,
    };

    return video;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw new Error("Error uploading video");
  }
};
