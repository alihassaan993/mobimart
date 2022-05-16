import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
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
  const [anchorElUser, setAnchorElUser] = useState(null);

   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
     //setLoginFlag(false);
     setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
     setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
     setAnchorElNav(null);
   };

   const handleCloseUserMenu = () => {
     setLoginFlag(false);
     setAnchorElUser(null);
   };
  return (
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Grid container>
           <Grid item>
             <Button color="inherit" onClick={()=>{setMenuItem(<Categories/>)}}>Category</Button>
             <Button color="inherit" onClick={()=>{setMenuItem(<Products/>)}}>Products</Button>
             <Button color="inherit" onClick={()=>{setMenuItem(<Orders/>)}}>Orders</Button>
             <Button color="inherit" onClick={()=>{setMenuItem(<Users/>)}}>Users</Button>
           </Grid>
           <Grid item sm>
           </Grid>
           <Grid item>

            <Box sx={{ flexGrow: 0 }}>
            <Badge badgeContent={4} color="secondary">
             <CircleNotificationsIcon color="white" fontSize="large" />
            </Badge>
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
          </Box>
           </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
  );
}
