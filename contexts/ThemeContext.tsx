import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  FC,
} from "react";
import { ThemeContextProps, ChildrenNode } from "../interfaces/index";


const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeContextProvider: FC<ChildrenNode> = ({ children }) => {
  const [theme, setTheme] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      return storedTheme === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };

  const Component = ThemeContext.Provider;
  return <Component value={{ toggleTheme }}>{children}</Component>;
};

const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("ERROR");
  }
  return context;
};

export { ThemeContextProvider, useThemeContext };
