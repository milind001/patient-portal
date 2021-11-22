import React from 'react';
import './formInput.scss';

const FormInput = (props) => {
    const { valueType, elementType, elementConfig, value, changed, invalid, shouldValidate, touched } = props;
    console.log(props)

    let inputElement = null;
    const inputClasses = ['input__field'];

    if (invalid && shouldValidate && touched) {
        inputClasses.push('invalid'); 
    }

    let validationError = null;
    if (invalid && touched) {
        validationError = <p className='validation-error'>Please enter a valid {valueType}!</p>;
    }
    
    switch(elementType) {
        case ( 'input' ):
            inputElement = <input 
                className={inputClasses.join(' ')}
                {...elementConfig} 
                value={value}
                onChange={changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...elementConfig} 
                value={value}
                onChange={changed} />;
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...elementConfig} 
                value={value}
                onChange={changed} />;
    }

    return (
        <div className='group'>
            <label class="input">
            { inputElement }
            <span class="input__label">{valueType}</span>
            {validationError}
            </label>
        </div>
    );   
}

export default FormInput;

