import React, { useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { secondary, neutral } from "@/config/theme";

interface SwitchThemeProps {
  onClick: () => void;
}

const SwitchTheme: React.FC<SwitchThemeProps> = ({ onClick }) => {
  const [toggleTheme, setToggleTheme] = useState(true);

  const handleToggleTheme = () => {
    setToggleTheme(!toggleTheme);
    onClick(); // Invoke the onClick handler provided by the parent component
  };

  return (
    <div
      className="container"
      style={{
        height: "40px",
        width: "80px",
        borderRadius: "8px",
        background: !toggleTheme ? `${neutral[400]}` : "#FFFFFF",
        display: "flex",
        justifyContent: "space-between",
        transition: "all .15s",
      }}
    >
      <div
        style={{
          height: "35px",
          width: "35px",
          borderRadius: "100%",
          background: toggleTheme ? `${secondary[400]}` : "transparent",
          margin: "3px 0 0 4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "all .35s",
        }}
        onClick={handleToggleTheme}
      >
        <LightModeIcon
          fontSize="medium"
          sx={{ color: toggleTheme ? "#FFFFFF" : `${neutral[50]}` }}
        />
      </div>
      <div
        style={{
          height: "35px",
          width: "35px",
          borderRadius: "100%",
          background: !toggleTheme ? `${secondary[400]}` : "transparent",
          margin: "3px 4px 0 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "all .35s",
        }}
        onClick={handleToggleTheme}
      >
        <DarkModeIcon
          fontSize="medium"
          sx={{
            color: !toggleTheme ? "#000000" : `${neutral[400]}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: "rotate(-90deg)",
          }}
        />
      </div>
    </div>
  );
};

export default SwitchTheme;
