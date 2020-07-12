import React, { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { object, string } from 'yup'
import { TextField } from 'formik-material-ui'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { deleteOrganization, updateOrganization } from '../../actions/actions'
import { useStateValue } from '../../../state/state'
import { CircularProgress } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { SimpleDialog } from '../../../sharedComponents/SimpleDialog'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'

const OrgSettings = () => {
    const history = useHistory()
    const [
        {
            selectedOrganization: { id },
            organizations,
        },
        dispatch,
    ] = useStateValue()
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [deleteInProgress, setDeleteInProgress] = useState(false)

    if (!id || !organizations[id]) {
        return <CircularProgress />
    }

    const onDeleteWanted = () => {
        setDeleteDialogOpen(true)
    }

    const onDeleteOrg = async () => {
        setDeleteInProgress(true)
        try {
            const success = await deleteOrganization(id, dispatch)
            if (success) {
                history.push('/')
            }
        } catch (error) {
            setDeleteInProgress(false)
        }
    }

    const org = organizations[id]

    return (
        <Formik
            validationSchema={object().shape({
                name: string().required(`Hey, I see you 👀, fill this!`),
            })}
            initialValues={{ name: org.name }}
            onSubmit={(values, { setSubmitting }) =>
                updateOrganization(
                    {
                        name: values.name.trim(),
                        id: id,
                    },
                    dispatch
                ).then(() => {
                    setSubmitting(false)
                })
            }>
            {({ isSubmitting }) => (
                <Form method="POST">
                    <Box maxWidth={400}>
                        <Field
                            component={TextField}
                            name="name"
                            type="text"
                            label="Organization name"
                            fullWidth={true}
                        />
                        <Box
                            display="flex"
                            marginTop={1}
                            justifyContent="space-between">
                            <Button
                                disabled={isSubmitting}
                                onClick={onDeleteWanted}
                                variant="outlined"
                                color="secondary"
                                startIcon={<DeleteIcon />}>
                                Delete organization
                            </Button>

                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                variant="contained">
                                Save
                            </Button>
                        </Box>
                    </Box>
                    <SimpleDialog
                        title="Delete confirm"
                        onCancel={() => setDeleteDialogOpen(false)}
                        open={deleteDialogOpen}>
                        <Typography>
                            Are you sure you want to delete the organization{' '}
                            {org.name}? This will also delete all events,
                            reminders & icals.
                        </Typography>

                        <Box
                            display="flex"
                            marginTop={1}
                            justifyContent="space-between">
                            <Button
                                onClick={() => setDeleteDialogOpen(false)}
                                disabled={deleteInProgress}
                                variant="contained">
                                Cancel
                            </Button>

                            <Button
                                onClick={onDeleteOrg}
                                variant="contained"
                                color="secondary"
                                disabled={deleteInProgress}
                                startIcon={!deleteInProgress && <DeleteIcon />}>
                                {deleteInProgress && (
                                    <CircularProgress
                                        style={{ width: 20, height: 20 }}
                                    />
                                )}{' '}
                                I agree, delete org, events, icals, reminders.
                            </Button>
                        </Box>
                    </SimpleDialog>
                </Form>
            )}
        </Formik>
    )
}

export default OrgSettings
