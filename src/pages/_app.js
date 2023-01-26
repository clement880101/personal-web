import { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Toolbar } from '@mui/material';
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";

import Head from 'next/head';
import Navbar from '../components/Navbar';
import Lightswitch from "../components/Lightswitch"

export default function MyApp({ Component, pageProps }) {
    const [darkMode, setDarkMode] = useState(true);
    const emotionCache = createEmotionCache();

    const theme = createTheme({
        palette: {
            mode: (darkMode) ? 'dark' : 'light',
        }
    });

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="theme-color" content="#000000" />
                    <meta name="clementc.dev" content="portfolio and blog by clement" />
                </Head>

                <CssBaseline />

                <Navbar darkMode={darkMode} />
                <Toolbar/>
                <Component {...pageProps} />
                <Lightswitch darkmode={darkMode} setDarkMode={setDarkMode} />
            </ThemeProvider>
        </CacheProvider>
    )
}