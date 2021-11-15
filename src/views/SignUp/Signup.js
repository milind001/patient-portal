import React, { Fragment, useState } from "react"
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from "@material-ui/core/styles"
import { Button, TextField, Typography, Grid } from "@material-ui/core" 
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { Link } from "react-router-dom";
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
    const [selectedDate, handleDateChange] = useState(new Date());

    return(
        <div className="main-container">
            <Grid item md={6} xs={12} className="form-container">
                <form className="inner-form">
                    <Typography className="head-title" variant="h4">Create an account</Typography>
                    <div className="Username">
                        <TextField
                            variant="outlined"
                            label="First Name"
                            placeholder="Enter First Name"
                            type="text"
                            className= {"First_Name " + classes.root}
                        />
                        <TextField
                            variant="outlined"
                            label="Last Name"
                            placeholder="Enter Last Name"
                            type="text"
                            className={"Last_Name " + classes.root}
                        />
                    </div>
                    
                    <TextField
                        variant="outlined"
                        label="Mail ID"
                        placeholder="Enter Email"
                        type="email"
                        className={classes.root}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Fragment>
                            <KeyboardDatePicker
                                autoOk
                                label="DOB"
                                inputVariant="outlined"
                                value={selectedDate}
                                onChange={handleDateChange}
                                variant="inline"
                                format="dd/MM/yyyy"
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