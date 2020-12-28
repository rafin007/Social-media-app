import * as yup from "yup";

export const personalValidationSchema = yup.object({
  profession: yup.string().required(),
  birthday: yup.string().required(),
  address: yup.string().required(),
  website: yup.string(),
});

export const educationValidationSchema = yup.object({
  degree: yup.string().required(),
  school: yup.string().required(),
});

export const experienceValidationSchema = yup.object({
  company: yup.string().required(),
  title: yup.string().required(),
});

export const socialValidationSchema = yup.object({
  name: yup.string().required(),
  username: yup.string().required(),
});

export const changeNameSchema = yup.object({
  name: yup.string().required("Name is required"),
});

export const changeEmailSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
});
