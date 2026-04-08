import { getCountryData } from "@/api/getCountryData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formattedPercentage } from "@/helpers/formattedPercetage";
import type { WeightRandomAlgo } from "@/hooks/weightRndAlg";
import { useState } from "react";
import { MapChart } from "./globalMap";

interface RandomCountryGeneratorProps {
  algoLogic: WeightRandomAlgo;
}

interface CountryProps {
  countryName: string;
  probabilityBeingBorn: number;
  flags: {
    svg: string;
    alt: string;
  };
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  capital?: string;
  population: number;
  region: string;
}

export const RandomCountryGenerator = ({
  algoLogic,
}: RandomCountryGeneratorProps) => {
  const [country, setCountry] = useState<CountryProps | null>(null);
  const [randomVisibility, setRandomVisibility] = useState<boolean>(false);

  const handleRandomCountryBorn = async () => {
    setRandomVisibility(false);
    const randomCountry = algoLogic.getRandom();
    const percentage = algoLogic.getPercentageByCountry(randomCountry.name);
    const formattedPercentageResult = formattedPercentage(percentage);
    const countryData = await getCountryData(randomCountry.name);

    if (!countryData) {
      return;
    }

    setCountry({
      countryName: countryData.name.common,
      probabilityBeingBorn: formattedPercentageResult,
      flags: {
        svg: countryData.flags.svg,
        alt: countryData.flags.alt,
      },
      maps: {
        googleMaps: countryData.maps.googleMaps,
        openStreetMaps: countryData.maps.openStreetMaps,
      },
      capital: countryData.capital?.[0] ?? "",
      population: countryData.population,
      region: countryData.region,
    });

    setRandomVisibility(true);
  };

  return (
    <>
      <section className="mb-12 text-center">
        <Button
          className="rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          onClick={handleRandomCountryBorn}
        >
          Where would I be born?
        </Button>
      </section>

      {/* Results Card */}
      {randomVisibility && (
        <Card className="rounded-xl border border-border bg-card p-6">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-3xl font-bold">{country?.countryName}</h2>
            <p className="text-4xl font-bold text-primary">
              {country?.probabilityBeingBorn}%
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              probability of being born here
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="mb-4 flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30">
            <span className="text-muted-foreground">map goes here</span>
          </div>

          {/* Info Placeholder */}
          <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30">
            <span className="text-muted-foreground">info goes here</span>
          </div>
        </Card>
      )}

      {!randomVisibility && (
        <div className="mb-4 rounded-lg border border-border bg-muted/20 p-2 md:p-4">
          <MapChart />
        </div>
      )}
    </>
  );
};
