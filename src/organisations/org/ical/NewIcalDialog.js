import React from 'react'
import { object, string } from 'yup'
import { Field, Form, Formik } from 'formik'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { TextField } from 'formik-material-ui'
import { newIcal } from '../../actions/actions'
import { useStateValue } from '../../../state/state'
import { SimpleDialog } from '../../../sharedComponents/SimpleDialog'

const NewIcalDialog = ({ onCancel, open }) => {
    const [
        {
            selectedOrganization: { id },
        },
        dispatch,
    ] = useStateValue()

    return (
        <SimpleDialog title="New iCal" onCancel={onCancel} open={open}>
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
                initialValues={{ name: '', url: '' }}
                onSubmit={(values, { setSubmitting }) =>
                    newIcal(
                        {
                            name: values.name.trim(),
                            url: values.url.trim(),
                            organizationId: id,
                        },
                        dispatch
                    ).then(id => {
                        setSubmitting(false)
                        onCancel()
                    })
                }>
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
                                Add iCal
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </SimpleDialog>
    )
}

export default NewIcalDialog
