import * as yup from 'yup';

export const signupSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    confirmPassword: yup.string().required('Confirm password is a required field').oneOf([yup.ref('password'), null], 'Your passwords do not match'),
    gender: yup.string().required()
});

export const signinSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required()
});