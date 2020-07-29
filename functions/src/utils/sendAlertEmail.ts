import * as FormData from 'form-data'
import fetch, { Response } from 'node-fetch'
import * as functions from 'firebase-functions'

interface MailgunConfig {
    key: string
    domain: string
    api: string
}

export const sendAlertEmail = (
    subject: string,
    body: string
): Promise<Error | Response | string> => {
    const { maintener, mailgun } = functions.config()

    if (!mailgun || !mailgun.key || !mailgun.api || !mailgun.domain) {
        console.warn(
            'Mailgun configuration mailgun.key or mailgun.domain or mailgun.api not found.'
        )
        return Promise.resolve('Email with Mailgun is optional')
    }
    const mailgunConfig = mailgun as MailgunConfig
    if (!maintener || !maintener.email) {
        console.warn('No Maintener')
        return Promise.resolve('Maintener missing')
    }

    // eslint-disable-next-line no-undef
    const token = Buffer.from(`api:${mailgunConfig.key}`).toString('base64')
    const from = `ICAL2API <ical2api@${mailgunConfig.domain}>`
    const form = new FormData()
    form.append('from', from)
    form.append('subject', subject)
    form.append('html', body)
    form.append('to', maintener.email)

    // eslint-disable-next-line no-console
    console.info(`Send email "${subject}" to ${maintener.email}`)

    return fetch(`${mailgunConfig.api}`, {
        headers: { Authorization: `Basic ${token}` },
        method: 'POST',
        body: form,
    })
}
