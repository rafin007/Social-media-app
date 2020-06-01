import React from 'react'
import { Paper, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2)
    }
}));

const Bio = () => {

    const classes = useStyles();

    return (
        <Paper elevation={3} className={classes.root}  >
            <Typography variant="h6" gutterBottom >Bio</Typography>
            <Typography variant="body2" color="textSecondary" align="justify" >
                If you're really reading this text, then I am ecstatically delighted and disproportionately flabbergasted with enormous gratification and appreciation for the dispensation of such a tendering and mesmerizing information in which the prestidigitation of the concurrent and subsequent matter is thoroughly demonstrated through the innuances alluding to literal and metaphorical context. I thank you for your unequivocal Idealically, based on my intellectual capacity and my vast knowledge. I have come to a concrete, definite and profound conclusion that I actually have nothing to say... Thank you!
            </Typography>
        </Paper>
    )
}

export default Bio
