import React, { useEffect, useState } from 'react'
import { Field } from 'formik'
import { TextField } from 'formik-material-ui'
import MenuItem from '@material-ui/core/MenuItem'
import { useSlackInstalls } from '../../../state/stateHooks'
import AddIcon from '@material-ui/icons/Add'
import { SimpleDialog } from '../../../sharedComponents/SimpleDialog'
import NewWindow from 'react-new-window'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'

export const NEW = 1
const SlackChannelPickerField = ({ organizationId, setFieldValue }) => {
    const [addDialogDisplayed, setAddDialogDisplayed] = useState(false)
    const slackInstalls = useSlackInstalls()

    const slackUrl = `${process.env.REACT_APP_SLACK_URL}&state=${organizationId}`

    useEffect(() => {
        window.slackResult = installId => {
            const slackInstall = slackInstalls
                .filter(install => install.id === installId)
                .pop()

            if (slackInstall) {
                setFieldValue('slackWebHook', slackInstall.webHookUrl)
            }
            setAddDialogDisplayed(false)
        }

        return () => {
            window.slackResult = () => {}
        }
    }, [slackInstalls, setFieldValue])

    return (
        <>
            <Field
                component={TextField}
                name="slackWebHook"
                type="text"
                margin="normal"
                label="Slack channel"
                select={true}>
                {slackInstalls.map(install => {
                    return (
                        <MenuItem key={install.id} value={install.webHookUrl}>
                            #{install.channel}
                            <span style={{ color: '#888', whiteSpace: 'pre' }}>
                                {' '}
                                - {install.teamName}
                            </span>
                        </MenuItem>
                    )
                })}

                <MenuItem
                    key={NEW}
                    value={NEW}
                    onClick={() => setAddDialogDisplayed(true)}>
                    <AddIcon /> Select a new Slack channel
                </MenuItem>
            </Field>

            <SimpleDialog
                onCancel={() => setAddDialogDisplayed(false)}
                open={addDialogDisplayed}
                title="New Slack channel">
                <Box display="flex" alignItems="center">
                    {addDialogDisplayed && <NewWindow url={slackUrl} />}
                    Waiting for a new Slack channel...
                    <CircularProgress
                        style={{
                            position: 'relative',
                            top: 13,
                            marginBottom: 30,
                        }}
                    />
                </Box>
            </SimpleDialog>
        </>
    )
}

export default SlackChannelPickerField
