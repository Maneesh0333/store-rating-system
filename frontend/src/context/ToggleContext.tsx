import { createContext, useContext, useState } from "react";
import type { ToggleContextType } from "../types/auth.types";
import { useMediaQuery } from "react-responsive";

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const ToggleProvider = ({ children }: Props) => {
  const isMobile = useMediaQuery({
    maxWidth: 768,
  });
  
  const [toggle, setToggle] = useState(isMobile);

  return (
    <ToggleContext.Provider value={{ toggle, setToggle }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggle = () => {
  const context = useContext(ToggleContext);

  if (!context) {
    throw new Error("useToggle must be used within AuthProvider");
  }

  return context;
};
