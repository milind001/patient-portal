import { Fragment, useState } from "react"
import DateFnsUtils from '@date-io/date-fns';
import { Button, TextField, Typography, Grid } from "@material-ui/core"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import * as React from 'react';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import './patient-demographics.scss';
import axios from "../../../resources/axios";
import { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const PatientDemographics = () => {
   
    const [gender, setGender] = React.useState('');
    const [errors, setError] = useState({});
    const [demographics, setDemographics] = React.useState([]);
    const [dob, setDOB] = useState(new Date());
    const handleChange = (event) => {
        setGender(event.target.value);

    };
    const [inputField, setInputField] = useState({
        firstname: '',
        lastname: '',
        ethinicity: '',
        education: '',
        employment: '',
        address: '',
        phoneNo: '',
        medicalHistory: '',
        familyMedicalHistory: '',
        surgeries: '',
        insurenceProvider: '',
        gender:''
    })
    const inputHandler = e => {
        const { id, value } = e.target;
        setInputField(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    useEffect(() => {
        axios.get('/demographics')
            .then(res => {
                setDemographics(res.data)
            })
    }, [])
  
    const handleValidation = () => {
        const { firstname, lastname, ethinicity, education,address,employment} = inputField;
        let errors = {};
        let formIsValid = true;

        if (!firstname) {
            errors["firstname"] = "Firstname is required!";
            formIsValid = false;
        }
        if (!lastname) {
            errors["lastname"] = "Lastname is required!";
            formIsValid = false;
        }
        if (!ethinicity) {
            errors["ethinicity"] = "Ethinicity is required!";
            formIsValid = false;
        }
        if (!employment) {
            errors["employment"] = "Employment is required!";
            formIsValid = false;
        }
        if (!education) {
            errors["education"] = "Education is required!";
            formIsValid = false;
        }
        if (!address) {
            console.log('coming to address validation')
            errors["address"] = "Address required!";
            formIsValid = false;
        }
        setError(errors);
        console.log('errors', errors, 'firstname', errors["firstname"]);
        return formIsValid;
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        if (handleValidation()) {
         
        }
        const { firstname, lastname, ethinicity, education,
            employment,phoneNo,
            medicalHistory,
            familyMedicalHistory,
            surgeries,
            address,
            insurenceProvider} = inputField;
        const dateDOB = new Date(dob).toISOString();
        if (!inputField.id && Object.keys(errors).length !== 0) {
            axios.post('/demographics', {
                firstname: firstname,
                lastname: lastname,
                ethinicity: ethinicity,
                education: education,
                role: 1,
                dob: dateDOB,
                employment:employment,
                phoneNo:phoneNo,
                medicalHistory:medicalHistory,
                address:address,
                familyMedicalHistory:familyMedicalHistory,
                surgeries:surgeries,
                insurenceProvider:insurenceProvider
            })
            getUserData();
        }
        if (inputField.id) {
            editUserData(inputField)
        }
        // reset();

    }
    const deleteUserData = (user) => {
        axios.delete('/demographics' + '/' + user.id)
       getUserData();
     }
    const editUserData = (userData) => {
        setInputField({
            ...userData
        })
        axios.put('/demographics' + '/' + userData.id, userData)
           getUserData();
    }
    const getUserData = ()=>{
        setTimeout(() => {
            axios.get('/demographics')
                .then(res => {
                    setDemographics(res.data)
                }).catch(err => {
                    console.error(
                        `Error! in Demographicsc ${err.message}`
                    );
                })
        }, 500);
    }
    const reset = () => {
        setInputField({
            firstname: '',
            lastname: '',
            ethinicity: '',
            education: '',
            employment: '',
            address: '',
            phoneNo: '',
            medicalHistory: '',
            familyMedicalHistory: '',
            surgeries: '',
            insurenceProvider: '',
        });
    }
    return (
        <div className="main-container-1">
            <Box
                // component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '80%' },

                }}
                noValidate
                autoComplete="off"
            >
                <center>
                    <Typography variant="h6">Patient Demographics</Typography>
                    <form className="main-form-container" onSubmit={handleSubmit} >
                        <Grid container spacing={1}>
                            <Grid xs={12} md={4}>
                                <TextField
                                    variant="outlined"
                                    label="First Name"
                                    placeholder="Enter First Name"
                                    type="text"
                                    value={inputField.firstname} id="firstname" onChange={inputHandler}
                                    error={errors["firstname"] ? true : false}
                                    helperText={errors["firstname"] ? errors["firstname"] : ''}
                                />
                            </Grid>
                            <Grid xs={12} md={4}>
                                <TextField
                                    variant="outlined"
                                    label="Last Name"
                                    placeholder="Enter Last Name"
                                    type="text"
                                    value={inputField.lastname} id="lastname" onChange={inputHandler}
                                    error={errors["lastname"] ? true : false}
                                    helperText={errors["lastname"] ? errors["lastname"] : ''}
                                />
                            </Grid>
                            <Grid xs={12} md={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Fragment>
                            <KeyboardDatePicker
                                autoOk
                                label="DOB"
                                id="dob"
                                inputVariant="outlined"
                                variant="inline"
                                format="dd/MM/yyyy"
                                value={dob}
                                onChange={date => setDOB(date)}
                                
                                />
                        </Fragment>
                    </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid xs={12} md={4}>

                            <FormControl className="simple-select">
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={gender}
                                    label="Gender"
                                    onChange={handleChange}
                                >
                                <MenuItem >Male</MenuItem>
                                <MenuItem >Female</MenuItem>
                                <MenuItem >Others</MenuItem>
                                </Select>
                            </FormControl>


                                {/* <FormControl className="simple-select">
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={gender}
                                        label="Gender"
                                        onChange={handleChange}
                                    >
                                        <MenuItem >Male</MenuItem>
                                        <MenuItem >Female</MenuItem>
                                        <MenuItem >Others</MenuItem>
                                    </Select>
                                    </FormControl > */}
                            </Grid>
                            <Grid xs={12} md={4}>
                                <TextField
                                    variant="outlined"
                                    label="Ethinicity/Race"
                                    placeholder="Enter Ethinicity/Race"
                                    type="text"
                                    value={inputField.ethinicity} id="ethinicity" onChange={inputHandler}
                                    error={errors["ethinicity"] ? true : false}
                                    helperText={errors["ethinicity"] ? errors["ethinicity"] : ''}
                                />
                            </Grid>
                            <Grid xs={12} md={4}>
                                <TextField
                                    variant="outlined"
                                    label="Education"
                                    placeholder="Enter Education details"
                                    type="text"
                                    value={inputField.education} id="education" onChange={inputHandler}
                                    error={errors["education"] ? true : false}
                                    helperText={errors["education"] ? errors["education"] : ''}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid xs={12} md={4}>
                                <TextField
                                    variant="outlined"
                                    label="Employment"
                                    placeholder="Enter Employment details"
                                    type="text"
                                    value={inputField.employment} id="employment" onChange={inputHandler}
                                    error={errors["employment"] ? true : false}
                                    helperText={errors["employment"] ? errors["employment"] : ''}
                                />
                            </Grid>
                            <Grid xs={12} md={4}>
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={3}
                                    placeholder="Address"
                                    className="address"
                                    value={inputField.address} id="address" onChange={inputHandler}
                                />
                            </Grid>
                            <Grid xs={12} md={4}>
                                <TextField
                                    variant="outlined"
                                    label="Phone Number"
                                    placeholder="Enter Phone Number"
                                    type="number"
                                    value={inputField.phoneNo} id="phoneNo" onChange={inputHandler}

                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid xs={12} md={4}>
                                <TextField
                                    variant="outlined"
                                    label="Medical History"
                                    placeholder="Enter Medical History"
                                    type="text"
                                    value={inputField.medicalHistory} id="medicalHistory" onChange={inputHandler}

                                />
                            </Grid>
                            <Grid xs={12} md={4}>
                                <TextField
                                    variant="outlined"
                                    label="Family Medical History"
                                    placeholder="Enter Family Medical History"
                                    type="text"
                                    value={inputField.familyMedicalHistory} id="familyMedicalHistory" onChange={inputHandler}

                                />
                            </Grid>
                            <Grid xs={12} md={4}>
                                <TextField
                                    variant="outlined"
                                    label="Surgeries"
                                    placeholder="Enter Surgeries"
                                    type="text"
                                    value={inputField.surgeries} id="surgeries" onChange={inputHandler}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid xs={12} md={4}>
                                <TextField
                                    variant="outlined"
                                    label="Insurence Provider"
                                    placeholder="Enter Insurence Provider"
                                    type="text"
                                    value={inputField.insurenceProvider} id="insurenceProvider" onChange={inputHandler}
                                />
                            </Grid>
                            <Grid xs={12} md={4}>

                            </Grid>
                            <Grid xs={12} md={4}>

                            </Grid>
                        </Grid>
                        <br />
                        <center>
                            <Button variant="contained" type="submit">Submit</Button>
                        </center>
                    </form>
                </center>

            </Box>
            <h1>Edit Details
            </h1>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell><h3>S.No</h3></TableCell>
                        <TableCell><h3>PatientId</h3></TableCell>
                        <TableCell><h3>Firstname</h3></TableCell>
                        <TableCell><h3>Lastname</h3></TableCell>
                        <TableCell><h3>Ethinicity</h3></TableCell>
                        <TableCell><h3>Eduction</h3></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {demographics.map((Data, index) => (
                        <TableRow key={index}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{Data.id}</TableCell>
                            <TableCell>{Data.firstname}</TableCell>
                            <TableCell>{Data.lastname}</TableCell>
                            <TableCell>{Data.ethinicity}</TableCell>
                            <TableCell>{Data.education}</TableCell>
                            <TableCell><button onClick={() => editUserData(Data)}><EditIcon /></button></TableCell>
                            {/* <TableCell ><button onClick={() => deleteUserData(Data)}><DeleteForeverIcon /></button></TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}


export default PatientDemographics;