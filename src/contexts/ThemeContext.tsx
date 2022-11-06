import { createContext, ReactNode, useState } from 'react'
import { getTheme, saveTheme } from '../services/storage'

type ThemeContextData = {
    theme: string,
}

type ThemeProviderProps = {
    children: ReactNode,
}

export const ThemeContext = createContext({} as ThemeContextData)

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState(getTheme())

    function changeTheme() {
        const currentTheme = theme === 'light' ? 'dark' : 'light'
        saveTheme(currentTheme)
        setTheme(currentTheme)
    }

    return (
        <ThemeContext.Provider
            value={{ theme }}
        >
            <div className={`theme-${ theme }`}>
                { children }

                <button
                    className="theme-button"
                    onClick={ changeTheme }
                >
                    { theme === 'light' ? '☀️' : '🌕' }
                </button>
            </div>
        </ThemeContext.Provider>
    )
}