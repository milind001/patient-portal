import Select from  '../../../components/FormComps/Select';
import Input from '../../../components/FormComps/Input';
import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import { Typography, createTheme, makeStyles, ThemeProvider, Snackbar } from "@material-ui/core";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { NotificationManager } from 'react-notifications';
import axios from '../../../resources/axios';
import { useHistory } from 'react-router-dom';
import { Alert, CssBaseline } from '@mui/material';

// CSS Styles
const theme = createTheme({
    palette: {
      primary: {
        main: "#333996",
        light: "#3c44b126"
      },
      secondary: {
        main: "#f83245",
        light: "#f8324526"
      },
      background: {
        default: "#f4f5fd"
      },
    },
    overrides: {
      MuiAppBar: {
        root: {
          transform: 'translateZ(0)'
        }
      }
    },
    props: {
      MuiIconButton: {
        disableRipple: true
      }
    }
  })
  
  const useStyles = makeStyles({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            padding: theme.spacing(1)
        }
    }
  })

  export default function PatientMedication2 () {
    const classes = useStyles();
    const [medication, setMedication] = React.useState([]);
    const [allergies, setAllergies] = React.useState([]);
    const patient_user_id = localStorage.getItem('user_id')
    let history = useHistory();
    const [inputField, setInputField] = useState({
        currentMedication: '',
        otcMedication: '',
        herbs: '',
        socialDrugs: '',
        pastMedication: '',
        drugAllergies: '',
        otherAllergies: '',
    })

    useEffect(() => {
        getMasterMedication();
    }, [])
    function getMasterMedication() {
        axios.get('/mastermedication').then((resp) => {
                console.log("Medication data....", resp)
                setMedication(resp.data)
            })
    }

    useEffect(() => {
        getMasterAllergies();
    }, [])
    function getMasterAllergies() {
        axios.get('masterallergies').then((resp) => {
            console.log("Allergies data.....", resp)
            setAllergies(resp.data) 
            })
        
    }
    
    const inputHandler = e => {
        const { name, value } = e.target;
        setInputField(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSubmit = e => {
        console.log("data submitted...........")
        console.log(inputField)
        e.preventDefault();
        const { currentMedication,
            otcMedication, herbs, socialDrugs,
            patientMedication,drugAllergies,
            otherAllergies,
            } = inputField;

        if (!inputField.name) {
            axios.post('/patient-medication2', {
                currentMedication: currentMedication,
                otcMedication: otcMedication,
                herbs: herbs,
                socialDrugs: socialDrugs,
                patientMedication: patientMedication,
                drugAllergies: drugAllergies,
                otherAllergies: otherAllergies,
                patient_user_id: patient_user_id
            })
            NotificationManager.success("Details Added Successfully");
            // history.push('/dashboard/patient/dashboard')         
        }
        
    }
    
    // const editUserData = (userData) => {
    //     setInputField({
    //         ...userData
    //     })
    //     axios.put('/patient-medication2' + '/' + patient_user_id, userData)
    //     // getUserData();
    // }

    // const getUserData = () => {
    //     setTimeout(() => {
    //         axios.get('/patient-medication2')
    //             .then(res => {
    //                 setMedication(res.data)
    //             }).catch(err => {
    //                 console.error(
    //                     `Error! in patient-medication2 ${err.message}`
    //                 );
    //             })
    //     }, 500);
    // }

    // const reset = () => {
    //     setInputField({
    //          currentMedication: '',
    //             otcMedication: '',
    //             herbs: '',
    //             socialDrugs: '',
    //             patientMedication: '',
    //             drugAllergies: '',
    //             otherAllergies: ''
    //     });
    // }

    return (
         // component="form"
         <ThemeProvider theme={theme}>
                <Typography variant="h4">Patient Medication</Typography>
                    <form className={classes.root} onSubmit={handleSubmit} >
                        <Grid container >
                            <Grid item xs={6}>
                                <Select name="currentMedication" 
                                    label ="Current Medication"
                                    placeholder="Enter Medication"
                                    value={inputField.currentMedication}
                                    options={medication}
                                    onChange={inputHandler}
                                />
                                <Select label="OTC (Over the counter) Medication"
                                    placeholder="Enter OTC Medication"
                                    value={inputField.otcMedication}
                                    name="otcMedication" 
                                    options={medication}
                                    onChange={inputHandler}
                                />
                                <Input
                                    label="Herbs/Vitamin/Minerals/Antibiotics"
                                    placeholder="Enter the details"
                                    name="herbs"
                                    value={inputField.herbs} 
                                    onChange={inputHandler}
                                />
                                <Input
                                    label="Social Drugs"
                                    placeholder="Enter the Social Drugs"
                                    name="socialDrugs"
                                    value={inputField.socialDrugs} 
                                    onChange={inputHandler}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Select
                                    label="Any past prescribed medication"
                                    placeholder="Enter details"
                                    value={inputField.pastMedication} 
                                    name="pastMedication" 
                                    options={medication}
                                    onChange={inputHandler}
                                />
                                <Select
                                    label="Drug Allergies"
                                    placeholder="Enter details"
                                    value={inputField.drugAllergies} 
                                    name="drugAllergies" 
                                    options={allergies}
                                    onChange={inputHandler}
                                />
                                <Select
                                    label="Allergies/Reaction-Other"
                                    placeholder="Enter details"
                                    value={inputField.otherAllergies} 
                                    name="otherAllergies" onChange={inputHandler}
                                    options={allergies}
                                />
                            </Grid>
                        </Grid>
                        <br/>
                        <center>
                            <Button variant="contained" type="submit">Submit</Button>
                            {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success">
                                    Details Added succesfully!
                                </Alert>
                            </Snackbar> */}
                            {/* <Button variant="contained" type="submit" disabled style={{marginLeft:'20px'}}>Edit</Button> */}
                        </center>
                    </form>
                    <CssBaseline />
            </ThemeProvider>
    )
}