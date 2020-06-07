import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core';
import { Form, Formik } from 'formik';
import Text from '../Form/Text';
import SelectField from '../Form/SelectField';
import { personalValidationSchema, educationValidationSchema, experienceValidationSchema, socialValidationSchema } from '../../Validators/AboutValidation';
import { useDispatch, useSelector } from 'react-redux';
import { postPersonalInformation } from '../../Actions/profile';
import Spinner from '../Spinner/Spinner';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    form: {
        '& > *': {
            // margin: theme.spacing(1),
            width: '100%',
            marginBottom: '1rem',
        },
    },
}));

const Modal = ({ profile, ...props }) => {

    const classes = useStyles();

    let form = null;

    let initialValues = {};

    let validationSchema = null;

    let title = "";

    //change form, initialValues and validationSchema according to type
    if (props.type === 'personal') {
        form = (
            <>
                <Text placeholder="Profession" name="profession" type="text" />
                <Text placeholder="Birthday" name="birthday" type="text" />
                <Text placeholder="Address" name="address" type="text" />
                <Text placeholder="Website" name="website" type="text" />
            </>
        );

        initialValues = {
            profession: profile && profile.profession,
            birthday: profile && profile.birthday,
            address: profile && profile.address,
            website: profile && profile.website
        };

        validationSchema = personalValidationSchema;

        title = "Personal";
    }
    else if (props.type === 'education') {
        form = (
            <>
                <Text placeholder="Degree" name="degree" type="text" />
                <Text placeholder="Institute" name="institute" type="text" />
            </>
        );

        initialValues = {
            degree: '',
            institute: ''
        };

        validationSchema = educationValidationSchema;

        title = "Educational";
    }
    else if (props.type === 'experience') {
        form = (
            <>
                <Text placeholder="Company" name="company" type="text" />
                <Text placeholder="Position" name="position" type="text" />
            </>
        );

        initialValues = {
            company: '',
            position: ''
        };

        validationSchema = experienceValidationSchema;

        title = "Experience";
    }
    else if (props.type === 'social') {
        form = (
            <>
                <Text placeholder="Social Media" name="name" type="text" />
                <Text placeholder="Username" name="username" type="text" />
            </>
        );

        initialValues = {
            name: '',
            username: ''
        };

        validationSchema = socialValidationSchema;

        title = "Social media account";
    }

    const loading = useSelector(state => state.profile.loading);

    const dispatch = useDispatch();

    //submit handler
    const handleSubmit = async (data) => {
        //post [type] information
        dispatch(postPersonalInformation(data));

        //when loading is over close the modal
        if (!loading) {
            props.handleClose();
        }
    }

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
                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true);
                        handleSubmit(data);
                        setSubmitting(false);
                    }} >
                    {({ values, errors, isSubmitting }) => (
                        loading ? <Spinner /> : (<Form >
                            <DialogTitle id="alert-dialog-slide-title">{`Fill out your ${title} details`}</DialogTitle>
                            <DialogContent className={classes.form} >
                                {/* <DialogContentText id="alert-dialog-slide-description">
                        Fill out your personal details below
                    </DialogContentText> */}

                                {form}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={props.handleClose} color="secondary">
                                    Cancel
                                </Button>
                                <Button color="primary" type="submit" disabled={isSubmitting} >
                                    Submit
                                </Button>
                            </DialogActions>
                        </Form>)
                    )}
                </Formik>
            </Dialog>
        </div>
    );
}

export default React.memo(Modal);
