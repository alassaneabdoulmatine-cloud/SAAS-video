import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// read metadata of video in seconds
export const readVideoMetadata = async (file: File): Promise<number> => {
  const video = document.createElement("video");
  video.preload = "metadata";
  video.src = URL.createObjectURL(file);

  const duration = await new Promise<number>((resolve) => {
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      resolve(Number.isFinite(video.duration) ? video.duration : 0);
    };

    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      resolve(0);
    };
  });

  return duration;
};

// format video duration in seconds to mm:ss
export const formatVideoDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};
