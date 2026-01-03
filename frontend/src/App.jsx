import { Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import Navbar from './components/Navbar.jsx';
import { useColorModeValue } from '@chakra-ui/react';

function App() {
  return (
    /*
      Box component to hold the entire app
      minH: minimum height of 100vh to cover full viewport height
      bg: background color based on color mode
        - gray.100 for light mode
        - gray.900 for dark mode
    */
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      {/* Navbar */}
      <Navbar />
        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          
        </Routes>
    </Box>
  );
}

export default App
