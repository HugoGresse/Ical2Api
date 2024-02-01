import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import React from 'react'
import { DialogContent } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

export function SimpleDialog({
    onCancel,
    open,
    title,
    children,
    maxWidth = 'sm',
    fullWidth = false,
}) {
    return (
        <Dialog
            onClose={onCancel}
            aria-labelledby="simple-dialog-title"
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            open={open}>
            <DialogTitle id="simple-dialog-title" disableTypography={true}>
                <Typography variant="h4">{title}</Typography>
            </DialogTitle>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    )
}
