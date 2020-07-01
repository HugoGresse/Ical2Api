import React, { useEffect } from 'react'
import IcalApp from './ical/IcalApp'
import { useStateValue } from '../state/state'
import { useParams } from 'react-router-dom'

const OrganizationDetail = () => {
    let { organizationId } = useParams()
    const [, dispatch] = useStateValue()

    useEffect(() => {
        dispatch({
            domain: 'org',
            type: 'selected',
            payload: { id: organizationId },
        })
    }, [dispatch, organizationId])

    return <IcalApp />
}

export default OrganizationDetail
