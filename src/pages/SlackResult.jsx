import { useEffect } from 'react'
import { useQuery } from '../utils/router'

const SlackResult = () => {
    const query = useQuery()
    const slackInstallId = query.get('slackInstallId')

    useEffect(() => {
        if (!window.opener) {
            return
        }

        window.opener.slackResult(slackInstallId)
        window.close()
    }, [slackInstallId])

    if (slackInstallId) {
        return 'Slack channel received, closing this now...'
    }

    return 'Something went wrong'
}

export default SlackResult
