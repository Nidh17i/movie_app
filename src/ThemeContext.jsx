import {  createContext, useEffect, useState } from "react";

export const ThemeContext=createContext();

export const ThemeProvider=({children})=>{
     const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    const toggleTheme=()=>{
        const newtheme=theme === 'dark' ? 'light' : 'dark';
        setTheme(newtheme);
        localStorage.setItem("theme", newtheme);
    }
     useEffect(() => {
    document.body.className =
      theme? "bg-[#0d0b1a] text-white transition-all duration-300"
        : "bg-white text-black transition-all duration-300";
  }, [theme]);
    return(
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}

        </ThemeContext.Provider>
    )

}

