import { Fragment, useState } from "react"
import DateFnsUtils from '@date-io/date-fns';
import { Button, TextField, Typography, Grid } from "@material-ui/core"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import * as React from 'react';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import axios from '../../resources/axios'
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

import Dialog from '@material-ui/core/Dialog';

import { NotificationManager } from "react-notifications";
import CancelIcon from '@mui/icons-material/Cancel';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


import ViewModal from "../../components/Modal/viewModal";
const ScheduledApoointment = () => {
    const [data, setData] = React.useState({});
    const deleteData = (data) => {

        setData(data)
    }
    const [open, setOpen] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [viewModal, setViewModal] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [modalTitle, setModalTitle] = useState("Add User");
    const [modalButtonTitle, setModalButtonTitle] = useState("Add");
    const [gender, setGender] = React.useState('');
    const [errors, setError] = useState({});
    const [demographics, setDemographics] = React.useState([]);
    const [medication, setMedication] = React.useState([]);
    const [dob, setDOB] = useState(new Date());
    const handleChange = (event) => {
        //setGender(event.target.value);
        setGender({ value: event.target.value });

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
        gender: ''
    })
    const inputHandler = e => {
        const { id, value } = e.target;
        console.log(e.target);
        setInputField(prevState => ({
            ...prevState,
            [id]: value
        }));
    };
    // view data
    useEffect(() => {
        axios.get('/demographics')
            .then(res => {
                setDemographics(res.data)
            })
    }, [demographics])
    useEffect(() => {
        axios.get('/patient-medication2')
            .then(res => {
                setMedication(res.data)
            })
    }, [medication])


    // const handleSubmit = e => {

    //     e.preventDefault();

    //     if (handleValidation()) {

    //     }
    //     const { firstname, lastname, ethinicity, education,
    //         employment, phoneNo,
    //         medicalHistory,
    //         familyMedicalHistory,
    //         surgeries,
    //         address,
    //         insurenceProvider, gender } = inputField;
    //     console.log("input data", inputField);
    //     const dateDOB = new Date(dob).toISOString();
    //     if (!inputField.id) {

    //         axios.post('/demographics', {
    //             firstname: firstname,
    //             lastname: lastname,
    //             ethinicity: ethinicity,
    //             education: education,
    //             role: 1,
    //             dob: dateDOB,
    //             employment: employment,
    //             phoneNo: phoneNo,
    //             medicalHistory: medicalHistory,
    //             address: address,
    //             familyMedicalHistory: familyMedicalHistory,
    //             surgeries: surgeries,
    //             insurenceProvider: insurenceProvider,
    //             gender: gender
    //         })
    //         NotificationManager.success("User Added Successfully");
    //         getUserData();
    //     }
    //     if (inputField.id) {
    //         editUserData(inputField)
    //         NotificationManager.success("Information Edited Successfully");
    //     }

    //     handleClose()

    // }

    // const editUserData = (userData) => {

    //     setModalTitle("Edit User")
    //     setModalButtonTitle("Edit")
    //     setInputField({
    //         ...userData
    //     })
    //     axios.put('/demographics' + '/' + userData.id, userData)

    //     getUserData();

    // }
    const getUserData = () => {
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
    // const reset = () => {
    //     setInputField({
    //         firstname: '',
    //         lastname: '',
    //         ethinicity: '',
    //         education: '',
    //         employment: '',
    //         address: '',
    //         phoneNo: '',
    //         medicalHistory: '',
    //         familyMedicalHistory: '',
    //         surgeries: '',
    //         insurenceProvider: '',
    //         gender: ''
    //     });
    // }
    // const openDeleteModal = () => {
    //     setOpenModal(!false);
    // }
    // const openViewModal = () => {
    //     setViewModal(!false);
    // }
    return (
        <div className="main-container-1">

            {/* <Dialog
                className="commonModal"
                open={open}
                
                aria-labelledby="responsive-dialog-title"
            >
                <div className="modalHeader">{modalTitle}<CancelIcon className="closeModal" onClick={() => { handleClose(); reset() }} /></div>
                <div class="modalBody">

                    <form className="main-form-container" onSubmit={handleSubmit} autoComplete="off">
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="First Name"
                                    placeholder="Enter First Name"
                                    type="text"
                                    value={inputField.firstname} id="firstname" onChange={inputHandler}
                                    error={errors["firstname"] ? true : false}
                                    helperText={errors["firstname"] ? errors["firstname"] : ''}
                                />

                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="Last Name"
                                    placeholder="Enter Last Name"
                                    type="text"
                                    value={inputField.lastname} id="lastname" onChange={inputHandler}
                                    error={errors["lastname"] ? true : false}
                                    helperText={errors["lastname"] ? errors["lastname"] : ''}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Fragment>
                                        <KeyboardDatePicker fullWidth
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

                            <Grid item xs={12} md={4}>

                               
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
                                    <Select fullWidth
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={gender}
                                        onChange={handleChange}
                                        label="Gender"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="other">Others</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="Ethinicity/Race"
                                    placeholder="Enter Ethinicity/Race"
                                    type="text"
                                    value={inputField.ethinicity} id="ethinicity" onChange={inputHandler}
                                    error={errors["ethinicity"] ? true : false}
                                    helperText={errors["ethinicity"] ? errors["ethinicity"] : ''}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="Education"
                                    placeholder="Enter Education details"
                                    type="text"
                                    value={inputField.education} id="education" onChange={inputHandler}
                                    error={errors["education"] ? true : false}
                                    helperText={errors["education"] ? errors["education"] : ''}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="Employment"
                                    placeholder="Enter Employment details"
                                    type="text"
                                    value={inputField.employment} id="employment" onChange={inputHandler}
                                    error={errors["employment"] ? true : false}
                                    helperText={errors["employment"] ? errors["employment"] : ''}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} fullWidth>
                                <TextareaAutosize fullWidth
                                    aria-label="minimum height"
                                    minRows={3}
                                    placeholder="Address"
                                    className="address"
                                    value={inputField.address} id="address" onChange={inputHandler}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="Phone Number"
                                    placeholder="Enter Phone Number"
                                    type="number"
                                    value={inputField.phoneNo} id="phoneNo" onChange={inputHandler}

                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="Medical History"
                                    placeholder="Enter Medical History"
                                    type="text"
                                    value={inputField.medicalHistory} id="medicalHistory" onChange={inputHandler}

                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="Family Medical History"
                                    placeholder="Enter Family Medical History"
                                    type="text"
                                    value={inputField.familyMedicalHistory} id="familyMedicalHistory" onChange={inputHandler}

                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="Surgeries"
                                    placeholder="Enter Surgeries"
                                    type="text"
                                    value={inputField.surgeries} id="surgeries" onChange={inputHandler}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="Insurence Provider"
                                    placeholder="Enter Insurence Provider"
                                    type="text"
                                    value={inputField.insurenceProvider} id="insurenceProvider" onChange={inputHandler}
                                />
                            </Grid>

                        </Grid>
                        <Grid item xs={12} md={12} className="buttomWrapper">
                            <Button variant="contained" type="submit" color="primary">{modalButtonTitle}</Button>
                            <Button variant="contained" onClick={reset} >
                                Reset
                            </Button>

                        </Grid>
                    </form>
                </div>
            </Dialog> */}
            <Table className="commonTable">
                <TableHead>
                    <TableRow>
                        <TableCell>S.No</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Current Medication</TableCell>
                        <TableCell>Drug Allergies</TableCell>
                        <TableCell>Herbs</TableCell>
                        <TableCell>OTC Medication</TableCell>
                        <TableCell>Oher Allergies</TableCell>
                        <TableCell>Past Medication</TableCell>
                        <TableCell>Social Drugs</TableCell>


                    </TableRow>
                </TableHead>
                <TableBody>


                <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Apurva Deshpandey</TableCell>
                    <TableCell>Paredrine</TableCell>
                    <TableCell>Dog</TableCell>
                    <TableCell>NA</TableCell>
                    <TableCell>Paredrine</TableCell>
                    <TableCell>NA</TableCell>
                    <TableCell>Disprin</TableCell>
                    <TableCell>NA</TableCell>

                </TableRow>
                <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>Mahesh Pandey</TableCell>
                    <TableCell>NA</TableCell>
                    <TableCell>NA</TableCell>
                    <TableCell>NA</TableCell>
                    <TableCell>Paredrine</TableCell>
                    <TableCell>NA</TableCell>
                    <TableCell>NA</TableCell>
                    <TableCell>NA</TableCell>

                </TableRow>

            </TableBody>
        </Table>

            { viewModal && <ViewModal Data={data} /> }
        </div >
    )
}


export default ScheduledApoointment;