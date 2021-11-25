import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import {Typography,Grid} from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PageviewIcon from '@mui/icons-material/Pageview';
import './appoinment-History.scss'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from  '../../../resources/axios';
import Pagination from '@mui/material/Pagination';


export default function ScheduledAppoinment() {
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
    const getAppoinments = ()=>{
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
     
      <center><br/>

       <Typography variant="h6" className="head">Scheduled Appoinment</Typography><br/>
      
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell align="left" style={{fontSize:20}}>Appoinment Id</TableCell>
            <TableCell align="left"style={{fontSize:20}}>Physician</TableCell>
            <TableCell align="left"style={{fontSize:20}}>Date</TableCell>
            <TableCell align="left"style={{fontSize:20}}>Status</TableCell>
            <TableCell align="left"style={{fontSize:20}}>Appoinment Type</TableCell>
            <TableCell align="left"style={{fontSize:20}}>Payment Method</TableCell>
            <TableCell align="left"style={{fontSize:20}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((Data, index)=> (
            Data.user_id === accessRole ? (
            <TableRow key={Data}>
              <TableCell align="left" style={{fontSize:15}}> {Data.id}</TableCell>
              <TableCell align="left" style={{fontSize:15}}>{"Dr. Rahul"}</TableCell>
              <TableCell align="left" style={{fontSize:15}}>{Data.scheduletime}</TableCell>
              <TableCell align="left" style={{fontSize:15}}>{"Scheduled"}</TableCell>
              <TableCell align="left" style={{fontSize:15}}>{Data.method=="1"?"Face To Face":"Video"}</TableCell>
               <TableCell align="left" style={{fontSize:15}}>{Data.paymentmethod=="1"?"Online Payment":"Cash Only"}</TableCell>
              <TableCell align="left">
               {/* <IconButton aria-label="edit" size="medium" onClick={handleOpen}>
                <EditIcon fontSize="inherit" />
                </IconButton>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                    </Box> 
                </Modal>*/}

                <IconButton aria-label="delete" size="medium" onClick={() => deleteUserData(Data)}>
                <DeleteIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
            </TableRow>):null
          
          ))}
         
        </TableBody>
      </Table>
    </TableContainer>
    </center>
    </Container>
  );
}
