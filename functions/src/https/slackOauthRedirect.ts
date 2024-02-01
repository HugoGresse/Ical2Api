import * as functions from 'firebase-functions'
import fetch from 'node-fetch'
import { URLSearchParams } from 'url'
import { db, serverTimestamp } from '../utils/initFirebase'
import { OrganizationId } from '../types/Organization'

export const slackOauthRedirect = functions.https.onRequest(
    async (request, response): Promise<void> => {
        const { slack } = functions.config()

        if (!slack || !slack.client_id || !slack.client_secret) {
            console.error(
                'Missing slack credentials (client_id or client_secret)'
            )
            response.status(501).send('Missing slack credentials')
            return
        }

        if (request.method !== 'GET') {
            console.error(
                'Got unsupported ${request.method} request. Expected GET.'
            )
            response.status(405).send('Only GET requests are accepted')
            return
        }

        // SSL_CHECK by slack to confirm SSL cert
        if (request.query && request.query.ssl_check === '1') {
            console.log('Confirmed SSL Cert')
            response.status(200).send()
            return
        }

        // @ts-ignore
        if (!request.query && !request.query.code && !request.query.status) {
            response.status(401).send("Missing query attribute 'code'")
            return
        }

        const [organizationId] = request.query.state.split(',')

        if (!organizationId) {
            response.status(401).send('Missing required attribute')
            return
        }

        const params = new URLSearchParams()
        params.append('code', `${request.query.code}`)
        params.append('client_id', `${slack.client_id}`)
        params.append('client_secret', `${slack.client_secret}`)
        params.append(
            'redirect_uri',
            `https://us-central1-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/slackOauthRedirect`
        )

        const result = await fetch('https://slack.com/api/oauth.v2.access', {
            method: 'POST',
            body: params,
        })

        if (!result.ok) {
            console.error('The request was not ok: ' + JSON.stringify(result))
            response
                .header(
                    'Location',
                    `https://${process.env.GCLOUD_PROJECT}.web.app`
                )
                .send(302)
            return
        }

        const slackResultData = await result.json()
        const installId = await saveNewInstallation(
            organizationId,
            slackResultData
        )

        response
            .header(
                'Location',
                `https://${process.env.GCLOUD_PROJECT}.web.app/slackResult?slackInstallId=${installId}`
            )
            .sendStatus(302)
        return
    }
)

export const saveNewInstallation = async (
    organizationId: OrganizationId,
    slackResultData: {
        team: {
            id: string
            name: string
        }
        access_token: string
        incoming_webhook: {
            url: string
            channel: string
            channel_id: string
        }
    }
): Promise<string> => {
    return await db
        .collection('slackInstallations')
        .add({
            token: slackResultData.access_token,
            teamId: slackResultData.team.id,
            teamName: slackResultData.team.name,
            webHookUrl: slackResultData.incoming_webhook.url,
            channelId: slackResultData.incoming_webhook.channel_id,
            channel: slackResultData.incoming_webhook.channel,
            createdAt: serverTimestamp(),
            organizationId,
        })
        .then((ref) => ref.id)
}
