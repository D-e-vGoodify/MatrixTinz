import { createContext, useEffect, useState } from 'react';
import { triggerHaptic } from '../utils';

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');
    const [useSystemTheme, setUseSystemTheme] = useState(localStorage.getItem('theme') === null);

    useEffect(() => {
        if (!useSystemTheme) return;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const updateTheme = () => setIsDarkMode(mediaQuery.matches);
        updateTheme();
        mediaQuery.addEventListener('change', updateTheme);
        return () => mediaQuery.removeEventListener('change', updateTheme);
    }, [useSystemTheme])

    const toggleDarkMode = (mode) => {
        setUseSystemTheme(false)
        setIsDarkMode(mode);
        !mode ? localStorage.setItem('theme', 'light') : localStorage.setItem('theme', 'dark');
    };

    const useSystem = () => {
        !useSystemTheme ? triggerHaptic() : "";
        localStorage.removeItem('theme');
        setUseSystemTheme(true);
    }

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode, useSystemTheme, useSystem }}>
            {children}
        </DarkModeContext.Provider>
    )
}

export { DarkModeProvider, DarkModeContext }