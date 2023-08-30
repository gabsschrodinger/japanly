export const getRandomItemFromArray = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
};

export const captalizeWord = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.substring(1);
};
