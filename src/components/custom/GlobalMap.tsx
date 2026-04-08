import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export const MapChart = () => {
  return (
    <div className="w-full px-2">
      <div className="w-full max-w-10xl">
        <ComposableMap
          width={1000}
          height={560}
          projection="geoEqualEarth"
          projectionConfig={{ scale: 210 }}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            background: "transparent",
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#2a2a2a"
                  stroke="#5f7782"
                  strokeWidth={0.8}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
};
