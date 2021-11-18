import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppRoutes from '../../routes/';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import axios from '../../resources/axios';
import Spinner from '../../components/Spinner/Spinner' 
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

const mdTheme = createTheme();

const Layout = () => {

    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };
    const [menuRoutes, setMenuRoutes] = useState([]);
    const accessRole = localStorage.getItem('role');

    useEffect(() => {
        axios.get('/sidemenu')
        .then(res => {
            // console.log(res.data[0]);
            var role = {
                '1': () => setMenuRoutes(res.data[0].patient_routes),
                '2': () => setMenuRoutes(res.data[0].physician_routes),
                '3': () => setMenuRoutes(res.data[0].admin_routes)
            }
            role[accessRole]()
        })
        .catch(err => {
            console.log(err.message)
        })
    }, [accessRole]);

    let check = "";

    if(menuRoutes.length > 0) {
        check = (
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Header 
                        open={open} 
                        toggleDrawer={toggleDrawer} />
                    <Sidebar
                        open={open}
                        toggleDrawer={toggleDrawer}
                        menuItems={menuRoutes} />
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}>
                        <Toolbar />
                        <AppRoutes />
                    </Box>
                </Box>
            </ThemeProvider>
        );
    }else {
        check = <Spinner/>;
    }

    return check
};

export default Layout;