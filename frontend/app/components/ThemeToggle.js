// app/components/ThemeToggle.js
'use client'
import { useState, useEffect } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"}
        </button>
    );
}
