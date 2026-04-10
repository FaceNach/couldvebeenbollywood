import { formattedString } from "@/helpers/formattedString";
import type { Country } from "@/models/types";

export class WeightRandomAlgo {
  private countries: Country[];
  private cumulativeWeight: number[];
  private totalWeight: number = 0;
  private countriesMap: Map<string, number>;

  constructor(countries: Country[]) {
    if (!countries || countries.length === 0) {
      throw new Error(
        "Data of countries can't be empty, take a look to /models",
      );
    }

    this.countries = countries;
    this.cumulativeWeight = new Array(countries.length);
    this.countriesMap = new Map<string, number>();

    for (let i = 0; i < countries.length; i++) {
      const weight = countries[i].population;

      this.totalWeight += weight;
      this.cumulativeWeight[i] = this.totalWeight;
      this.countriesMap.set(
        formattedString(countries[i].name),
        countries[i].population,
      );

      if (countries[i].alias) {
        for (const alias of countries[i].alias) {
          this.countriesMap.set(
            formattedString(alias),
            countries[i].population,
          );
        }
      }
    }

    if (this.totalWeight <= 0) {
      throw new Error(
        "Total weight must be greater than zero. Check your population data.",
      );
    }
  }

  public getRandom(): Country {
    const randomValue = Math.random() * this.totalWeight;

    let left = 0;
    let right = this.cumulativeWeight.length - 1;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (randomValue < this.cumulativeWeight[mid]) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return this.countries[left];
  }

  public getPercentageByCountry(name: string): number {
    if (!name || name.trim() === "") {
      throw new Error("Not valid name or empty string");
    }

    const population = this.countriesMap.get(formattedString(name));

    if (population === undefined) {
      return 0;
    }

    const chance = (population / this.totalWeight) * 100;
    return chance;
  }
}
