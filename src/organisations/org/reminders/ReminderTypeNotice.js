import React from 'react'
import Typography from '@material-ui/core/Typography'
import InfoIcon from '@material-ui/icons/Info'
import { ReminderType } from './remindersConstants'
import Box from '@material-ui/core/Box'

const ReminderTypeNotice = ({ reminderId }) => {
    return (
        <Box p={2} maxWidth={264}>
            <Box
                bgcolor="#DDD"
                borderRadius={4}
                px={1}
                pt={0.2}
                pb={1}
                maxWidth={264}
                margin={1}
                whiteSpace="normal">
                <Typography variant="body2">
                    <InfoIcon
                        style={{
                            top: 6,
                            marginRight: 6,
                            position: 'relative',
                        }}
                    />
                    {ReminderType[reminderId].desc}
                </Typography>
            </Box>
        </Box>
    )
}

export default ReminderTypeNotice
