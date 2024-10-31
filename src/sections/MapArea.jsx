import React, { useEffect, useState, useRef } from "react";
import fetchMapData from "../components/fetchMapData";

const MapArea = () => {
  const [stateData, setStateData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMapData();
      setStateData(data);
    };
    fetchData();
  }, []);

  console.log(stateData);

  return (
    <>
      <div className="flex min-w-[1080px] min-h-[600px] py-10 border-2 border-red-500">
        <svg viewBox="0 0 1000 589" width="100%" height="100%">
          {stateData.map((state) => (
            <g key={state.id}>
              <path d={state.pathData} fill="lightgray" stroke="black" />
              <text
                x={state.labelX}
                y={state.labelY}
                fontSize="20"
                textAnchor="middle"
                fill="black"
              >
                {state.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </>
  );
};

export default MapArea;
