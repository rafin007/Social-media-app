import React from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import { ArrowDropUpOutlined } from '@material-ui/icons';
import { Link } from 'react-scroll';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(10),
        left: '80%',
        opacity: .7
    }
}));


const ScrollToTop = () => {

    const classes = useStyles();

    return (
        <Link to="root" smooth={true} duration={600} className={classes.root} >
            <Fab color="primary" aria-label="add">
                <ArrowDropUpOutlined fontSize="large" />
            </Fab>
        </Link>
    )
}

export default ScrollToTop;
