// components/Snowfall.js
import React from "react";
import Snowfall from "react-snowfall";

const SnowfallEffect = () => {
  return (
    <Snowfall
      snowflakeCount={100}
      style={{ zIndex: 1000, position: "fixed" }}
    />
  );
};

export default SnowfallEffect;
