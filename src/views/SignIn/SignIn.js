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

//submit form
const submitHandler = e => {
    e.preventDefault();
    dispatch(actions.signin(authForm.email.value, authForm.password.value));
};

const formElementsArray= [];
for( let key in authForm ) {
    formElementsArray.push({
        id: key,
        config: authForm[key]
    });
};

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