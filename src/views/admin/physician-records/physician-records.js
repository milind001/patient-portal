import { Fragment, useState } from "react"
import { Button, TextField, Typography, Grid } from "@material-ui/core"
import * as React from 'react';
import axios from "../../../resources/axios";
import { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from '@material-ui/core/Dialog';
// import * as actions from '../../../../store/action';
import { NotificationManager } from "react-notifications";
import CancelIcon from '@mui/icons-material/Cancel';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteModal from "../../../components/Modal/deleteModal";
import ViewModal from "../../../components/Modal/viewModal";
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
const PatientRecords = () => {
    //     const dispatch = useDispatch();
    //     const [diagnoses, setDiagnoses] = React.useState([]);
    //     const getcall = React.useCallback(

    //     () => dispatch(actions.mDiagnosesGetCall()),

    //     [dispatch]

    // );
    // useEffect(() => { getcall();}, [getcall]); 

    // const getdataVal = useSelector((state) => state.mAllergiesReducer.getcallData)


    // useEffect(()=>{
    //     setDiagnoses(getdataVal);
    //     },[getdataVal])
    const [data, setData] = React.useState({});
    const deleteData = (data) => {

        setData(data)
    }
   
    const [open, setOpen] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [viewModal, setViewModal] = React.useState(false);
    const [userData, setUsersData] = React.useState([]);
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

    const [dob, setDOB] = useState(new Date());
    const handleChange = (event) => {
        console.log('gender', event.target.value)
        setGender(event.target.value);

    };
    const [inputField, setInputField] = useState({
        firstname: '',
        lastname: '',
        mobile: '',
        role:''
        // gender: ''
    })
    const inputHandler = e => {
        console.log('gender--->', e.target)
        const { id, value } = e.target;
        console.log(e.target);
        setInputField(prevState => ({
            ...prevState,
            [id]: value
        }));
    };
    useEffect(() => {
        let patientDetails = [];
        axios.get('/users')
            .then(res => {
                res.data.forEach((values) => {
                    if (values.role == 2) {
                        patientDetails.push(values);
                    }
                })
                console.log('res data----> patientInfo', patientDetails);
                setUsersData(patientDetails);
            })

    }, [])


    const handleValidation = () => {
        const { firstname, lastname, mobile } = inputField;
        let errors = {};
        let formIsValid = true;

        if (!firstname) {
            errors["firstname"] = "firstname is required!";
            formIsValid = false;
        }
        if (!lastname) {
            errors["lastname"] = "lastname is required!";
            formIsValid = false;
        }
        if (!mobile) {
            errors["mobile"] = "mobile is required!";
            formIsValid = false;
        }
        setError(errors);
        // console.log('errors', errors, 'firstname', errors["firstname"]);
        return formIsValid;
    }

    const handleSubmit = e => {

        e.preventDefault();

        if (handleValidation()) {

        }
        const { firstname, lastname,mobile,role } = inputField;

        if (!inputField.id) {
            //   let postData = {code:code,description:description}
            const dateDOB = new Date(dob).toISOString();
            axios.post('/users', {
                firstname: firstname,
                lastname: lastname,
                mobile:mobile,
                dob:dateDOB,
                role:role
            })
            // dispatch(actions.mDiagnosesPostCall(postData));
            NotificationManager.success("User Added Successfully");
            getUserData();
        }
        if (inputField.id) {
            editUserData(inputField)
            NotificationManager.success("Information Edited Successfully");
        }

        handleClose()

    }

    const editUserData = (userData) => {
        console.log('userData',userData);
        setModalTitle("Edit User")
        setModalButtonTitle("Edit")
        setInputField({
            ...userData
        })
        axios.put('/users' + '/' + userData.id, userData);
        // dispatch(actions.mDiagnosesPutCall(userData)); 
        getUserData();

    }
    const getUserData = () => {
        // setTimeout(() => {
        //     axios.get('/users')
        //         .then(res => {
        //             console.log('res-data for patient',res.data);
        //             setUsersData(res.data)
        //         }).catch(err => {
        //             console.error(
        //                 `Error! in users ${err.message}`
        //             );
        //         })
        // }, 500);
        let patientDetails = [];
        axios.get('/users')
            .then(res => {
                res.data.forEach((values) => {
                    if (values.role == 2) {
                        patientDetails.push(values);
                    }
                })
                console.log('res data----> patientInfo', patientDetails);
                setUsersData(patientDetails);
            })
    }
    const reset = () => {
        setInputField({
            code: '',
            description: ''
        });
    }
    const openDeleteModal = () => {
        setOpenModal(!openModal);
    }
    const openViewModal = () => {
        setViewModal(!false);
    }
    const adduser = () => {
        setModalTitle("Add User")
        setModalButtonTitle("Add")
    }
    const CallbackDeleteModel = (val) => {
        axios.delete('/users/' + val.id);
        setTimeout(() => {
            getUserData();
        }, 500);
    }
    return (
        <div className="main-container-1">
           <h2>Physician Records</h2> <Button className="addData" onClick={() => { handleClickOpen(); adduser() }}>
                Add User
            </Button>
            <Dialog
                className="commonModal"
                open={open}
                //onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <div className="modalHeader">{modalTitle}<CancelIcon className="closeModal" onClick={() => { handleClose(); reset() }} /></div>
                <div class="modalBody">

                    <form className="main-form-container" onSubmit={handleSubmit} autoComplete="off">
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="firstname"
                                    placeholder="Enter firstname"
                                    type="text"
                                    value={inputField.firstname} id="firstname" onChange={inputHandler}
                                    error={errors["firstname"] ? true : false}
                                    helperText={errors["firstname"] ? errors["firstname"] : ''}
                                />

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="lastname"
                                    placeholder="Enter lastname"
                                    type="text"
                                    value={inputField.lastname} id="lastname" onChange={inputHandler}
                                    error={errors["lastname"] ? true : false}
                                    helperText={errors["lastname"] ? errors["lastname"] : ''}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="Mobile"
                                    placeholder="Enter Mobile No"
                                    type="text"
                                    id="mobile"
                                    value={inputField.mobile} id="mobile" onChange={inputHandler}
                                    error={errors["mobile"] ? true : false}
                                    helperText={errors["mobile"] ? errors["mobile"] : ''}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
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
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="role"
                                    placeholder="Enter role"
                                    type="text"
                                    id="role"
                                    value={inputField.role} id="role" onChange={inputHandler}
                                    // error={errors["mobile"] ? true : false}
                                    // helperText={errors["mobile"] ? errors["mobile"] : ''}
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
            </Dialog>
            <Table className="commonTable">
                <TableHead>
                    <TableRow>
                        <TableCell>S.No</TableCell>
                        <TableCell>Firstname</TableCell>
                        <TableCell>Lastname</TableCell>
                        <TableCell>Mobile no</TableCell>
                        <TableCell>DOB</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userData.map((Data, index) => (
                        <TableRow key={index}>
                            <TableCell>{Data.id}</TableCell>
                            <TableCell>{Data.firstname}</TableCell>
                            <TableCell>{Data.lastname}</TableCell>
                            <TableCell>{Data.mobile}</TableCell>
                            <TableCell>{Data.dob}</TableCell>
                            <TableCell><EditIcon color="primary" onClick={() => { editUserData(Data); handleClickOpen() }} />

                                <DeleteForeverIcon onClick={() => { openDeleteModal(); deleteData(Data) }} /><RemoveRedEyeIcon onClick={() => { openViewModal(); deleteData(Data) }} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {openModal && <DeleteModal  Data={data} fromDeleteModel = {CallbackDeleteModel} />}
            {viewModal && <ViewModal Data={data} />}
        </div>
    )
}


export default PatientRecords;