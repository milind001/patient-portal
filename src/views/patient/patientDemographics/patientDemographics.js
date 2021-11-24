import * as React from 'react';
import { Fragment, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { Button, TextField, Grid } from "@material-ui/core"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import TextareaAutosize from '@mui/material/TextareaAutosize';
import './patient-demographics.scss';
import axios from "../../../resources/axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import * as actions from '../../../store/action';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { NotificationManager } from "react-notifications";
import CancelIcon from '@mui/icons-material/Cancel';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteModal from "../../../components/Modal/deleteModal";

const PatientDemographics = () => {

    const dispatch = useDispatch();
    const[userId, setuserId] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [modalTitle, setModalTitle] = useState("Add User");
    const [modalButtonTitle, setModalButtonTitle] = useState("Add");
    const [gender, setGender] = React.useState('');
    const [errors, setError] = useState({});
    const [demographics, setDemographics] = React.useState([]);
    const [dob, setDOB] = useState(new Date());


    const getPhysicianData = useCallback(
        () => dispatch(actions.phyFetchDemographicData()),
        [dispatch]
    );

    const demographicDataRedux = useSelector(state => state.physician.demographicData);
    const editStatus = useSelector(state => state.physician.editStatus);

    //used for getting data in first render
    useEffect(() => {
        getPhysicianData();
    }, [getPhysicianData]);

    //used for setting data to state
    useEffect(() => {
        setDemographics(demographicDataRedux)
    }, [demographicDataRedux]);

    const deleteData=(userId)=>{
        setuserId(userId)
    }
    const handleClickCheck = () => {
        setOpen(!open);
        if(editStatus){
            reset();
        }
    };
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

    const handleValidation = () => {
        const { firstname, lastname, ethinicity, education, address, employment } = inputField;
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
        return formIsValid;
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (handleValidation()) {

        }
        const { firstname, lastname, ethinicity, education,
            employment, phoneNo,
            medicalHistory,
            familyMedicalHistory,
            surgeries,
            address,
            insurenceProvider } = inputField;
        const dateDOB = new Date(dob).toISOString();
            // console.log('editStatus', editStatus);
            
        if (!inputField.id) {
            // console.log('in Save')
            let phySaveData = {
                firstname: firstname,
                lastname: lastname,
                ethinicity: ethinicity,
                education: education,
                role: 1,
                dob: dateDOB,
                employment: employment,
                phoneNo: phoneNo,
                medicalHistory: medicalHistory,
                address: address,
                familyMedicalHistory: familyMedicalHistory,
                surgeries: surgeries,
                insurenceProvider: insurenceProvider
            };
            dispatch(actions.phySaveDemographicData(phySaveData))
            // getUserData();
        }
        if (inputField.id) {
            // console.log('in Edit')
            editUserData(inputField)
        }
        handleClickCheck();
    }
  
    const editUserData = (userData) => {
        setModalTitle("Edit User")
        setModalButtonTitle("Edit")
        setInputField({
            ...userData
        })
        dispatch(actions.phyEditDemographicData(userData.id, userData))
        NotificationManager.success("Information Edited Successfully");
    }

    // const getUserData = () => {
    //     setTimeout(() => {
    //         axios.get('/demographics')
    //             .then(res => {
    //                 setDemographics(res.data)
    //             }).catch(err => {
    //                 console.error(
    //                     `Error! in Demographicsc ${err.message}`
    //                 );
    //             })
    //     }, 500);
    // }
    
    const reset = () => {
        setModalTitle("Add User")
        setModalButtonTitle("Add")
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
    const openDeleteModal = () => {
        setOpenModal(!openModal);
    }
    return (
        <div className="main-container-1">
            <Button className="addData" onClick={handleClickCheck}>
                Add User
            </Button>
            <Dialog
                open={open}
                //onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{modalTitle}<CancelIcon className="closeModal" onClick={() => {handleClickCheck();reset();}} /></DialogTitle>
                <DialogContent>
                    <DialogContentText>

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

                                <Grid xs={12} md={4}>
                                    <TextField
                                        variant="outlined"
                                        label="Insurence Provider"
                                        placeholder="Enter Insurence Provider"
                                        type="text"
                                        value={inputField.insurenceProvider} id="insurenceProvider" onChange={inputHandler}
                                    />
                                </Grid>

                            </Grid>

                            <DialogActions>
                                <Button variant="contained" onClick={reset} >
                                    Reset
                                </Button>
                                <Button variant="contained" type="submit" color="primary">{modalButtonTitle}</Button>
                            </DialogActions>
                        </form>
                    </DialogContentText>
                </DialogContent>
            </Dialog>

            <Table className="commonTable">
                <TableHead>
                    <TableRow>
                        <TableCell>S.No</TableCell>
                        <TableCell>PatientId</TableCell>
                        <TableCell>Firstname</TableCell>
                        <TableCell>Lastname</TableCell>
                        <TableCell>Ethinicity</TableCell>
                        <TableCell>Eduction</TableCell>
                        <TableCell>Action</TableCell>

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
                            <TableCell>
                                <EditIcon color="primary" onClick={() => { editUserData(Data); handleClickCheck() }} />                                
                                <DeleteForeverIcon onClick={()=>{openDeleteModal();deleteData(Data.id)}} />
                                <RemoveRedEyeIcon />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {openModal && <DeleteModal userID={userId}/>}
        </div>
    )
}


export default PatientDemographics;