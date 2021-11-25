import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core';
import React from 'react';

export default function Select (props) {
    const {name, label, placeholder, value, onChange, options} = props;
    // console.log(props)
    // console.log(props.options)
    return (
        <FormControl
        variant="outlined">
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                required
                placeholder={placeholder}
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>)
                    )
                }
            </MuiSelect>
        </FormControl>
    )
}