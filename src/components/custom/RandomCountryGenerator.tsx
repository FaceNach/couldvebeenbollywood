import { getCountryData } from "@/api/getCountryData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formattedPercentage } from "@/helpers/formattedPercentage";
import type { WeightRandomAlgo } from "@/classes/weightRndAlg";
import { useState } from "react";
import { MapChart } from "./GlobalMap";
import { CountryHighlightMap } from "./CountryHighlightMap";

interface RandomCountryGeneratorProps {
  algoLogic: WeightRandomAlgo;
}

interface CountryProps {
  countryName: string;
  aliases: string[];
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRandomCountryBorn = async () => {
    setRandomVisibility(false);
    setIsLoading(true);

    // Artificial 2-second delay for the retro spinner effect
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const randomCountry = algoLogic.getRandom();
    const percentage = algoLogic.getPercentageByCountry(randomCountry.name);
    const formattedPercentageResult = formattedPercentage(percentage);
    const countryData = await getCountryData(randomCountry.name);

    if (!countryData) {
      setIsLoading(false);
      return;
    }

    setCountry({
      countryName: countryData.name.common,
      aliases: [randomCountry.name, ...(randomCountry.alias || [])],
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

    setIsLoading(false);
    setRandomVisibility(true);
  };

  return (
    <>
      <section className="mb-12 text-center">
        <Button
          disabled={isLoading}
          className="cursor-pointer h-auto rounded-none border-4 border-black bg-[#3B82F6] px-10 py-6 text-2xl font-black uppercase text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:bg-[#3B82F6] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          onClick={handleRandomCountryBorn}
        >
          {isLoading ? "Rolling..." : "Where would I be born?"}
        </Button>
      </section>

      {/* Retro Loading Spinner */}
      {isLoading && (
        <div className="mb-12 flex flex-col items-center justify-center gap-8 py-8">
          <div className="flex h-32 w-32 animate-spin items-center justify-center border-4 border-black bg-[#FF90E8] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-6xl" role="img" aria-label="Globe spinner">
              🌎
            </span>
          </div>
          <p className="animate-pulse border-4 border-black bg-[#FEF08A] px-6 py-3 text-2xl font-black uppercase text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Rolling the dice of life...
          </p>
        </div>
      )}

      {/* Results Card */}
      {randomVisibility && !isLoading && (
        <Card className="mb-8 overflow-visible rounded-none border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ring-0 data-[slot=card]:ring-0">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-4xl font-black uppercase text-black drop-shadow-[2px_2px_0px_rgba(255,200,0,1)]">
              {country?.countryName}
            </h2>
            <p className="text-6xl font-black text-black">
              {country?.probabilityBeingBorn}%
            </p>
            <p className="mt-4 inline-block border-4 border-black bg-[#FEF08A] px-4 py-2 text-lg font-bold uppercase text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              probability of being born here
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Flag / Visuals Placeholder */}
            <div className="relative flex h-48 overflow-hidden flex-col items-center justify-center border-4 border-black bg-[#A7F3D0] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="z-10 flex flex-col items-center justify-center gap-2 p-4 text-center">
                <div>
                  <p className="font-bold uppercase text-black">Capital</p>
                  <p className="text-3xl font-black text-black">
                    {country?.capital}
                  </p>
                </div>
                <div>
                  <p className="mt-2 font-bold uppercase text-black">
                    Population
                  </p>
                  <p className="text-2xl font-black text-black">
                    {country?.population.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Region Placeholder */}
            <div className="relative flex h-48 overflow-hidden items-center justify-center border-4 border-black bg-[#FCA5A5] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="z-10 flex flex-col gap-2 text-center">
                <div>
                  <p className="font-bold uppercase text-black">Region</p>
                  <p className="text-4xl font-black text-black">
                    {country?.region}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Country Shape Map */}
          <div className="mt-6 flex h-64 md:h-80 w-full items-center justify-center border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
             <CountryHighlightMap aliases={country?.aliases || []} />
          </div>
        </Card>
      )}

      {!randomVisibility && !isLoading && (
        <div className="mb-8 rounded-none border-4 border-black bg-white p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:p-4">
          <MapChart />
        </div>
      )}
    </>
  );
};
