import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Button, TextField, Typography, Grid } from "@material-ui/core" 
import './signin.scss'
import { Link } from "react-router-dom";

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

function SignIn(){

    const classes = useStyles();

    return(
      <div className="main-container">
        <Grid item md={6} xs={12} className="form-container">
          <form className="inner-form">
            <Typography className="head-title" variant="h4">Log in to your account</Typography>
            <TextField
                variant="outlined"
                label="Username"
                placeholder="Enter Username"
                type="email"
                className={classes.root}
            />
            <TextField
                variant="outlined"
                label="Password"
                placeholder="Enter Password"
                type="password"
                className={classes.root}
            />
            <div style={{textAlign: 'right'}}><Link to="#" className="forgot-pass">Forgot Password?</Link></div>

            <Button className="signin-btn" variant="contained" type="submit" color="secondary">login</Button>

            <center>
              <div>Don't have an account? <Link to="/signup" style={{color: '#fff'}}>Signup</Link></div>
            </center>
          </form>
        </Grid>
      </div>
    )
};

export default SignIn;