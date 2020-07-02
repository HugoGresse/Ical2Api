import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { useStateValue } from '../state/state'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

// Not really a great name
const ErrorTrucificator = () => {
    const [{ error }, dispatch] = useStateValue()

    const onClose = () => {
        dispatch({
            domain: 'error',
            type: 'delete',
        })
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={!!error}
            autoHideDuration={6000}
            onClose={onClose}
            message={error}
            action={
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={onClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        />
    )
}

export default ErrorTrucificator
