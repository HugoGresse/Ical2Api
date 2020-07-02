import React, { useState } from 'react'
import { object, string } from 'yup'
import { SimpleDialog } from '../../sharedComponents/SimpleDialog'
import { Field, Form, Formik } from 'formik'
import { useStateValue } from '../../state/state'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { TextField } from 'formik-material-ui'
import { newOrganization } from '../actions/actions'
import { Redirect } from 'react-router-dom'

const NewOrganization = ({ onCancel, open }) => {
    const [
        {
            auth: { user },
        },
        dispatch,
    ] = useStateValue()
    const [newOrgId, setNewOrgId] = useState(null)

    return (
        <SimpleDialog title="New organization" onCancel={onCancel} open={open}>
            <Formik
                validationSchema={object().shape({
                    name: string().required(
                        `👋 ${user.name}, can you consider filling me in? This is really required!`
                    ),
                })}
                initialValues={{ name: '' }}
                onSubmit={(values, { setSubmitting }) =>
                    newOrganization(
                        {
                            name: values.name.trim(),
                            owner: user.uid,
                            members: [user.uid],
                        },
                        dispatch
                    ).then(id => {
                        setSubmitting(false)
                        if (id) setNewOrgId(id)
                    })
                }>
                {({ isSubmitting }) => (
                    <Form method="POST">
                        <Field
                            component={TextField}
                            name="name"
                            type="text"
                            label="Organization name"
                            autoFocus={true}
                            fullWidth={true}
                        />

                        <Box textAlign="right" marginTop={1}>
                            <Button disabled={isSubmitting} type="submit">
                                Create organization
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>

            {newOrgId && <Redirect to={`/o/${newOrgId}`} />}
        </SimpleDialog>
    )
}

export default NewOrganization
