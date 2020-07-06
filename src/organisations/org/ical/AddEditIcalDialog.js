import React from 'react'
import { object, string } from 'yup'
import { Field, Form, Formik } from 'formik'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { TextField } from 'formik-material-ui'
import { editIcal, newIcal } from '../../actions/actions'
import { useStateValue } from '../../../state/state'
import { SimpleDialog } from '../../../sharedComponents/SimpleDialog'

const AddEditIcalDialog = ({ onCancel, open, ical }) => {
    const [
        {
            selectedOrganization: { id },
        },
        dispatch,
    ] = useStateValue()

    return (
        <SimpleDialog
            title={ical ? 'Editing ical' : 'New ical'}
            onCancel={onCancel}
            open={open}
            maxWidth="md"
            fullWidth={true}>
            <Formik
                validationSchema={object().shape({
                    name: string().required(
                        `Typing an iCal name will prevent "null" to be written everywhere. Null is bad.`
                    ),
                    url: string()
                        .url("This doesn't looks like an URL.")
                        .required(
                            `Without any iCal to fetch, what can I do? 🤔`
                        ),
                })}
                initialValues={ical || { name: '', url: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    const name = values.name.trim()
                    const url = values.url.trim()
                    if (ical) {
                        // Editing it
                        editIcal(
                            {
                                ...ical,
                                name: name,
                                url: url,
                            },
                            dispatch
                        ).then(() => {
                            setSubmitting(false)
                            onCancel()
                        })
                    } else {
                        newIcal(
                            {
                                name: name,
                                url: url,
                                organizationId: id,
                            },
                            dispatch
                        ).then(id => {
                            setSubmitting(false)
                            onCancel()
                        })
                    }
                }}>
                {({ isSubmitting }) => (
                    <Form method="POST">
                        <Field
                            component={TextField}
                            name="name"
                            type="text"
                            label="Name"
                            autoFocus={true}
                            fullWidth={true}
                            margin="normal"
                        />
                        <Field
                            component={TextField}
                            name="url"
                            type="text"
                            label="URL"
                            margin="normal"
                            fullWidth={true}
                        />

                        <Box textAlign="right" marginTop={1}>
                            <Button disabled={isSubmitting} type="submit">
                                {ical ? 'Save ical' : 'Add iCal'}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </SimpleDialog>
    )
}

export default AddEditIcalDialog
