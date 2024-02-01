import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { Field, useField } from 'formik'
import { TextField } from 'formik-material-ui'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import AutoRenewIcon from '@material-ui/icons/Autorenew'
import Button from '@material-ui/core/Button'
import { newId } from '../utils/string'
import { SimpleDialog } from './SimpleDialog'

const TokenTextField = ({ name, label, onChange, confirmDialogContent }) => {
    const [field] = useField(name)
    const [dialogOpen, setDialogOpen] = useState(false)

    const onTokenRenewAsked = () => {
        setDialogOpen(true)
    }

    const renewToken = () => {
        setDialogOpen(false)
        onChange(name, newId())
    }

    const copyToken = () => {
        navigator.clipboard.writeText(field.value).then(
            () => {
                // Nothing to do
            },
            () => {
                console.error('Failed to copy token to clipboard')
            }
        )
    }

    return (
        <Grid container alignItems="center" component={Box} marginTop={2}>
            <Grid item xs={10}>
                <Field
                    component={TextField}
                    name={name}
                    type="text"
                    label={label}
                    fullWidth={true}
                />
            </Grid>
            <Grid item xs={1}>
                <IconButton
                    aria-label="Renew read token"
                    component="span"
                    size="small"
                    onClick={onTokenRenewAsked}>
                    <AutoRenewIcon />
                </IconButton>
                <SimpleDialog
                    title={`${label} renew`}
                    onCancel={() => setDialogOpen(false)}
                    open={dialogOpen}
                    maxWidth="sm"
                    fullWidth={true}>
                    {confirmDialogContent}

                    <Box
                        display="flex"
                        marginTop={1}
                        justifyContent="space-between">
                        <Button>Cancel</Button>
                        <Button
                            onClick={renewToken}
                            variant="outlined"
                            color="secondary">
                            Renew {label}
                        </Button>
                    </Box>
                </SimpleDialog>
            </Grid>
            <Grid item xs={1}>
                <Button
                    aria-label="Renew read token"
                    component="span"
                    size="small"
                    onClick={copyToken}>
                    COPY
                </Button>
            </Grid>
        </Grid>
    )
}

export default TokenTextField
