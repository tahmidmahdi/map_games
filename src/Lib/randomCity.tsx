import { cities, CityInterface } from "./mapData";

const randomCityGenerate = (): CityInterface => {
  return cities.cities[Math.floor(Math.random() * cities.cities.length)];
};

export default randomCityGenerate;
