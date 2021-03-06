export const initialState = {
    icals: [],
    events: [],
    selectedOrganization: {
        id: null,
        icalLoading: false,
        eventsLoading: false,
        remindersLoading: false,
        loadError: null,
        icals: [],
        events: [],
        reminders: [],
        organizationPrivateDataLoading: false,
        organizationPrivateData: null,
        slackInstalls: [],
    },
    organizations: {},
    organizationsLoading: false,
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
                    if (!state.auth.loggedIn) {
                        return state
                    }
                    return initialState
                default:
                    return state
            }
        case 'orgs':
            switch (action.type) {
                case 'loaded': {
                    const tempState = {
                        ...state,
                        organizations: {},
                        organizationsLoading: false,
                    }
                    Object.keys(action.payload).forEach(orgId => {
                        tempState.organizations[orgId] = action.payload[orgId]
                    })

                    return tempState
                }
                case 'loading':
                    return {
                        ...state,
                        organizationsLoading: true,
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
                case 'loadError': {
                    return {
                        ...state,
                        selectedOrganization: {
                            ...state.selectedOrganization,
                            loadError: action.payload,
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
                case 'remindersLoaded': {
                    return {
                        ...state,
                        selectedOrganization: {
                            ...state.selectedOrganization,
                            remindersLoading: false,
                            reminders: action.payload,
                        },
                    }
                }
                case 'privateDataLoading': {
                    return {
                        ...state,
                        selectedOrganization: {
                            ...state.selectedOrganization,
                            organizationPrivateDataLoading: true,
                        },
                    }
                }
                case 'privateDataLoaded': {
                    return {
                        ...state,
                        selectedOrganization: {
                            ...state.selectedOrganization,
                            organizationPrivateDataLoading: false,
                            organizationPrivateData: action.payload,
                        },
                    }
                }
                case 'slackInstallsLoaded': {
                    return {
                        ...state,
                        selectedOrganization: {
                            ...state.selectedOrganization,
                            slackInstalls: action.payload,
                        },
                    }
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
