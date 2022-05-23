import {  useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline} from '@mui/material';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Lightswitch from './components/Lightswitch';
import Home from "./pages/Home";
import Contact from "./pages/Contact";

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
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Lightswitch darkmode={darkMode} setDarkMode={setDarkMode} />
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
