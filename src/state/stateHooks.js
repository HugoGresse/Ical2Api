import { useStateValue } from './state'

export const useUser = () => {
    const [
        {
            auth: { loggedIn, user },
        },
    ] = useStateValue()
    return [loggedIn, user]
}

export const useSelectedOrganization = () => {
    const [{ selectedOrganization }] = useStateValue()
    return selectedOrganization
}

export const useOrganizationPrivateData = () => {
    const [
        {
            selectedOrganization: {
                organizationPrivateDataLoading,
                organizationPrivateData,
            },
        },
    ] = useStateValue()
    return [organizationPrivateDataLoading, organizationPrivateData]
}
