import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { geoCentroid, geoBounds } from "d3-geo";
import { useEffect, useState } from "react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const CenterUpdater = ({ targetGeo, setCenter, setZoom }: any) => {
  useEffect(() => {
    if (targetGeo) {
      const newCenter = geoCentroid(targetGeo);
      setCenter(newCenter as [number, number]);
      
      const bounds = geoBounds(targetGeo);
      let dx = bounds[1][0] - bounds[0][0];
      const dy = bounds[1][1] - bounds[0][1];
      
      // Handle antimeridian crossing
      if (dx < 0) {
          dx = 360 + dx;
      }
      
      // Calculate a tighter zoom level based on the size of the country
      const zoomX = 180 / (dx || 1);
      const zoomY = 120 / (dy || 1);
      const newZoom = Math.max(1, Math.min(30, Math.min(zoomX, zoomY)));
      
      setZoom(newZoom);
    }
  }, [targetGeo, setCenter, setZoom]);

  return null;
};

export const CountryHighlightMap = ({ aliases }: { aliases: string[] }) => {
  const [center, setCenter] = useState<[number, number]>([0, 0]);
  const [zoom, setZoom] = useState<number>(1);

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ scale: 100 }}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        background: "transparent",
      }}
    >
      <ZoomableGroup center={center} zoom={zoom} minZoom={1} maxZoom={40} filterZoomEvent={() => false}>
        <Geographies geography={geoUrl}>
          {({ geographies }) => {
            const targetGeo = geographies.find((geo) => aliases.includes(geo.properties.name));
            
            return (
              <>
                {targetGeo && (
                  <CenterUpdater 
                    targetGeo={targetGeo} 
                    setCenter={setCenter} 
                    setZoom={setZoom} 
                  />
                )}
                {geographies.map((geo) => {
                  const geoName = geo.properties.name;
                  const isHighlighted = aliases.includes(geoName);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isHighlighted ? "#FF90E8" : "#E2E8F0"}
                      stroke={isHighlighted ? "#000000" : "#94A3B8"}
                      strokeWidth={isHighlighted ? 2 / zoom : 0.5 / zoom}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: isHighlighted ? "#FF90E8" : "#CBD5E1" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })}
              </>
            );
          }}
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};
