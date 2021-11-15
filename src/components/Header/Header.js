import React from 'react';
import { styled } from '@mui/material/styles';
import { Notifications , Menu } from '@mui/icons-material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';    

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
   
    return (
    <AppBar position="absolute" open={open}>
        <Toolbar
        sx={{
            pr: '24px', // keep right padding when drawer closed
        }}
        >
        <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
            }}
        >
            <Menu />
        </IconButton>
        <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
        >
            Dashboard
        </Typography>
        <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
            <Notifications />
            </Badge>
        </IconButton>
        </Toolbar>
    </AppBar>
)
};

export default Header;