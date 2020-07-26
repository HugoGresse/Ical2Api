import React, { useState } from 'react'
import { bool, object, string } from 'yup'
import { Field, Form, Formik } from 'formik'
import { Switch } from 'formik-material-ui'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import FormHelperText from '@material-ui/core/FormHelperText'
import TokenTextField from '../../../sharedComponents/TokenTextField'
import { newId } from '../../../utils/string'
import Typography from '@material-ui/core/Typography'
import { getShareableEventUrl } from '../../../UseRoutingMap'
import { updateOrganizationPrivateData } from '../../actions/organization.actions'

const AccessControlForm = ({
    organization,
    organizationPrivateData,
    dispatch,
    user,
}) => {
    const copyReadUrl = url => {
        navigator.clipboard.writeText(url).then(
            () => {
                // Nothing to do
            },
            () => {
                console.error('Failed to copy token to clipboard')
            }
        )
    }

    return (
        <>
            <Formik
                validationSchema={object().shape({
                    public: bool().required(
                        `You need to choose either the organization is public or private`
                    ),
                    readToken: string().required(
                        `We are missing some 🔑🗝🔐🔒 read token!`
                    ),
                    writeToken: string().required(
                        `Write token are soooo important, did you forgot to add one? `
                    ),
                })}
                initialValues={{
                    public: organization.public,
                    readToken: organizationPrivateData.readToken || newId(),
                    writeToken: organizationPrivateData.writeToken || newId(),
                }}
                onSubmit={(values, { setSubmitting }) =>
                    updateOrganizationPrivateData(
                        dispatch,
                        organization.id,
                        values,
                        user,
                        organizationPrivateData
                    ).then(() => {
                        setSubmitting(false)
                    })
                }>
                {({ isSubmitting, values, setFieldValue }) => (
                    <Form method="POST">
                        <Box
                            padding={1}
                            mb={1}
                            border="2px solid #e0e0e0"
                            borderRadius={4}>
                            <Typography>Upcoming event page URL</Typography>
                            <Typography
                                style={{
                                    background: '#FFF',
                                    padding: 4,
                                    fontFamily: 'monospace',
                                    borderRadius: 4,
                                    wordBreak: 'break-all',
                                }}>
                                {getShareableEventUrl(
                                    organization,
                                    organizationPrivateData
                                )}
                            </Typography>
                            <Button onClick={copyReadUrl}>COPY</Button>
                        </Box>

                        <FormControlLabel
                            control={
                                <Grid
                                    component="label"
                                    container
                                    alignItems="center"
                                    spacing={1}>
                                    <Grid item>private</Grid>
                                    <Grid item>
                                        <Field
                                            component={Switch}
                                            name="public"
                                            type="checkbox"
                                        />
                                    </Grid>
                                    <Grid item>public</Grid>
                                </Grid>
                            }
                            label={
                                <Box minWidth={200}>
                                    Organization visibility
                                </Box>
                            }
                            labelPlacement="start"
                            style={{ marginLeft: 0, width: '100%' }}
                        />

                        <FormHelperText>
                            private: user with a given link can read the
                            organization & events (secured via token at your
                            discretion)
                        </FormHelperText>

                        <br />
                        {values.public && (
                            <ChangeTokenNotice
                                firestoreTimestamp={
                                    organizationPrivateData.readTokenChangeAt
                                }
                                user={
                                    organizationPrivateData.readTokenChangeUser
                                }
                            />
                        )}

                        {!values.public && (
                            <>
                                <TokenTextField
                                    name="readToken"
                                    label="Read token"
                                    onChange={(fieldName, newToken) =>
                                        setFieldValue(fieldName, newToken)
                                    }
                                    confirmDialogContent={
                                        readTokenDialogContent
                                    }
                                />

                                <ChangeTokenNotice
                                    firestoreTimestamp={
                                        organizationPrivateData.readTokenChangeAt
                                    }
                                    user={
                                        organizationPrivateData.readTokenChangeUser
                                    }
                                />

                                <TokenTextField
                                    name="writeToken"
                                    label="Write token"
                                    onChange={(fieldName, newToken) =>
                                        setFieldValue(fieldName, newToken)
                                    }
                                    confirmDialogContent={
                                        writeTokenDialogContent
                                    }
                                />

                                <ChangeTokenNotice
                                    firestoreTimestamp={
                                        organizationPrivateData.readTokenChangeAt
                                    }
                                    user={
                                        organizationPrivateData.readTokenChangeUser
                                    }
                                />
                            </>
                        )}

                        <Box
                            display="flex"
                            marginTop={1}
                            justifyContent="space-between">
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                color="primary"
                                variant="contained">
                                Save
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </>
    )
}

const readTokenDialogContent = (
    <Typography>
        You are about the renew the <b>Read Token</b>. Everyone with the URL to
        access this organization & events will be unable to access it until you
        communicate the new one with them.
        <br />
        This will also impact the API <b>Read</b> access.
        <br />
        Don't forget to save the token change when the dialog is closed.
    </Typography>
)

const writeTokenDialogContent = (
    <Typography>
        You are about the renew the <b>Write Token</b>. This will only impact
        the API usage to write to the organization.
        <br />
        Don't forget to save the token change when the dialog is closed.
    </Typography>
)

const ChangeTokenNotice = ({ firestoreTimestamp, user }) => {
    if (!firestoreTimestamp || !user) {
        return ''
    }
    return (
        <FormHelperText>
            Last change on{' '}
            {firestoreTimestamp.toDate().toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
            })}{' '}
            by {user}
        </FormHelperText>
    )
}

export default AccessControlForm
