import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { checkValidity, updateObject } from '../../resources/utility';
import * as actions from '../../store/action';
import FormInput from '../../components/FormInput/formInput';
import './signin.scss'


// const useStyles = makeStyles({
//     root: {
//       "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
//         borderColor: "white"
//       },
//       "& .MuiOutlinedInput-input": {
//         color: "white"
//       },
//       "& .MuiInputLabel-outlined": {
//         color: "white"
//       },
//       "& .MuiIconButton-label": {
//         color: "white"
//       }
//     }
// });

function SignIn(){

  //submit form
  // const handleSubmit = e => {
  //   e.preventDefault();
  //   if(handleValidation()){
  //     const { username, password } = state;
  //     axios.post('/login', {email: username, password: password})
  //       .then(res => {
  //           // console.log(res.data)
  //           localStorage.setItem('token', res.data.accessToken);
  //           localStorage.setItem('email', res.data.user.email);
  //           localStorage.setItem('role', res.data.user.role);
  //           history.push('/dashboard');
  //       })
  //       .catch(err => {
  //           console.error(
  //               `Error! in login ${err.message}`
  //           );
  //       })
  //   }
  // };

  // const classes = useStyles();

  const dispatch = useDispatch();


  const [authForm, setAuthForm] = useState({
    
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: ' '
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false,
        valueType: 'Email'
    },
    password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: ' '
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false,
        valueType: 'Password'
    }
});

const inputChangedHandler = (event, controlName) => {
    const updatedControl = updateObject(authForm, {
        [controlName]: updateObject(authForm[controlName], {
            value: event.target.value,
            valid: checkValidity(event.target.value, authForm[controlName].validation ),
            touched: true
        })
    });
    setAuthForm(updatedControl);
}

const submitHandler = e => {
    e.preventDefault();
    // console.log(authForm)
    dispatch(actions.signin(authForm.email.value, authForm.password.value));
};

const formElementsArray= [];
for( let key in authForm ) {
    formElementsArray.push({
        id: key,
        config: authForm[key]
    });
}

let form = formElementsArray.map( formElement => (
  <FormInput 
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      valueType={formElement.config.valueType}
      changed={(event) => inputChangedHandler(event, formElement.id)} />   
  ));

  return(
    <div className="main-container">
      <Grid item md={6} xs={12} className="form-container">
        <form className="inner-form" onSubmit={submitHandler} autoComplete="off"> 
          {form}
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