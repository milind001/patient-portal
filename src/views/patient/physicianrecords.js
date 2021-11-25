import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import axios from '../../resources/axios';
import TableHeading from './tableHead';
import Container from '@mui/material/Container';
import {Typography,Grid} from "@material-ui/core";

  
  export default function PhysicianRecord() {

    const rowHeader = ["Physician Name", "Contact No", "Email ID", "Speciality", "Appointment"]
    const [tableData, setTableData] = useState([])

    useEffect(()=> {
            axios.get('users')
            .then(res => {
                setTableData(res.data)
            }) 
            .catch(err => {
                console.error(
                `Error! in Fetching data ${err.message}`
                );
            })
        } , [] 
    )

    Object.keys(tableData).map((row)=>(
        console.log(row)
    ))
    

    return (
     <Container maxWidth="xl">
      <center><br/>
        <Typography variant="h6" className="head">Physician Records</Typography><br/><br/>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHeading header={rowHeader}/>
          <TableBody>
            {Object.keys(tableData).map((row) => {
                if(tableData[row].role === 2){
                    return (
                        <TableRow
                          key={tableData[row].id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell scope="row">
                            {tableData[row].firstname} {tableData[row].lastname}
                          </TableCell>
                          <TableCell>{tableData[row].mobile}</TableCell>
                          <TableCell>{tableData[row].email}</TableCell>
                          <TableCell>{"Orthopaedics"}</TableCell>
                          <TableCell>{"28/12/2021"}</TableCell>
                        </TableRow>
                      )
                }
                else{
                    return null
                }
            })}
          </TableBody>
        </Table>
      </TableContainer>
        </center>
    </Container>
    );
  }