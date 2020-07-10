import React, { useState } from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import { number, object, string } from 'yup'
import { Field, Form, Formik } from 'formik'
import { Select, TextField } from 'formik-material-ui'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { ReminderType } from './remindersConstants'
import FormHelperText from '@material-ui/core/FormHelperText'
import Link from '@material-ui/core/Link'
import InputAdornment from '@material-ui/core/InputAdornment'
import { DAYS } from '../../../utils/date'
import MenuItem from '@material-ui/core/MenuItem'

const ReminderAddEdit = ({ reminderType, reminder, onSubmit }) => {
    const [expanded, setExpanded] = useState(true)

    const editMode = !!reminder

    return (
        <Formik
            validationSchema={getFormSchema(reminderType)}
            initialValues={getInitialValue(reminderType, editMode, reminder)}
            onSubmit={(values, { setSubmitting }) => {
                console.log('values', values)

                return onSubmit().then(id => {
                    setSubmitting(false)
                })
            }}>
            {({ isSubmitting }) => (
                <Form
                    method="POST"
                    style={{ display: 'flex', flexDirection: 'column' }}>
                    {getFields(reminderType)}

                    <Field
                        component={TextField}
                        name="slackWebHook"
                        type="text"
                        margin="normal"
                        label="Slack WebHook URL"
                    />
                    <FormHelperText id="slackWebHook-helper">
                        Follow the 3 steps of the{' '}
                        <Link href="https://api.slack.com/incoming-webhooks">
                            Slack documentation
                        </Link>{' '}
                        to get the Incoming Web Hook URL and choose the channel.
                    </FormHelperText>

                    <Accordion
                        expanded={expanded}
                        onChange={() => setExpanded(!expanded)}
                        style={{ marginTop: 16 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="advanced-settings"
                            id="advanced-settings">
                            <Typography>Advanced settings</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box display="flex" flexDirection="column" flex={1}>
                                <Field
                                    component={TextField}
                                    name="language"
                                    type="text"
                                    label="Language (for the date & times)"
                                />
                                <Field
                                    component={TextField}
                                    name="timezone"
                                    type="text"
                                    margin="normal"
                                    label="Timezone"
                                />
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Box textAlign="right" marginTop={1}>
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            variant="contained"
                            color="primary">
                            {editMode ? 'Save reminder' : 'Add reminder'}
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}

const getFormSchema = reminderType => {
    const baseSchema = {
        type: string().required(`You are trying to hack my code? You dog 🐕!`),
        language: string().required(
            `We need to know in which language to format the reminder, you don't want any Klinton there 👽`
        ),
        timezone: string().required(
            `Timezone at used to sent the reminder at the correct time from your position or a custom one. Kind of useful so!`
        ),
        slackWebHook: string().required(
            `Adding a reminder without something to notify is useless, isn't it? 🤔`
        ),
    }
    switch (reminderType) {
        case ReminderType.hour.id:
            return object().shape({
                ...baseSchema,
                hours: number().required(
                    `We need to know how much hour to sent the reminder before the event 🕰`
                ),
            })
        case ReminderType.weekly.id:
            return object().shape({
                ...baseSchema,
                weekday: number().required(
                    `Which day should be sent the sum up of the week? No day, no reminder, no 🍫`
                ),
                hours: number().required(
                    `We need to know how much hour to sent the reminder before the event 🕰`
                ),
            })
        case ReminderType.created.id:
            return object().shape(baseSchema)
        default:
            console.error('Not managed schema type: ' + reminderType)
            return {}
    }
}

const getFields = reminderType => {
    switch (reminderType) {
        case ReminderType.hour.id:
            return (
                <Field
                    component={TextField}
                    name="hours"
                    type="number"
                    margin="normal"
                    label="Number of hours to trigger the reminder before the event"
                />
            )
        case ReminderType.weekly.id:
            return (
                <>
                    <Field
                        component={TextField}
                        name="weekday"
                        type="text"
                        margin="normal"
                        label="On day do you want the sum up of the week?"
                        select={true}>
                        {DAYS.map((day, index) => (
                            <MenuItem value={index + 1}>{day}</MenuItem>
                        ))}
                    </Field>
                    <Field
                        component={TextField}
                        name="hours"
                        type="number"
                        margin="normal"
                        label="Number of hours to trigger the reminder before the event"
                    />
                </>
            )
        case ReminderType.created.id:
            return ''
        default:
            console.error('Not managed schema type: ' + reminderType)
            return {}
    }
}

const getInitialValue = (reminderType, editMode, reminder) => {
    const baseValues = {
        type: reminderType,
        language: editMode ? reminder.language : 'TOOD',
        timezone: editMode ? reminder.timezone : 'TOOD',
        slackWebHook: editMode ? reminder.slackWebHook : 'TOOD',
    }

    switch (reminderType) {
        case ReminderType.hour.id:
            return {
                ...baseValues,
                hours: editMode ? reminder.hours : null,
            }
        case ReminderType.weekly.id:
            return {
                ...baseValues,
                weekday: editMode ? reminder.weekday : 1,
                hours: editMode ? reminder.hours : null,
            }
        case ReminderType.created.id:
            return baseValues
        default:
            console.error(
                'Not managed schema type for getInitialValue: ' + reminderType
            )
            return {}
    }
}

export default ReminderAddEdit
