import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core";
import { Form, Formik } from "formik";
import Text from "../Form/Text";
import {
  personalValidationSchema,
  educationValidationSchema,
  experienceValidationSchema,
  socialValidationSchema,
  changeNameSchema,
  changeEmailSchema,
} from "../../Validators/AboutValidation";
import { useDispatch } from "react-redux";
import {
  postPersonalInformation,
  postEducationalInformation,
  postExperienceInformation,
  postSocialInformation,
} from "../../Actions/profile";
import DatePicker from "../Form/DatePicker";
import { changePasswordSchema } from "../../Validators/AuthValidation";
import { changeEmail, changeName, changePassword } from "../../Actions/auth";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      // margin: theme.spacing(1),
      width: "100%",
      marginBottom: "1rem",
    },
  },
}));

const Modal = ({ profile, name, email, ...props }) => {
  const classes = useStyles();

  let initialValues = {};

  let validationSchema = null;

  let title = "";

  const getForm = (values, handleChange) => {
    if (props.type === "personal") {
      return (
        <>
          <Text
            placeholder="Profession"
            name="profession"
            type="text"
            value={values.profession || ""}
            onChange={handleChange}
          />
          {/* <Text placeholder="Birthday" name="birthday" type="text" value={values.birthday || ''} onChange={handleChange} /> */}
          <DatePicker
            label="Birthday"
            type="date"
            name="birthday"
            onChange={handleChange}
            value={values.birthday || ""}
          />
          <Text
            placeholder="Address"
            name="address"
            type="text"
            value={values.address || ""}
            onChange={handleChange}
          />
          <Text
            placeholder="Website"
            name="website"
            type="text"
            value={values.website || ""}
            onChange={handleChange}
          />
        </>
      );
    } else if (props.type === "education") {
      return (
        <>
          <Text
            placeholder="Degree"
            name="degree"
            type="text"
            onChange={handleChange}
            value={values.degree || ""}
          />
          <Text
            placeholder="School"
            name="school"
            type="text"
            onChange={handleChange}
            value={values.school || ""}
          />
        </>
      );
    } else if (props.type === "experience") {
      return (
        <>
          <Text
            placeholder="Company"
            name="company"
            type="text"
            onChange={handleChange}
            value={values.company || ""}
          />
          <Text
            placeholder="Title"
            name="title"
            type="text"
            onChange={handleChange}
            value={values.title || ""}
          />
        </>
      );
    } else if (props.type === "social") {
      return (
        <>
          <Text
            placeholder="Social Media"
            name="name"
            type="text"
            onChange={handleChange}
            value={values.name || ""}
          />
          <Text
            placeholder="Username"
            name="username"
            type="text"
            onChange={handleChange}
            value={values.username || ""}
          />
        </>
      );
    } else if (props.type === "changePassword") {
      return (
        <>
          <Text
            placeholder="Old password"
            name="oldPassword"
            type="password"
            onChange={handleChange}
            value={values.oldPassword || ""}
          />
          <Text
            placeholder="New password"
            name="newPassword"
            type="password"
            onChange={handleChange}
            value={values.newPassword || ""}
          />
          <Text
            placeholder="Confirm new password"
            name="confirmNewPassword"
            type="password"
            onChange={handleChange}
            value={values.confirmNewPassword || ""}
          />
        </>
      );
    } else if (props.type === "changeName") {
      return (
        <Text
          placeholder="Name"
          name="name"
          type="text"
          onChange={handleChange}
          value={values.name || ""}
        />
      );
    } else if (props.type === "changeEmail") {
      return (
        <Text
          placeholder="Email"
          name="email"
          type="email"
          onChange={handleChange}
          value={values.email || ""}
        />
      );
    }
  };

  //change initialValues and validationSchema according to type
  if (props.type === "personal") {
    initialValues = {
      profession: profile && profile.profession,
      birthday: profile && profile.birthday,
      address: profile && profile.address,
      website: profile && profile.website,
    };

    validationSchema = personalValidationSchema;

    title = "Personal";
  } else if (props.type === "education") {
    initialValues = {
      degree: "",
      school: "",
    };

    validationSchema = educationValidationSchema;

    title = "Educational";
  } else if (props.type === "experience") {
    initialValues = {
      company: "",
      title: "",
    };

    validationSchema = experienceValidationSchema;

    title = "Experience";
  } else if (props.type === "social") {
    initialValues = {
      name: "",
      username: "",
    };

    validationSchema = socialValidationSchema;

    title = "Social media account";
  } else if (props.type === "changePassword") {
    initialValues = {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };

    validationSchema = changePasswordSchema;

    title = "Change account password";
  } else if (props.type === "changeName") {
    initialValues = {
      name,
    };

    validationSchema = changeNameSchema;

    title = "Change Name";
  } else if (props.type === "changeEmail") {
    initialValues = {
      email,
    };

    validationSchema = changeEmailSchema;

    title = "Change Email";
  }

  const dispatch = useDispatch();

  //submit handler
  const handleSubmit = async (data) => {
    //post [type] information
    if (props.type === "personal") {
      dispatch(postPersonalInformation(data));
    } else if (props.type === "education") {
      dispatch(postEducationalInformation(data));
    } else if (props.type === "experience") {
      dispatch(postExperienceInformation(data));
    } else if (props.type === "social") {
      dispatch(postSocialInformation(data));
    } else if (props.type === "changePassword") {
      dispatch(changePassword(data));
    } else if (props.type === "changeName") {
      dispatch(changeName(data));
    } else if (props.type === "changeEmail") {
      dispatch(changeEmail(data));
    }

    // close the modal immediately
    props.handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Formik
          validateOnChange={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            handleSubmit(data);
            setSubmitting(false);
            resetForm(initialValues);
          }}
        >
          {({ values, errors, isSubmitting, handleChange }) => (
            <Form>
              <DialogTitle id="alert-dialog-slide-title">
                {props.type === "changePassword" ||
                props.type === "changeName" ||
                props.type === "changeEmail"
                  ? `${title}`
                  : `Fill out your ${title} details`}
              </DialogTitle>
              <DialogContent className={classes.form}>
                {/* <DialogContentText id="alert-dialog-slide-description">
                        Fill out your personal details below
                    </DialogContentText> */}

                {getForm(values, handleChange)}
              </DialogContent>
              <DialogActions>
                <Button onClick={props.handleClose} color="secondary">
                  Cancel
                </Button>
                <Button color="primary" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default Modal;
