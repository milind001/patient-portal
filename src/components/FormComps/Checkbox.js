import { FormLabel, FormControl, Checkbox as MuiCheckbox, FormControlLabel } from '@material-ui/core';
import React from 'react';

export default function Checkbox (props){

    const {name, label, value, onChange } = props;
    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })
    console.log(props.label)
    return (
        <FormControl
            variant="outlined">
            {/* <FormLabel>{label}</FormLabel> */}
            <FormControlLabel
                control={<MuiCheckbox
                    name={name}
                    color="primary"
                    onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}></MuiCheckbox>}
                    label={label}
            />
        </FormControl>
    );
}