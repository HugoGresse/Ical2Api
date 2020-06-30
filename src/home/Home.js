import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            Interested in this project? Contact{' '}
            {process.env.REACT_APP_MAINTAINER}
            <br />
            <Link to="/a/login">Login</Link>
        </>
    )
}

export default Home
