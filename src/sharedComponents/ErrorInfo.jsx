import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

export const TYPE_ERROR = 'error'
const ErrorInfo = ({ type, errorMessage }) => {
    return (
        <Box marginBottom={1} marginTop={1} padding={2}>
            {type === TYPE_ERROR && (
                <Typography variant="h4">
                    Ooooooops, something went wrong{' '}
                </Typography>
            )}
            <Typography style={{ fontSize: 24 }}>{errorMessage}</Typography>
        </Box>
    )
}

export default ErrorInfo
