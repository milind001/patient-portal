
//Appointment History
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Typography, Grid } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PageviewIcon from '@mui/icons-material/Pageview';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from '../../resources/axios'


export default function AppoinmentHistory() {
    const [appointments, setAppointment] = React.useState([]);
    const [id, setId] = useState('');
    const [physician, setPhysician] = useState('');
    const [date, setDate] = useState('');
    const accessRole = localStorage.getItem('user_id');

    useEffect(() => {
        axios.get('/appointments')
            .then(res => {
                setAppointment(res.data)
            })


    }, [])
    const getAppoinments = () => {
        setTimeout(() => {
            axios.get('/appointments')
                .then(res => {
                    setAppointment(res.data)
                }).catch(err => {
                    console.error(
                        `Error! in appointments ${err.message}`
                    );
                })
        }, 500);
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const deleteUserData = (user) => {
        axios.delete(`/appointments/${user.id}`).then((resp) => {
            console.warn(resp)
            getAppoinments();

        })
    }
    return (
        <Container maxWidth="xl">



            <Typography variant="h6" className="head">Appointment History</Typography>


            <Table className="commonTable">
                <TableHead >
                    <TableRow >
                        <TableCell>Sr.No</TableCell>
                        <TableCell>Appointment Id</TableCell>
                        <TableCell>Patient Name</TableCell>
                        <TableCell>Appointment Date</TableCell>
                        <TableCell>Slot</TableCell>
                        <TableCell>Appointment Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>Apurva Deshpandey</TableCell>
                        <TableCell>26/11/2021</TableCell>
                        <TableCell>11AM-12PM</TableCell>
                        <TableCell>Video Call</TableCell>

                    </TableRow>
                    <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>Mahesh Pandey</TableCell>
                        <TableCell>26/11/2021</TableCell>
                        <TableCell>2PM-3PM</TableCell>
                        <TableCell>Video Call</TableCell>

                    </TableRow>


                </TableBody>
            </Table>


        </Container>
    );
}
