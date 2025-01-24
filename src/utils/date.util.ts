const formatDateForInput = (date?: Date | string): string => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

const formatDateForPreview = (date?: string | Date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const dateUtil = {
  formatDateForInput,
  formatDateForPreview,
};
