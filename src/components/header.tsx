import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Header() {
  return ( 
     <Box sx={{ flexGrow: 1 }} className="mb-4">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Estudiar * Mexico City
          </Typography>
          <Button color="inherit">Back to Edvisor for Agents</Button>
        </Toolbar>
      </AppBar>
    </Box>
    ) 
     
    }

export default Header;