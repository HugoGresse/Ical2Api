import fetch from 'node-fetch'

export const postMessageToSlack = (
    blocks: object[],
    slackWebHookUrl: string
) => {
    const postPromise = fetch(slackWebHookUrl, {
        method: 'POST',
        body: JSON.stringify({
            blocks: blocks,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return postPromise
        .then(res => {
            if (res.status > 399)
                console.log('Error sending slack reminder', res)
        })
        .catch(error =>
            console.error(`Error occured during Slack event: ${error}`)
        )
}
