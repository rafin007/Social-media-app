import React from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import { ArrowDropUpOutlined, Add } from '@material-ui/icons';
import { Link } from 'react-scroll';
import { Link as DOMLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    scroller: {
        position: 'fixed',
        bottom: theme.spacing(10),
        left: '80%',
        opacity: .7
    },
    button: {
        position: 'fixed',
        bottom: theme.spacing(10),
        left: '80%',
    }
}));


const FloatingAction = ({ action }) => {

    const classes = useStyles();

    return (
        action === 'scroller' ?
            (
                <Link to="root" smooth={true} duration={600} className={classes.scroller} >
                    <Fab color="primary" aria-label="add">
                        <ArrowDropUpOutlined fontSize="large" />
                    </Fab>
                </Link>
            ) : (
                <DOMLink to="/createPost" >
                    <Fab color="primary" aria-label="add" className={classes.button} >
                        <Add />
                    </Fab>
                </DOMLink>
            )
    );
}

export default FloatingAction;
