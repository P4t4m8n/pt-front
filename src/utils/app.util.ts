const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 10);
};

const capitalFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.substring(1);
};

export const appUtil = {
  generateRandomId,
  capitalFirstLetter,
};
