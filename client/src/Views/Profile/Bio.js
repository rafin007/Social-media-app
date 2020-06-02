import React from 'react'
import { Paper, Typography, makeStyles, Button, Grid } from '@material-ui/core';
import { SaveOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    bioContainer: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2)
    },
    buttons: {
        marginTop: theme.spacing(2),
        display: 'flex',
    },
    root: {
        paddingBottom: theme.spacing(3)
    }
}));

const Bio = () => {

    const classes = useStyles();

    return (
        <Grid container className={classes.root} >
            <Grid item xs={12} >
                <Paper elevation={3} className={classes.bioContainer}  >
                    <Typography variant="h6" gutterBottom >Bio</Typography>
                    <Typography variant="body2" color="textSecondary" align="justify" contentEditable="true" >
                        If you're really reading this text, then I am ecstatically delighted and disproportionately flabbergasted with enormous gratification and appreciation for the dispensation of such a tendering and mesmerizing information in which the prestidigitation of the concurrent and subsequent matter is thoroughly demonstrated through the innuances alluding to literal and metaphorical context. I thank you for your unequivocal Idealically, based on my intellectual capacity and my vast knowledge. I have come to a concrete, definite and profound conclusion that I actually have nothing to say... Thank you!
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} className={classes.buttons} >
                {/* <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<EditOutlined />}
                    style={{ marginRight: '1rem' }}
                >
                    Edit
                </Button> */}
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SaveOutlined />}
                >
                    Save
                </Button>
            </Grid>
        </Grid>
    )
}

export default Bio
