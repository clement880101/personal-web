import {  useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline} from '@mui/material';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Lightswitch from './components/Lightswitch';
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Project from './pages/Project';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const theme = createTheme({palette:{
      mode: (darkMode) ? 'dark':'light',
    }
  });

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project" element={<Project />} />
          </Routes>
          <Lightswitch darkmode={darkMode} setDarkMode={setDarkMode} />
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
