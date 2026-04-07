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
      <section className="mb-12 rounded-xl border border-border bg-card p-6">
        <p className="mb-4 text-sm text-muted-foreground">
          Check the odds for your actual country of origin
        </p>
        <div className="flex gap-3">
          <Input
            type="text"
            ref={userCountry}
            placeholder="Enter a country..."
            className="flex-1 rounded-lg border border-border bg-input px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button
            className="rounded-lg bg-secondary px-5 py-2.5 font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
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
                fontSize: "12px",
                display: "block",
                marginTop: "4px",
                marginLeft: "10px",
              }}
            >
              {errorMsg}
            </span>
          </div>
        )}

        {/* Country odds result card */}
        {oddsVisibility && (
          <div className="mt-4 rounded-lg border border-border bg-background p-4">
            <p className="text-sm text-muted-foreground">
              {myCountryOdds?.countryName}
            </p>
            <p className="text-2xl font-bold text-primary">
              {myCountryOdds?.percentage}%
            </p>
          </div>
        )}
      </section>
    </>
  );
};
