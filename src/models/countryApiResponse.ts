export interface CountryApiResponse {
  name: {
    common: string;
  };
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
