export function saveTheme(value: string) {
    localStorage.setItem('letmeask-theme', value)
}

export function getTheme() {
    return localStorage.getItem('letmeask-theme') || 'light'
}