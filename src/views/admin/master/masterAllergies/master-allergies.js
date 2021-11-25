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

const Allergies = () => {
    const [allergies,setAllergies] = React.useState([]);
    const dispatch = useDispatch();
        const getcall = React.useCallback(

        () => dispatch(actions.mAllergiesGetCall()),

        [dispatch]

    );
    useEffect(() => { getcall();}, [getcall]); 

  const getdataVal = useSelector((state) => state.mAllergiesReducer.getcallData)

 
    useEffect(()=>{
        setAllergies(getdataVal);
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
        code: '',
        allergyType: '',
        allergyName: '',
        socialDurgs: '',
        allergySource: '',
        isoforms: '',
        allerginicity: ''
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
    //     axios.get('/masterallergies')
    //         .then(res => {
    //             setAllergies(res.data)
    //         })
    // }, [allergies])

        const handleValidation = () => {
        const { code,
            allergyType,
            allergyName,
            socialDurgs,
            allergySource,
            isoforms,
            allerginicity} = inputField;
        let errors = {};
        let formIsValid = true;

        if (!code) {
            errors["code"] = "Code is required!";
            formIsValid = false;
        }
        if (!allergyType) {
            errors["allergyType"] = "AllergyType is required!";
            formIsValid = false;
        }
        if (!allergyName) {
            errors["allergyName"] = "allergyName is required!";
            formIsValid = false;
        }
        if (!socialDurgs) {
            errors["socialDurgs"] = "socialDurgs is required!";
            formIsValid = false;
        }
        if (!allergySource) {
            errors["allergySource"] = "allergySource is required!";
            formIsValid = false;
        }
        if (!isoforms) {
            console.log('coming to address validation')
            errors["isoforms"] = "isoforms required!";
            formIsValid = false;
        }
        if (!allerginicity) {
            errors["allerginicity"] = "allerginicity is required!";
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
        const { code,
                    allergyType,
                    allergyName,
                    socialDurgs,
                    allergySource,
                    isoforms,
                    allerginicity} = inputField;
        if (!inputField.id) {
            console.log('error',Object.keys(errors).length )
            let postData = {code:code,allergyType:allergyType,allergyName:allergyName,
                socialDurgs:socialDurgs,allergySource:allergySource,isoforms:isoforms,allerginicity:allerginicity}
            // axios.post('/masterdiagnoses', {
            //     code: code,
            //     description: description
            // })
            dispatch(actions.mAllergiesPostCall(postData));
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
        dispatch(actions.mAllergiesPutCall(userData));
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
        dispatch(actions.mAllergiesDeleteCall(val));
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
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="code"
                                    placeholder="Enter code"
                                    type="text"
                                    value={inputField.code} id="code" onChange={inputHandler}
                                    error={errors["code"] ? true : false}
                                    helperText={errors["code"] ? errors["code"] : ''}
                                />

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="allergyType"
                                    placeholder="Enter allergyType"
                                    type="text"
                                    value={inputField.allergyType} id="allergyType" onChange={inputHandler}
                                    error={errors["allergyType"] ? true : false}
                                    helperText={errors["allergyType"] ? errors["allergyType"] : ''}
                                />

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="allergyName"
                                    placeholder="Enter allergyName"
                                    type="text"
                                    value={inputField.allergyName} id="allergyName" onChange={inputHandler}
                                    error={errors["allergyName"] ? true : false}
                                    helperText={errors["allergyName"] ? errors["allergyName"] : ''}
                                />

                            </Grid> <Grid item xs={12} md={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="socialDurgs"
                                    placeholder="Enter socialDurgs"
                                    type="text"
                                    value={inputField.socialDurgs} id="socialDurgs" onChange={inputHandler}
                                    error={errors["socialDurgs"] ? true : false}
                                    helperText={errors["socialDurgs"] ? errors["socialDurgs"] : ''}
                                />

                            </Grid> <Grid item xs={12} md={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="allergySource"
                                    placeholder="Enter allergySource"
                                    type="text"
                                    value={inputField.allergySource} id="allergySource" onChange={inputHandler}
                                    error={errors["allergySource"] ? true : false}
                                    helperText={errors["allergySource"] ? errors["allergySource"] : ''}
                                />

                            </Grid>
                           
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="isoforms"
                                    placeholder="Enter isoforms"
                                    type="text"
                                    value={inputField.isoforms} id="isoforms" onChange={inputHandler}
                                    error={errors["isoforms"] ? true : false}
                                    helperText={errors["isoforms"] ? errors["isoforms"] : ''}
                                />

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth
                                    variant="outlined"
                                    label="allerginicity"
                                    placeholder="Enter allerginicity"
                                    type="text"
                                    value={inputField.allerginicity} id="allerginicity" onChange={inputHandler}
                                    error={errors["allerginicity"] ? true : false}
                                    helperText={errors["allerginicity"] ? errors["allerginicity"] : ''}
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
                        <TableCell>code</TableCell>
                        <TableCell>allergyType</TableCell>
                        <TableCell>allergyName</TableCell>
                        <TableCell>socialDurgs</TableCell>
                        <TableCell>allergySource</TableCell>
                        <TableCell>isoforms</TableCell>
                        <TableCell>allerginicity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allergies.map((Data, index) => (
                        <TableRow key={index}>
                            <TableCell>{Data.id}</TableCell>
                            <TableCell>{Data.code}</TableCell>
                            <TableCell>{Data.allergyType}</TableCell>
                            <TableCell>{Data.allergyName}</TableCell>
                            <TableCell>{Data.socialDurgs}</TableCell>
                            <TableCell>{Data.allergySource}</TableCell>
                            <TableCell>{Data.isoforms}</TableCell>
                            <TableCell>{Data.allerginicity}</TableCell>
                            <TableCell><EditIcon color="primary" onClick={() => { editUserData(Data); handleClickOpen() }} />

                                <DeleteForeverIcon onClick={() => { openDeleteModal(); deleteData(Data) }} /><RemoveRedEyeIcon onClick={() => { openViewModal(); deleteData(Data) }} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {openModal && <DeleteModal Data={data} compName={'/masterallergies'}  fromDeleteModel = {CallbackDeleteModel}/>}
            {viewModal && <ViewModal Data={data} />}
        </div>
    )
}


export default Allergies;