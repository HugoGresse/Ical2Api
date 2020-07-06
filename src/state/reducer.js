export const initialState = {
    icals: [],
    events: [],
    selectedOrganization: {
        id: null,
        icalLoading: false,
        eventsLoading: false,
        remindersLoading: false,
        icals: [],
        events: [],
        reminders: [],
    },
    organizations: {},
    auth: {
        loggedIn: false,
        user: null,
    },
    error: null,
}

export const reducer = (state, action) => {
    switch (action.domain) {
        case 'auth':
            switch (action.type) {
                case 'login':
                    return {
                        ...state,
                        auth: {
                            ...state.auth,
                            loggedIn: true,
                            user: action.payload.user,
                        },
                    }
                case 'logout':
                    return initialState
                default:
                    return state
            }
        case 'orgs':
            switch (action.type) {
                case 'loaded':
                    return {
                        ...state,
                        organizations: {
                            ...state.organizations,
                            ...action.payload,
                        },
                    }
                default:
                    return state
            }
        case 'org':
            switch (action.type) {
                case 'selected': {
                    return {
                        ...state,
                        selectedOrganization: {
                            ...initialState.selectedOrganization,
                            id: action.payload.id,
                        },
                    }
                }
                case 'icalLoading':
                    return {
                        ...state,
                        selectedOrganization: {
                            ...state.selectedOrganization,
                            icalLoading: true,
                        },
                    }
                case 'icalsLoaded':
                    return {
                        ...state,
                        selectedOrganization: {
                            ...state.selectedOrganization,
                            icals: action.payload,
                            icalLoading: false,
                        },
                    }
                case 'eventsLoading':
                    return {
                        ...state,
                        selectedOrganization: {
                            ...state.selectedOrganization,
                            eventsLoading: true,
                        },
                    }
                case 'eventsLoaded':
                    return {
                        ...state,
                        selectedOrganization: {
                            ...state.selectedOrganization,
                            events: action.payload,
                            eventsLoading: false,
                        },
                    }
                case 'remindersLoading':
                    return {
                        ...state,
                        selectedOrganization: {
                            ...state.selectedOrganization,
                            remindersLoading: true,
                        },
                    }
                case 'remindersLoaded':
                    return {
                        ...state,
                        selectedOrganization: {
                            ...state.selectedOrganization,
                            remindersLoading: false,
                            reminders: action.payload,
                        },
                    }
                default:
                    return state
            }
        case 'error':
            switch (action.type) {
                case 'new': {
                    return {
                        ...state,
                        error: action.payload,
                    }
                }
                case 'delete': {
                    return {
                        ...state,
                        error: null,
                    }
                }
                default:
                    return state
            }
        default:
            switch (action.type) {
                default:
                    return state
            }
    }
}
