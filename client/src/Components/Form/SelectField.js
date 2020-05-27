import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';
import { useField } from 'formik';

const SelectField = ({ label, options, ...props }) => {

    const [field, meta] = useField(props);

    const errorText = meta.error && meta.touched ? meta.error : "";

    return (
        <FormControl error={!!errorText} >
            <InputLabel>{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                {...field}
            // value={age}
            // onChange={handleChange}
            >
                {options.map(option => <MenuItem value={option} key={option} >{option}</MenuItem>)}
            </Select>
            <FormHelperText>{errorText}</FormHelperText>
        </FormControl>
    );
}

export default SelectField;
