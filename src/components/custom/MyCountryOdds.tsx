import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formattedPercentage } from "@/helpers/formattedPercetage";
import type { WeightRandomAlgo } from "@/hooks/weightRndAlg";

import { useRef, useState } from "react";

interface MyCountryOddsProps {
  algoLogic: WeightRandomAlgo;
}

interface Props {
  countryName: string;
  percentage: number;
}

export const MyCountryOdds = ({ algoLogic }: MyCountryOddsProps) => {
  const [oddsVisibility, setOddsVisibility] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMessage] = useState<string>("");
  const [myCountryOdds, setMyCountryOdds] = useState<Props>();
  const userCountry = useRef<HTMLInputElement>(null);

  const handleMyCountryOdds = () => {
    setOddsVisibility(false);

    const userInput = userCountry.current?.value;
    const formattedUserInput = userInput?.replaceAll(" ", "");
    if (!formattedUserInput || formattedUserInput === "") {
      setError(true);
      setErrorMessage("This field it's mandatory");
      return;
    }

    setError(false);

    const percentage = algoLogic.getPercentageByCountry(formattedUserInput);
    if (percentage === 0) {
      setError(true);
      setErrorMessage("Please enter a valid country");
      return;
    }
    const fixedPercentage = formattedPercentage(percentage);

    setMyCountryOdds((prev) => ({
      ...prev,
      countryName: userInput!,
      percentage: fixedPercentage,
    }));

    setOddsVisibility(true);
  };

  return (
    <>
      <section className="mb-12 rounded-none border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <p className="mb-6 text-lg font-bold uppercase text-black">
          Check the odds for your actual country of origin
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-3">
          <Input
            type="text"
            ref={userCountry}
            placeholder="Enter a country..."
            className="flex-1 rounded-none border-4 border-black bg-[#E2E8F0] px-4 py-6 text-lg font-bold text-black placeholder:text-gray-500 focus:bg-white focus:outline-none focus:ring-0 focus-visible:ring-0"
          />
          <Button
            className="cursor-pointer h-auto rounded-none border-4 border-black bg-[#4ADE80] px-8 py-4 text-xl font-black uppercase text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:bg-[#4ADE80] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
            onClick={handleMyCountryOdds}
          >
            Check my odds
          </Button>
        </div>
        {error && (
          <div>
            <span
              style={{
                color: "red",
                fontSize: "14px",
                fontWeight: "bold",
                display: "block",
                marginTop: "8px",
                marginLeft: "4px",
              }}
            >
              {errorMsg}
            </span>
          </div>
        )}

        {/* Country odds result card */}
        {oddsVisibility && (
          <div className="mt-6 rounded-none border-4 border-black bg-[#FF90E8] p-6 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xl font-bold uppercase text-black">
              {myCountryOdds?.countryName}
            </p>
            <p className="text-5xl font-black text-black drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">
              {myCountryOdds?.percentage}%
            </p>
          </div>
        )}
      </section>
    </>
  );
};
