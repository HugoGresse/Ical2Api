import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useStateValue } from '../../state/state'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import Avatar from '@material-ui/core/Avatar'
import MenuItem from '@material-ui/core/MenuItem'
import { Link, useHistory } from 'react-router-dom'
import { COLORS } from '../../contants'

const UserLayout = ({ user }) => {
    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null)

    if (!user) {
        return <Link to="/a/login">Login</Link>
    }

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleLogOut = () => {
        setAnchorEl(null)
        history.push('/a/logout')
    }

    const visualId = user.displayName || user.email
    const avatar = user.photoURL

    return (
        <>
            <Button onClick={handleClick}>
                <Typography>{visualId}</Typography>
                <Avatar alt={visualId} src={avatar} style={{ marginLeft: 8 }} />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}>
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
        </>
    )
}

const Header = () => {
    const history = useHistory()
    const [
        {
            selectedOrganization: { id },
            organizations,
            auth: { user },
        },
    ] = useStateValue()

    const getTitle = organization => {
        if (organization && organization.name) {
            return (
                <>
                    <Box>
                        <Typography
                            variant="h1"
                            component={Link}
                            to={`/o/${organization.id}`}
                            style={{
                                margin: '20px 0',
                                textDecoration: 'none',
                                color: COLORS.PRIMARY,
                            }}>
                            {organization.name}
                        </Typography>

                        <Typography
                            variant="h6"
                            style={{
                                margin: '20px 0',
                                fontFamily: 'sans-serif',
                                color: '#aaa',
                            }}>
                            by Ical2Api
                        </Typography>
                    </Box>

                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center">
                        <UserLayout user={user} />
                    </Box>
                </>
            )
        }
        return (
            <>
                <Typography
                    variant="h1"
                    style={{ margin: '20px 0' }}
                    onClick={() => history.push('/')}>
                    Ical2Api
                </Typography>
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center">
                    <UserLayout user={user} />
                </Box>
            </>
        )
    }

    return (
        <Box display="flex" justifyContent="space-between">
            {getTitle(organizations[id])}
        </Box>
    )
}

export default Header
