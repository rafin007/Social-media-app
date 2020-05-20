import React from 'react';
import { Link } from 'react-router-dom';
import { TextField, makeStyles, Grid, Card, CardContent, Typography, CardActions, Button, FormControl, InputLabel, Select, MenuItem, } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '10vh',
        [theme.breakpoints.up('md')]: {
            marginTop: '5vh'
        },
    },
    signup: {
        marginTop: '1rem'
    },
    signin: {
        textDecoration: 'none',
    },
    form: {
        '& > *': {
            // margin: theme.spacing(1),
            width: '100%',
            marginBottom: '1rem',
        },
    },
    card: {
        paddingTop: '2vh'
    }
}));

const Signup = () => {

    const classes = useStyles();

    return (
        <Grid container direction="row" justify="center" alignItems="center" className={classes.root} >
            <Grid item xs={12}>
                <Typography color="primary" variant="h3" gutterBottom align="center" >
                    Social media
                </Typography>
            </Grid>
            <Grid item xs={11} md={6} lg={4} >
                <Card className={classes.card} >
                    <CardContent>
                        {/* <Typography className={classes.title} color="primary" variant="h4" align="center" gutterBottom>
                            Sign up
                        </Typography> */}
                        <form noValidate autoComplete="off" className={classes.form} >
                            <TextField label="Name" required />
                            <TextField label="Email" required type="email" />
                            <TextField label="Password" required type="password" />
                            <TextField label="Confirm Password" required type="password" />

                            <FormControl className={classes.formControl}>
                                <InputLabel>Choose Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                // value={age}
                                // onChange={handleChange}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                            <Button color="primary" className={classes.signup} variant="contained" >
                                Sign up
                            </Button>
                        </form>
                    </CardContent>
                    <CardActions>
                        <Typography variant="body1" align="center" gutterBottom style={{ margin: '0 auto' }} >
                            Already have an account?
                            <Link to="/signin" className={classes.signin}  >
                                <Button size="small" color="primary" variant="text" >Sign in</Button>
                            </Link>
                        </Typography>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Signup;
