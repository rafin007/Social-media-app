import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

const Text = ({ placeholder, ...props }) => {

    const [field, meta] = useField(props);

    const errorText = meta.error && meta.touched ? meta.error : "";

    return (
        <TextField placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} />
    );
}

export default Text;
