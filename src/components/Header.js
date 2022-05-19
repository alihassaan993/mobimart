import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Grid,Badge} from '@material-ui/core';
import {myStyle} from '../styles.js';
import {useState} from 'react';
import {Products} from './Products/Products.js'
import {Orders} from './Orders/Orders.js'
import {Categories} from './Categories/Categories.js'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FaceIcon from '@mui/icons-material/Face';

import {Users} from './Users/Users';

const settings = ['Logout'];

export function Header(props) {
  const classes=myStyle();
  const {setMenuItem,setLoginFlag}=props;

  const [setAnchorElNav] = useState(null);
  const [anchor, setAnchor] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
     //setLoginFlag(false);
     setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
     setAnchorElUser(event.currentTarget);
   };

  const handleOpenProductMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

   const handleCloseNavMenu = () => {
     setAnchorElNav(null);
   };

   

   const handleCloseUserMenu = () => {
     setAnchorElUser(null);
     setAnchor(null);
   };
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon onClick={handleOpenProductMenu}/>
          <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchor}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchor)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={()=>{setMenuItem(<Categories/>);setAnchor(null);}}>Category</MenuItem>
                <MenuItem onClick={()=>{setMenuItem(<Products/>);setAnchor(null);}}>Product</MenuItem>
                <MenuItem onClick={()=>{setMenuItem(<Orders/>);setAnchor(null);}}>Orders</MenuItem>
                <MenuItem onClick={()=>{setMenuItem(<Users/>);setAnchor(null);}}>Users</MenuItem>

            </Menu>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MobiMart BackOffice
        </Typography>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <FaceIcon fontSize="large" style={{ color: 'white' }}/>
          </IconButton>
        </Tooltip>
        <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
      </Toolbar>
    </AppBar>
  </Box>

  );
}
