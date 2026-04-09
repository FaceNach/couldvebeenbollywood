export interface CountryApiResponse {
  name: {
    common: string;
  };
  cca3: string;
  flags: {
    svg: string;
    alt: string;
  };
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  capital?: string[];
  population: number;
  region: string;
}
