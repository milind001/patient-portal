import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Notifications , Menu as MenuIcon } from '@mui/icons-material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';    

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/action';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const  Header = (props) => {
    
    const {open, toggleDrawer} = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  
    const isMenuOpen = Boolean(anchorEl);
  
    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };

    const dispatch = useDispatch();
    const authLogout = () => {
        dispatch(actions.authLogout());
    };
   
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={authLogout}>Logout</MenuItem>
      </Menu>
    );
  
    return (
    <AppBar position="absolute" open={open}>
        <Toolbar
        sx={{
            pr: '24px', // keep right padding when drawer closed
            backgroundColor: '#25568f'
        }}
        >
        <IconButton
            className="headerMenu"
            edge="start"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
            }}>
            <MenuIcon className="headerMenu" />
        </IconButton>
        <Typography
            className="headerMenu"
            component="h1"
            variant="h6"
            noWrap
            sx={{ flexGrow: 1 }}
        >
            Dashboard
        </Typography>
        <IconButton className="headerMenu">
            <Badge className="headerMenu" badgeContent={4} color="secondary">
            <Notifications />
            </Badge>
        </IconButton>        
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              className="headerMenu"
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle className="headerMenu" />
            </IconButton>
        </Box>
        {renderMenu}
        </Toolbar>
    </AppBar>
  
)
};

export default Header;