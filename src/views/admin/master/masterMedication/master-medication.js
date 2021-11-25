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

const Medication = () => {
    const [medication,setMedication] = React.useState([]);
    const dispatch = useDispatch();
        const getcall = React.useCallback(

        () => dispatch(actions.mMedicationGetCall()),

        [dispatch]

    );
    useEffect(() => { getcall();}, [getcall]); 

  const getdataVal = useSelector((state) => state.mAllergiesReducer.getcallData)

 
    useEffect(()=>{
        setMedication(getdataVal);
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
    // const [diagnoses, setDiagnoses] = React.useState([]);
    const [dob, setDOB] = useState(new Date());
    const handleChange = (event) => {
        console.log('gender', event.target.value)
        setGender(event.target.value);

    };
     const [inputField, setInputField] = useState({
        applNo: '',
        form: '',
        strength: '',
        refDrug: '',
        drugName: '',
        drugIngrients: '',
        refeStandard: ''
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
    //     axios.get('/mastermedication')
    //         .then(res => {
    //             console.log('res.data',res)
    //             setAllergies(res.data)
    //         })
    // }, [allergies])

        const handleValidation = () => {
        const { applNo,
            form,
            strength,
            refDrug,
            drugName,
            drugIngrients,
            refeStandard} = inputField;
        let errors = {};
        let formIsValid = true;

        if (!applNo) {
            errors["applNo"] = "applNo is required!";
            formIsValid = false;
        }
        if (!form) {
            errors["form"] = "form is required!";
            formIsValid = false;
        }
        if (!strength) {
            errors["strength"] = "strength is required!";
            formIsValid = false;
        }
        if (!refDrug) {
            errors["refDrug"] = "refDrug is required!";
            formIsValid = false;
        }
        if (!drugName) {
            errors["drugName"] = "drugName is required!";
            formIsValid = false;
        }
        if (!drugIngrients) {
            console.log('coming to address validation')
            errors["drugIngrients"] = "drugIngrients required!";
            formIsValid = false;
        }
        if (!refeStandard) {
            errors["refeStandard"] = "refeStandard is required!";
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
        const { applNo,
            form,
            strength,
            refDrug,
            drugName,
            drugIngrients,
            refeStandard} = inputField;
        if (!inputField.id) {
            let postData = {applNo:applNo,form:form,strength:strength,
                refDrug:refDrug,drugName:drugName,drugIngrients:drugIngrients,refeStandard:refeStandard}
            // axios.post('/masterdiagnoses', {
            //     code: code,
            //     description: description
            // })
            dispatch(actions.mMedicationPostCall(postData));
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
        dispatch(actions.mMedicationPutCall(userData));
        // axios.put('/mastermedication' + '/' + userData.id, userData)
        // dispatch(actions.mDiagnosesPutCall(userData)); 
        // getUserData();

    }
    // const getUserData = () => {
    //     setTimeout(() => {
    //         axios.get('/masterallergies')
    //             .then(res => {
    //                 setAllergies(res.data)
    //             }).catch(err => {
    //                 console.error(
    //                     `Error! in Allergies ${err.message}`
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
        setOpenModal(!false);
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
        dispatch(actions.mMedicationDeleteCall(val));
    }
    return (
        <div className="main-container-1">
            {console.log('return',getdataVal)}
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
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="applNo"
                                    placeholder="Enter applNo"
                                    type="text"
                                    value={inputField.applNo} id="applNo" onChange={inputHandler}
                                    error={errors["applNo"] ? true : false}
                                    helperText={errors["applNo"] ? errors["applNo"] : ''}
                                />

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="form"
                                    placeholder="Enter form"
                                    type="text"
                                    value={inputField.form} id="form" onChange={inputHandler}
                                    error={errors["form"] ? true : false}
                                    helperText={errors["form"] ? errors["form"] : ''}
                                />

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="strength"
                                    placeholder="Enter strength"
                                    type="text"
                                    value={inputField.allergyName} id="strength" onChange={inputHandler}
                                    error={errors["strength"] ? true : false}
                                    helperText={errors["strength"] ? errors["strength"] : ''}
                                />

                            </Grid> <Grid item xs={12} md={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="refDrug"
                                    placeholder="Enter refDrug"
                                    type="text"
                                    value={inputField.refDrug} id="refDrug" onChange={inputHandler}
                                    error={errors["refDrug"] ? true : false}
                                    helperText={errors["refDrug"] ? errors["refDrug"] : ''}
                                />

                            </Grid> <Grid item xs={12} md={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="drugName"
                                    placeholder="Enter drugName"
                                    type="text"
                                    value={inputField.drugName} id="drugName" onChange={inputHandler}
                                    error={errors["drugName"] ? true : false}
                                    helperText={errors["drugName"] ? errors["drugName"] : ''}
                                />

                            </Grid>
                           
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="drugIngrients"
                                    placeholder="Enter  drugIngrients"
                                    type="text"
                                    value={inputField.isoforms} id="drugIngrients" onChange={inputHandler}
                                    error={errors["drugIngrients"] ? true : false}
                                    helperText={errors["drugIngrients"] ? errors["drugIngrients"] : ''}
                                />

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="refeStandard"
                                    placeholder="Enter refeStandard"
                                    type="text"
                                    value={inputField.allerginicity} id="refeStandard" onChange={inputHandler}
                                    error={errors["refeStandard"] ? true : false}
                                    helperText={errors["refeStandard"] ? errors["refeStandard"] : ''}
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
                        <TableCell>applNo</TableCell>
                        <TableCell>form</TableCell>
                        <TableCell>strength</TableCell>
                        <TableCell>refDrug</TableCell>
                        <TableCell>drugName</TableCell>
                        <TableCell>drugIngrients</TableCell>
                        <TableCell>refeStandard</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {medication.map((Data, index) => (
                        <TableRow key={index}>
                            <TableCell>{Data.id}</TableCell>
                            <TableCell>{Data.applNo}</TableCell>
                            <TableCell>{Data.form}</TableCell>
                            <TableCell>{Data.strength}</TableCell>
                            <TableCell>{Data.refDrug}</TableCell>
                            <TableCell>{Data.drugName}</TableCell>
                            <TableCell>{Data.drugIngrients}</TableCell>
                            <TableCell>{Data.refeStandard}</TableCell>
                            <TableCell><EditIcon color="primary" onClick={() => { editUserData(Data); handleClickOpen() }} />

                                <DeleteForeverIcon onClick={() => { openDeleteModal(); deleteData(Data) }} /><RemoveRedEyeIcon onClick={() => { openViewModal(); deleteData(Data) }} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {openModal && <DeleteModal Data={data} compName={'/mastermedication'} fromDeleteModel = {CallbackDeleteModel}/>}
            {viewModal && <ViewModal Data={data} />}
        </div>
    )
}


export default Medication;