import { useEffect } from 'react'
import { listenForOrganizationPrivateData } from '../../actions/organization.actions'
import { useStateValue } from '../../../state/state'

const OrgPrivateDataLoading = ({ children, organizationId }) => {
    const [, dispatch] = useStateValue()

    useEffect(() => {
        if (!organizationId) {
            return
        }

        const unsubscribe = listenForOrganizationPrivateData(
            dispatch,
            organizationId
        )

        return () => {
            unsubscribe()
        }
    }, [dispatch, organizationId])

    return children
}

export default OrgPrivateDataLoading
