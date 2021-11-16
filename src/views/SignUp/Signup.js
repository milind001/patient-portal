import React, { Fragment, useState } from "react"
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from "@material-ui/core/styles"
import { Button, TextField, Typography, Grid } from "@material-ui/core" 
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { Link } from "react-router-dom";
import axios from '../../resources/axios';
import './signup.scss'

const useStyles = makeStyles({
    root: {
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
      },
      "& .MuiOutlinedInput-input": {
        color: "white"
      },
      "& .MuiInputLabel-outlined": {
        color: "white"
      },
      "& .MuiIconButton-label": {
        color: "white"
      }
    }
});

function SignUp(){

    const classes = useStyles();
    const [dob, setDOB] = useState(new Date());

    const [state, setState] = useState({
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        password: ""
    });

    const handleChange = e => {
        const {id, value} = e.target;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        const { 
            firstname, 
            lastname, 
            email, 
            mobile,
            password
        } = state;
        const dateDOB = new Date(dob).toISOString();
        axios.post('/register', {
            firstname: firstname, 
            lastname: lastname, 
            email: email, 
            mobile: mobile, 
            password: password, 
            dob: dateDOB, 
            role: 1
        })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.error(
                `Error! in login ${err.message}`
            );
        })
     }

    return(
        <div className="main-container">
            <Grid item md={6} xs={12} className="form-container">
                <form className="inner-form" onSubmit={handleSubmit}>
                    <Typography className="head-title" variant="h4">Create an account</Typography>
                    <div className="Username">
                        <TextField
                            variant="outlined"
                            label="First Name"
                            placeholder="Enter First Name"
                            type="text"
                            className= {"First_Name " + classes.root}
                            id="firstname"
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            label="Last Name"
                            placeholder="Enter Last Name"
                            type="text"
                            className={"Last_Name " + classes.root}
                            id="lastname"
                            onChange={handleChange}
                        />
                    </div>
                    
                    <TextField
                        variant="outlined"
                        label="Mail ID"
                        placeholder="Enter Email"
                        type="email"
                        className={classes.root}
                        id="email"
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        label="Mobile"
                        placeholder="Enter Mobile No"
                        type="text"
                        className={classes.root}
                        id="mobile"
                        onChange={handleChange}
                    />
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
                                className={classes.root}
                                />
                        </Fragment>
                    </MuiPickersUtilsProvider>
                    
                    <TextField
                        variant="outlined"
                        label="Password"
                        placeholder="Enter Password"
                        type="password"
                        className={classes.root}
                        id="password"
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        type="password"
                        className={classes.root}
                    />
                    <Button className="signup-btn" variant="contained" type="submit" color="secondary">Register</Button>

                    <center>
                        <div>Already have an account? <Link to="/signin" style={{color: '#fff'}}>Signin</Link></div>
                    </center>
                </form>
            </Grid>
        </div>
    )
};

export default SignUp;