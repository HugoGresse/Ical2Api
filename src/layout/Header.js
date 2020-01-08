import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useStateValue } from '../state/state'

const Header = () => {
    const [{ organization }] = useStateValue()

    const getTitle = organization => {
        if (organization.name) {
            return (
                <Box>
                    <Typography variant="h1" style={{ margin: '20px 0' }}>
                        {organization.name}
                    </Typography>

                    <Typography
                        variant="h6"
                        style={{
                            margin: '20px 0',
                            fontFamily: 'sans-serif',
                            color: '#aaa',
                        }}>
                        by Meetup2Api
                    </Typography>
                </Box>
            )
        }
        return (
            <Typography variant="h1" style={{ margin: '20px 0' }}>
                Meetup2Api
            </Typography>
        )
    }

    return (
        <Box display="flex" justifyContent="space-between">
            {getTitle(organization)}
        </Box>
    )
}

export default Header
