import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from './components/Header';
import DreamList from './components/DreamList';
import DreamForm from './components/DreamForm';
import { v4 as uuidv4 } from 'uuid';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6a1b9a',
      light: '#9c4dcc',
      dark: '#38006b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff5722',
      light: '#ff8a50',
      dark: '#c41c00',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  const [dreams, setDreams] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  // Load dreams from localStorage on initial render
  useEffect(() => {
    const savedDreams = localStorage.getItem('dreams');
    if (savedDreams) {
      setDreams(JSON.parse(savedDreams));
    }
  }, []);

  // Save dreams to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dreams', JSON.stringify(dreams));
  }, [dreams]);

  // Add a new dream
  const addDream = (dream) => {
    const newDream = {
      id: uuidv4(),
      title: dream.title,
      description: dream.description,
      category: dream.category,
      priority: dream.priority,
      targetDate: dream.targetDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setDreams([...dreams, newDream]);
  };

  // Toggle dream completion status
  const toggleDreamCompleted = (id) => {
    setDreams(
      dreams.map((dream) =>
        dream.id === id ? { ...dream, completed: !dream.completed } : dream
      )
    );
  };

  // Delete a dream
  const deleteDream = (id) => {
    setDreams(dreams.filter((dream) => dream.id !== id));
  };

  // Edit a dream
  const editDream = (id, updatedDream) => {
    setDreams(
      dreams.map((dream) =>
        dream.id === id ? { ...dream, ...updatedDream } : dream
      )
    );
  };

  // Filter dreams based on activeFilter
  const filteredDreams = dreams.filter((dream) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return !dream.completed;
    if (activeFilter === 'completed') return dream.completed;
    return true;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Header activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <DreamForm addDream={addDream} />
          <DreamList
            dreams={filteredDreams}
            toggleDreamCompleted={toggleDreamCompleted}
            deleteDream={deleteDream}
            editDream={editDream}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App; 