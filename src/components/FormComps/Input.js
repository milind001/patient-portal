import { TextField } from '@material-ui/core';
import React from 'react';

export default function Input (props) {
    const { name, label, value, onChange } = props;

    return (
        <TextField 
            variant="outlined" autoComplete="off"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            />
    )

}