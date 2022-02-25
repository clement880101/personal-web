import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Box } from '@mui/material';

import TopNav from './components/top-nav';

import Home from "./pages/Home";
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Box sx={{width:"100vw"}}>
        <TopNav/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="*" element={<Home/>} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
