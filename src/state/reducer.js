export const initialState = {
    icals: [],
    events: [],
    selectedOrganization: {
        id: null,
        icals: [],
        events: [],
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
                    return {
                        ...state,
                        auth: {
                            ...state.auth,
                            loggedIn: false,
                            user: null,
                        },
                    }
                default:
                    return state
            }
        case 'orgs':
            switch (action.type) {
                case 'loaded':
                    return {
                        ...state,
                        organizations: action.payload,
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
                            ...initialState,
                            id: action.payload.id,
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
                case 'icalsLoaded':
                    return {
                        ...state,
                        selectedOrganization: {
                            ...state.selectedOrganization,
                            icals: action.payload,
                        },
                    }
                case 'eventsLoaded':
                    return {
                        ...state,
                        selectedOrganization: {
                            ...state.selectedOrganization,
                            events: action.payload,
                        },
                    }
                default:
                    return state
            }
    }
}
