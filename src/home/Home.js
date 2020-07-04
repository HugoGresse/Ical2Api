import React from 'react'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'
import RequireLogin from '../auth/RequireLogin'

const Home = () => {
    // TODO : some stats about fetched event today and # of orga
    return (
        <>
            <RequireLogin displayLoginMessage={true}>
                <Button
                    to="/o"
                    component={RouterLink}
                    variant="outlined"
                    color="primary">
                    Manage organisations
                </Button>
            </RequireLogin>
        </>
    )
}

export default Home
