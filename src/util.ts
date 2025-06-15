import { CatNameParts } from "./settings";

export const randomElement = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export const getRandomName = () => {
  const name =
    randomElement(CatNameParts.Prefixes) + randomElement(CatNameParts.Suffixes);
  const middle = randomElement(CatNameParts.NobleParticles);
  const surname =
    randomElement(CatNameParts.Prefixes) + randomElement(CatNameParts.Suffixes);

  return `${name} ${middle} ${surname}`;
};
