import React from 'react'
import { Field, Form, Formik } from 'formik'
import { object, string } from 'yup'
import { TextField } from 'formik-material-ui'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { updateOrganization } from '../../actions/actions'
import { useStateValue } from '../../../state/state'
import { CircularProgress } from '@material-ui/core'

const OrgSettings = () => {
    const [
        {
            selectedOrganization: { id },
            organizations,
        },
        dispatch,
    ] = useStateValue()

    if (!id || !organizations[id]) {
        return <CircularProgress />
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
                        <Box textAlign="right" marginTop={1}>
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                variant="contained">
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}

export default OrgSettings
