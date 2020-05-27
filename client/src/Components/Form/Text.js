import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

const Text = ({ placeholder, type, ...props }) => {

    const [field, meta] = useField(props);

    const errorText = meta.error && meta.touched ? meta.error : "";

    return (
        <TextField placeholder={placeholder} type={type} {...field} helperText={errorText} error={!!errorText} />
    );
}

export default Text;
