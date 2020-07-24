import React, { createContext, useContext, useReducer } from 'react'

export const StateContext = createContext()

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext)

export const useUser = () => {
    const [
        {
            auth: { loggedIn, user },
        },
    ] = useStateValue()
    return [loggedIn, user]
}
