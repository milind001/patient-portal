import React from 'react';
// import { KeyboardDatePicker, MuiPickerUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

export default function DatePicker (props) {

    const {name, label, value, onChange} = props;
    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        // <MuiPickerUtilsProvider utils={DateFnsUtils}>
        //     <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
        //     label={label}
        //     format="MM/DD/YYYY" 
        //     name={name}
        //     value={value}
        //     onChange={date => onChange(convertToDefEventPara(name, date))}
        //     />
        // </MuiPickerUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            
                <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                    label={label}
                    format="mm/dd/yyyy" 
                    name={name}
                    value={value}
                    onChange={date => onChange(convertToDefEventPara(name, date))}
                    />
           
        </MuiPickersUtilsProvider>
    )
}