import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';

const Header = ({ activeFilter, setActiveFilter }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <CloudQueueIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          我的梦想清单
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <ButtonGroup variant="contained" color="primary">
            <Button 
              onClick={() => setActiveFilter('all')}
              sx={{ 
                bgcolor: activeFilter === 'all' ? 'primary.dark' : 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' }
              }}
            >
              全部
            </Button>
            <Button 
              onClick={() => setActiveFilter('active')}
              sx={{ 
                bgcolor: activeFilter === 'active' ? 'primary.dark' : 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' }
              }}
            >
              进行中
            </Button>
            <Button 
              onClick={() => setActiveFilter('completed')}
              sx={{ 
                bgcolor: activeFilter === 'completed' ? 'primary.dark' : 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' }
              }}
            >
              已完成
            </Button>
          </ButtonGroup>
        </Box>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <ButtonGroup variant="text" color="inherit" size="small">
            <Button 
              onClick={() => setActiveFilter('all')}
              sx={{ 
                color: activeFilter === 'all' ? 'secondary.light' : 'inherit'
              }}
            >
              全部
            </Button>
            <Button 
              onClick={() => setActiveFilter('active')}
              sx={{ 
                color: activeFilter === 'active' ? 'secondary.light' : 'inherit'
              }}
            >
              进行中
            </Button>
            <Button 
              onClick={() => setActiveFilter('completed')}
              sx={{ 
                color: activeFilter === 'completed' ? 'secondary.light' : 'inherit'
              }}
            >
              已完成
            </Button>
          </ButtonGroup>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 