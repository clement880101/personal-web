import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Toolbar } from '@mui/material';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Lightswitch from './components/Lightswitch';
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Projects from './pages/Projects';
import Articles from './pages/Articles';
import ArticlePage from './pages/ArticlePage'
import About from './pages/About';
import Notfound from './pages/Notfound';
import Endnote from './components/Endnote';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobile, setMobile] = useState(window.innerWidth <= 768)


  const theme = createTheme({
    palette: {
      mode: (darkMode) ? 'dark' : 'light',
    }
  });

  function handleResize() {
    setMobile(window.innerWidth <= 768)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar mobile={mobile} />
        <Toolbar />
        <Routes>
          <Route exact path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact mobile={mobile}/>} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About mobile={mobile}/>} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:articleID" element={<ArticlePage />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <Lightswitch darkmode={darkMode} setDarkMode={setDarkMode} />
        <Endnote />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
