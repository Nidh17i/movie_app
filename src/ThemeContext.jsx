import { theme } from "flowbite-react";
import { Children, createContext, useState } from "react";

export const ThemeContext=createContext();

export const ThemeProvider=({Children})=>{
   const [theme,setTheme]=useState('dark');
    const toggleTheme=()=>{
        const newtheme=theme === 'dark' ? light : dark;
        setTheme(newtheme);
    }
    return(
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {Children}

        </ThemeContext.Provider>
    )

}

