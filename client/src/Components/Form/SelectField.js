import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';
import { useField } from 'formik';

const SelectField = ({ label, ...props }) => {

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
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
            </Select>
            <FormHelperText>{errorText}</FormHelperText>
        </FormControl>
    );
}

export default SelectField;
