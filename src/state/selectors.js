export const selectUpcomingEvents = events => {
    if (!events) return []

    const now = Date.now()
    return events.filter(event => event.startDate > now)
}

export const selectPassedEvents = events => {
    if (!events) return []

    const now = Date.now()
    return events.filter(event => event.startDate < now)
}

export const countUpcomingEvents = events => selectUpcomingEvents(events).length

export const countPassedEvents = events => selectPassedEvents(events).length
