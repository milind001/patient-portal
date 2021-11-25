import React from "react";
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import './sidebar.scss';
import { DashboardRounded } from "@mui/icons-material";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
        }),
    },
    }),
);

const Sidebar = (props) => {

    const {open, menuItems = [], toggleDrawer } = props;

    return (
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
            <List style={{ display:'flex',flexDirection: 'column'}}>
                {menuItems.map(({name, link}, index) => (
                <Link to={link} key={name} className="side-menu-item-anch">
                    <ListItem className="side-menu-item">
                      <ListItemIcon style={{minWidth: '35px'}}>
                          <DashboardRounded/>
                      </ListItemIcon>
                      <ListItemText primary={name} />
                    </ListItem>
                </Link>
                ))}
            </List>
          <Divider />
        </Drawer>
    );
};

export default Sidebar;