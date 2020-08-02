import Container from '@material-ui/core/Container'
import React from 'react'
import Header from '../organisations/layout/Header'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Footer from './Footer'

const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            light: 'rgb(255,85,82)',
            main: '#e52520',
            dark: '#ba1d19',
            contrastText: '#fff',
        },
    },
    typography: {
        h1: {
            fontFamily: 'Handlee, cursive, sans-serif',
            fontSize: '3rem',
            fontWeight: 800,
        },
        h2: {
            fontFamily: 'Handlee, cursive, sans-serif',
            fontWeight: 800,
        },
        h3: {
            fontFamily: 'Handlee, cursive, sans-serif',
            fontWeight: 800,
        },
        h4: {
            fontFamily: 'Handlee, cursive, sans-serif',
            fontWeight: 800,
        },
        h5: {
            fontFamily: 'Handlee, cursive, sans-serif',
        },
        h6: {
            fontFamily: 'Handlee, cursive, sans-serif',
            fontSize: '1rem',
        },
    },
})

const AppLayout = ({ children }) => {
    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Container maxWidth="lg">
                    <Header />
                    <Box bgcolor="#eee" borderRadius={10} padding={3}>
                        {children}
                    </Box>
                    <Footer />
                </Container>
            </ThemeProvider>
        </>
    )
}

export default AppLayout
