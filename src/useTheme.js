import { useEffect, useState } from "react"

export const useTheme = () => {

    const [theme, setTheme] = useState(() => {
        const localTheme = localStorage.getItem('app-theme');
        if (localTheme) return localTheme;

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('app-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return { theme, toggleTheme };
}