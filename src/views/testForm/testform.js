import React, {useState} from 'react';
import {  Grid } from "@material-ui/core";
import { checkValidity, updateObject } from '../../resources/utility';
import FormInput from '../../components/FormInput/formInput';

const TestForm = props => {


    const [authForm, setAuthForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: ' '
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
            valueType: 'Name'
        },
        phone: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: ' '
            },
            value: '',
            validation: {
                required: true,
                isNumeric: true
            },
            valid: false,
            touched: false,
            valueType: 'Phone'
        },
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
        },
        message: {
            elementType: 'textarea',
            elementConfig: {
                type: 'test',
                placeholder: ' '
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
            valueType: 'Message'
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

    const submitHandler = event => {
        event.preventDefault();
        
        console.log(authForm)
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
                </form>
            </Grid>
        </div>
    )
}

export default TestForm;