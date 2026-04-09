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
      <main className="min-h-screen bg-[#FFF4E0] text-black font-sans selection:bg-black selection:text-white">
        <div className="mx-auto max-w-3xl px-4 py-12 md:py-20">
          <TitlePresentation />

          <MyCountryOdds algoLogic={countryAlgo} />

          <RandomCountryGenerator algoLogic={countryAlgo} />
        </div>
        
      </main>
    </>
  );
};
