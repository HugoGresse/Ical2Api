import React from 'react'
import { Field, Form, Formik } from 'formik'
import { object, string } from 'yup'
import { TextField } from 'formik-material-ui'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { updateOrganization } from '../../actions/actions'
import DeleteOrg from './DeleteOrg'

const OrgSettingsForm = ({ org, dispatch }) => {
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
                        id: org.id,
                    },
                    dispatch
                ).then(() => {
                    setSubmitting(false)
                })
            }>
            {({ isSubmitting }) => (
                <Form method="POST">
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
                        <DeleteOrg
                            org={org}
                            isSubmitting={isSubmitting}
                            dispatch={dispatch}
                        />

                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            variant="contained">
                            Save
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}

export default OrgSettingsForm
