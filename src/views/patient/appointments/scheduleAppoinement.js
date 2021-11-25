import Select from  '../../../components/FormComps/Select';
import RadioGroup from  '../../../components/FormComps/RadioGroup';
import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import {Typography} from "@material-ui/core";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import axios from '../../../resources/axios';
import { useHistory } from 'react-router-dom';
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars';
import './appoinment-History.scss';
import MuiAlert from "@material-ui/lab/Alert";
import {NotificationManager} from 'react-notifications';



export default function ScheduleAppoinement(){
const [speciality, setSpecialist] = React.useState([]);

const [doctor, setDoctor] = React.useState([]);
const [method, setMethod] = React.useState([]);
const [payment, setPayment] = React.useState([]);
 useEffect(() => {
        getSpeciality();
    }, [])
    function getSpeciality() {
        axios.get('masterspeciality').then((resp) => {
                console.log(resp)
                setSpecialist(resp.data)
            })
        
    }
 
    useEffect(() => {
        getDoctor();
    }, [])
    function getDoctor() {
        axios.get('masterphysician').then((resp) => {
                    setDoctor(resp.data) 
            })
        
    }
    useEffect(() => {
        getMethod();
    }, [])
    function getMethod() {
        axios.get('method').then((resp) => {
                    setMethod(resp.data) 
            })
    }
    useEffect(() => {
        getPayment();
    }, [])
    function getPayment() {
        axios.get('paymentmethod').then((resp) => {
                    setPayment(resp.data) 
            })
        
    }

    console.log(doctor)
const[selectspeciality,setSpeciality]=useState('');
const[selectphysician,setPhysician]=useState('');
const[scheduletime, setTime] = useState(new Date().toISOString());
const[appoinmentmethod, setAppointmentMethod] = useState('');
const[paymentmethod, setPaymentMethod] = useState('');
const dateValue: Date = new Date(scheduletime);
const minDate: Date = new Date("02/05/2021 09:00 AM");
const maxDate: Date = new Date("02/06/2022 06:00 PM");


 const handleSpeciality = (event) => {
        setSpeciality(event.target.value);
    };
const handlePhysician = (event) => {
        setPhysician(event.target.value);
    };
const handleTime= (event) => {
        setTime(event.target.value);
    };
const handleMethod= (event) => {
        setAppointmentMethod(event.target.value);
    };
const handlePayment= (event) => {
        setPaymentMethod(event.target.value);
    };
const selectphys=selectphysician;

const [physicianname, setPhysicianName] = React.useState('');        
  useEffect(() => {
        axios.get(`/users/${selectphysician}`)
            .then(res => {
                console.log(res.data)
                setPhysicianName(res.data)
            })
    }, [])
let history = useHistory();
const handleSubmit = e => {
    e.preventDefault();
    const selectspecial=selectspeciality;
    const selectphys=selectphysician;
    const physician_name=physicianname;
    const selectappoinmentmethod=appoinmentmethod;
    const selectpaymentmethod=paymentmethod;
    const schedulet= new Date(scheduletime).toUTCString();
    const accessRole = localStorage.getItem('user_id');
    axios.post('/appointments', {
    user_id:accessRole,
    selectspeciality:selectspecial ,
    selectphysician:physician_name,
    physician_id:selectphys,
    scheduletime: schedulet,
    method:selectappoinmentmethod,
    paymentmethod:selectpaymentmethod,
    })
        .then(res => {
            NotificationManager.success("Scheduled Successfully");
            console.log(res.data)
           
        })
        .catch(err => {
            console.error(
                `Error! in login ${err.message}`
            );
        })
}


  
    return(
       <div>
           <center>
           <br/>
           <Box sx={{ flexGrow: 1 }}>
                    <Typography mt={2} variant="h6" >Schedule Appointments</Typography>
                    <br/>
                    <form onSubmit={handleSubmit}>
                    <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                        <Select label ="Select Speciality"
                            options={speciality}
                            onChange={handleSpeciality} / >
                        <br/><br/>
                            <Select label ="Select Physican"
                            options={doctor}
                            onChange={handlePhysician}
                            /><br/><br/>
                         <LocalizationProvider dateAdapter={AdapterDateFns}>
                           <DateTimePickerComponent placeholder="Choose a date and time"
                                value={dateValue}
                                min={minDate}
                                max={maxDate}
                                format="dd-MMM-yy hh:mm a"
                                step={60}
                                onChange={handleTime}></DateTimePickerComponent>
                                  </LocalizationProvider>
                            <br/><br/>
                           <RadioGroup
                            items={method}
                            onChange={handleMethod}
                            /> 
                             <Select label ="Select Payment"
                            options={payment}
                            onChange={handlePayment}
                         
                            /><br/><br/>
                        <Button variant="contained" type="submit" color="primary">Book Appointment</Button>
                          </FormControl>
                        </form>
                            </Box>
                            </center>
                            

         </div>       
    )
   
}