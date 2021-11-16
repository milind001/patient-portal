import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Button, TextField, Typography, Grid } from "@material-ui/core" 
import { Link, useHistory } from "react-router-dom";
import axios from '../../resources/axios';
import './signin.scss'


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

  const [state, setState] = useState({
      username: "",
      password: ""
  });
  let history = useHistory();

  //onchange input types
  const handleChange = e => {
    const {id, value} = e.target;
    setState(prevState => ({
        ...prevState,
        [id]: value
    }));
  };

  //submit form
  const handleSubmit = e => {
    e.preventDefault();
        const { username, password } = state;
        axios.post('/login', {email: username, password: password})
          .then(res => {
              console.log(res.data)
              // localStorage.setItem('token', res.data.accessToken);
              // localStorage.setItem('email', res.data.user.email);
              // localStorage.setItem('role', res.data.user.role);
              history.push('/dashboard');
          })
          .catch(err => {
              console.error(
                  `Error! in login ${err.message}`
              );
          })
  };

  const classes = useStyles();

  return(
    <div className="main-container">
      <Grid item md={6} xs={12} className="form-container">
        <form className="inner-form" onSubmit={handleSubmit}> 
          <Typography className="head-title" variant="h4">Log in to your account</Typography>
          <TextField
              variant="outlined"
              label="Username"
              placeholder="Enter Username"
              type="email"
              id="username"
              className={classes.root}
              value={state.email} 
              onChange={handleChange}
          />
          <TextField
              variant="outlined"
              label="Password"
              placeholder="Enter Password"
              type="password"
              id="password"
              className={classes.root}
              value={state.password} 
              onChange={handleChange}
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