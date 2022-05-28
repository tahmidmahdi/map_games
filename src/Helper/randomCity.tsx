// generate Random Cities based
import { cities, CityInterface } from "../Lib/mapData";

const randomCityGenerate = (): CityInterface => {
  return cities.cities[Math.floor(Math.random() * cities.cities.length)];
};

export default randomCityGenerate;
