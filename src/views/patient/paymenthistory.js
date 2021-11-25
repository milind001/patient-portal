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
import axios from  '../../resources/axios';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import IconButton from '@mui/material/IconButton';



export default function PaymentHistory() {
const[paymenthistory,setPaymentHistory]=useState([]);
const accessRole = localStorage.getItem('user_id');
useEffect(() => {
        axios.get('/paymenthistory')
            .then(res => {
                setPaymentHistory(res.data)
            })
    }, [])
  return (
      <Container maxWidth="xl">
     
      <center><br/>

       <Typography variant="h6" className="head">Payment History</Typography><br/>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" style={{fontSize:20}}>S.No</TableCell>
            <TableCell align="left" style={{fontSize:20}}>Appoinment Id</TableCell>
            <TableCell align="left" style={{fontSize:20}}>Date</TableCell>
            <TableCell align="left" style={{fontSize:20}}>Amount</TableCell>
            <TableCell align="left" style={{fontSize:20}}>Download Invoice</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymenthistory.map((Data, index)=> (
            Data.user_id === accessRole ? (
            <TableRow key={Data}>
              <TableCell align="left" style={{fontSize:15}}>{Data.id}</TableCell>
              <TableCell align="left" style={{fontSize:15}}>{Data.appoinment_id}</TableCell>
              <TableCell align="left" style={{fontSize:15}}>{Data.date}</TableCell>
              <TableCell align="left" style={{fontSize:15}}>{Data.amount}</TableCell>
              <TableCell align="left">
              <IconButton aria-label="edit" size="medium" >
                 <FileDownloadIcon fontSize="inherit" />
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
