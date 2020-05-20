import React from 'react';
import { Link } from 'react-router-dom';
import { TextField, makeStyles, Grid, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '20vh',
        [theme.breakpoints.up('md')]: {
            marginTop: '15vh'
        }
    },
    signin: {
        marginTop: '1rem'
    },
    signup: {
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

const Signin = () => {

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
                            <TextField label="Email" required type="email" />
                            <TextField label="Password" required type="password" />
                            <Button color="primary" className={classes.signin} variant="contained" >
                                Sign in
                            </Button>
                        </form>
                    </CardContent>
                    <CardActions>
                        <Typography variant="body1" align="center" gutterBottom style={{ margin: '0 auto' }} >
                            Don't have an account?
                                <Link to="/" className={classes.signup}  >
                                <Button size="small" color="primary" variant="text" >Sign up</Button>
                            </Link>
                        </Typography>

                        <Typography variant="body1" align="center" gutterBottom style={{ margin: '0 auto' }} >
                            Forgot password?
                                <Link to="/recoverPassword" className={classes.signup}  >
                                <Button size="small" color="primary" variant="text" >Recover here</Button>
                            </Link>
                        </Typography>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Signin;
