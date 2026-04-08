import { TitlePresentation } from "./components/custom/TitlePresentation";
import { MyCountryOdds } from "./components/custom/MyCountryOdds";
import "./index.css";
import { RandomCountryGenerator } from "./components/custom/RandomCountryGenerator";
import { useMemo } from "react";
import { WeightRandomAlgo } from "./hooks/weightRndAlg";
import { COUNTRIES } from "./models/countries";

export const App = () => {
  const countryAlgo = useMemo(() => new WeightRandomAlgo(COUNTRIES), []);
  return (
    <>
      <main className="min-h-screen bg-cyan-950 text-foreground">
        <div className="mx-auto max-w-2xl px-4 py-10">
          <TitlePresentation />

          <MyCountryOdds algoLogic={countryAlgo} />

          <RandomCountryGenerator algoLogic={countryAlgo} />
        </div>
        
      </main>
    </>
  );
};
