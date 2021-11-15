import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppRoutes from '../../routes/';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import PATH from '../../resources/slugs'; 
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

const mdTheme = createTheme();

const Layout = () => {

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };

    const menuItems = {
        patient: [
            { name: "Dashboard", link: PATH.dashboardp, icon: "../logo192.png" },
            { name: "Demography", link: PATH.patientdemographics, icon: "../logo192.png" },
            { name: "Patient Portal", link: PATH.patientportal, icon: "../logo192.png" }
        ],
        physician: [
            { name: "Dashboard", link: PATH.dashboardp },
            { name: "Appointments", link: PATH.dashboardp },
            { name: "Profile", link: PATH.dashboardp },
        ],
        admin: [
            { name: "Dashboard", link: PATH.dashboardp },
            { name: "Patients", link: PATH.dashboardp },
            { name: "Physicians", link: PATH.dashboardp },
        ]
    };

    return(
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header 
                    open={open} 
                    toggleDrawer={toggleDrawer} />
                <Sidebar
                    open={open}
                    toggleDrawer={toggleDrawer}
                    menuItems={menuItems.patient} />
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
};

export default Layout;