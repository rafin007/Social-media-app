import * as yup from "yup";

export const signupSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .required("Confirm password is a required field")
    .oneOf([yup.ref("password"), null], "Your passwords do not match"),
  gender: yup.string().required(),
});

export const signinSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export const changePasswordSchema = yup.object({
  oldPassword: yup.string().required("Old password is a required field").min(6),
  newPassword: yup.string().required("New password is a required field").min(6),
  confirmNewPassword: yup
    .string()
    .required("Confirm password is a required field")
    .oneOf([yup.ref("newPassword"), null], "Your passwords do not match"),
});

export const recoverPasswordSchema = yup.object({
  newPassword: yup.string().required("New password is a required field").min(6),
  confirmNewPassword: yup
    .string()
    .required("Confirm password is a required field")
    .oneOf([yup.ref("newPassword"), null], "Your passwords do not match"),
});

export const recoverPasswordEmailSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
});
