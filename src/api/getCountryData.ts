import type { CountryApiResponse } from "@/models/countryApiResponse";

export const getCountryData = async (
  country: string,
): Promise<CountryApiResponse> => {
  const baseUrl = import.meta.env.VITE_COUNTRIES_API_URL;

  try {
    const response = await fetch(`${baseUrl}/${country}?fullText=true`);

    if (!response.ok) {
      throw new Error("Country not found");
    }

    const rawData = await response.json();
    const data = rawData[0];

    return {
      name: {
        common: data.name.common,
      },
      cca3: data.cca3,
      flags: {
        svg: data.flags.svg,
        alt: data.flags.alt,
      },
      maps: {
        googleMaps: data.maps.googleMaps,
        openStreetMaps: data.maps.openStreetMaps,
      },
      capital: data.capital ?? undefined,
      population: data.population,
      region: data.region,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    throw new Error(`Error fetching country data: ${message}`);
  }
};
