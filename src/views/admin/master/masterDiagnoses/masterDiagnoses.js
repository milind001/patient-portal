import { Fragment, useState } from "react"
import { Button, TextField, Typography, Grid } from "@material-ui/core"
import * as React from 'react';
import axios from "../../../../resources/axios";
import { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from '@material-ui/core/Dialog';
import * as actions from '../../../../store/action';
import { NotificationManager } from "react-notifications";
import CancelIcon from '@mui/icons-material/Cancel';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteModal from "../../../../components/Modal/deleteModal";
import ViewModal from "../../../../components/Modal/viewModal";
import { useSelector, useDispatch } from 'react-redux';
const Diagnoses = () => {
    const dispatch = useDispatch();
    const [diagnoses, setDiagnoses] = React.useState([]);
    const getcall = React.useCallback(

    () => dispatch(actions.mDiagnosesGetCall()),

    [dispatch]

);
useEffect(() => { getcall();}, [getcall]); 

const getdataVal = useSelector((state) => state.mAllergiesReducer.getcallData)


useEffect(()=>{
    setDiagnoses(getdataVal);
    },[getdataVal])
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
    
    const [dob, setDOB] = useState(new Date());
    const handleChange = (event) => {
        console.log('gender', event.target.value)
        setGender(event.target.value);

    };
    const [inputField, setInputField] = useState({
        code: '',
        description: ''
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
    // view data
    // useEffect(() => {
    //     axios.get('/masterdiagnoses')
    //         .then(res => {
    //             setDiagnoses(res.data)
    //         })
    // }, [diagnoses])

    const handleValidation = () => {
        const { code, description } = inputField;
        let errors = {};
        let formIsValid = true;

        if (!code) {
            errors["code"] = "Code is required!";
            formIsValid = false;
        }
        if (!description) {
            errors["description"] = "Description is required!";
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
        const { code, description } = inputField;
        
        if (!inputField.id) {
      let postData = {code:code,description:description}
            // axios.post('/masterdiagnoses', {
            //     code: code,
            //     description: description
            // })
            dispatch(actions.mDiagnosesPostCall(postData));
            NotificationManager.success("User Added Successfully");
            // getUserData();
        }
        if (inputField.id) {
            editUserData(inputField)
            NotificationManager.success("Information Edited Successfully");
        }

        handleClose()

    }

    const editUserData = (userData) => {

        setModalTitle("Edit User")
        setModalButtonTitle("Edit")
        setInputField({
            ...userData
        })
        // axios.put('/masterdiagnoses' + '/' + userData.id, userData)
        dispatch(actions.mDiagnosesPutCall(userData)); 
        // getUserData();

    }
    // const getUserData = () => {
    //     setTimeout(() => {
    //         axios.get('/masterdiagnoses')
    //             .then(res => {
    //                 setDiagnoses(res.data)
    //             }).catch(err => {
    //                 console.error(
    //                     `Error! in Diagnoses ${err.message}`
    //                 );
    //             })
    //     }, 500);
    // }
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
    const adduser = () =>{
        setModalTitle("Add User")
        setModalButtonTitle("Add") 
    } 
    const CallbackDeleteModel = (val) => {
        console.log('val from delete model',val)
        dispatch(actions.mDiagnosesDeleteCall(val));
    }
    return (
        <div className="main-container-1">
            <Button className="addData" onClick={()=>{handleClickOpen();adduser()}}>
                Add Data
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
                            <Grid item xs={12} md={12}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="Code"
                                    placeholder="Enter code"
                                    type="text"
                                    value={inputField.code} id="code" onChange={inputHandler}
                                    error={errors["code"] ? true : false}
                                    helperText={errors["code"] ? errors["code"] : ''}
                                />

                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="Description"
                                    placeholder="Enter Description"
                                    type="text"
                                    value={inputField.description} id="description" onChange={inputHandler}
                                    error={errors["description"] ? true : false}
                                    helperText={errors["description"] ? errors["description"] : ''}
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
                        <TableCell>Code</TableCell>
                        <TableCell>Description</TableCell>
                    

                    </TableRow>
                </TableHead>
                <TableBody>
                    {diagnoses.map((Data, index) => (
                        <TableRow key={index}>
                            <TableCell>{Data.id}</TableCell>
                            <TableCell>{Data.code}</TableCell>
                            <TableCell>{Data.description}</TableCell>
                            <TableCell><EditIcon color="primary" onClick={() => { editUserData(Data); handleClickOpen() }} />

                                <DeleteForeverIcon onClick={() => { openDeleteModal(); deleteData(Data) }} /><RemoveRedEyeIcon onClick={() => { openViewModal(); deleteData(Data) }} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {openModal && <DeleteModal Data={data} compName={'/masterdiagnoses'} fromDeleteModel = {CallbackDeleteModel}/>}
            {viewModal && <ViewModal Data={data} />}
        </div>
    )
}


export default Diagnoses;