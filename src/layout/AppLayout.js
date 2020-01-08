import Container from '@material-ui/core/Container'
import React from 'react'
import Header from './Header'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Footer from './Footer'

const theme = createMuiTheme({
    typography: {
        h1: {
            fontFamily: 'Pacifico, cursive, sans-serif',
            fontSize: '3rem',
        },
        h2: {
            fontFamily: 'Pacifico, cursive, sans-serif',
        },
        h3: {
            fontFamily: 'Pacifico, cursive, sans-serif',
        },
        h4: {
            fontFamily: 'Pacifico, cursive, sans-serif',
        },
        h5: {
            fontFamily: 'Pacifico, cursive, sans-serif',
        },
        h6: {
            fontFamily: 'Pacifico, cursive, sans-serif',
            fontSize: '1rem',
        },
    },
})

const AppLayout = ({ children }) => {
    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Container fixed>
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
