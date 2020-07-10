export const DAYS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
]
export const defaultLang = () => {
    const lang = navigator.language
    if (lang) {
        if (lang.includes('-')) {
            return lang.split('-')[0]
        }
        return lang
    }
    return 'en'
}
export const defaultTimezone = () => {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone
    } catch (e) {
        console.warn(
            'Unable to get the default timeZone, setting default to Paris'
        )
        return 'Europe/Paris'
    }
}
