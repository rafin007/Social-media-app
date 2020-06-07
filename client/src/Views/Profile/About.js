import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, Button } from '@material-ui/core';
import Expander from '../../Components/Expander/Expander';
import AboutList from '../../Components/AboutList/AboutList';
import Modal from '../../Components/Modal/Modal';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    list: {
        width: '100%'
    }
}));

const About = ({ profile }) => {

    const classes = useStyles();

    //expanding logic
    const [expanded, setExpanded] = useState(false);


    //modal logic
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //info type logic
    const [type, setType] = useState('');

    return (
        <Grid item xs={12} className={classes.root} >

            <Expander heading="Personal" secondaryHeading={`View ${profile && profile.user.name}'s personal details`} expanded={expanded} setExpanded={setExpanded} panel="panel1" >
                <Grid container className={classes.list} >
                    <Grid item xs={12} >
                        <List >
                            <AboutList
                                title="Profession"
                                description={profile && profile.profession} />

                            <AboutList
                                title="Gender"
                                description={profile && profile.user.gender} />

                            <AboutList
                                title="Birthday"
                                description={profile && profile.birthday} />

                            <AboutList
                                title="Address"
                                description={profile && profile.address} />

                            <AboutList
                                title="Website"
                                description={profile && profile.website} />

                        </List>
                    </Grid>
                    <Grid item xs={12} >
                        <Button variant="contained" color="primary" onClick={() => { setType('personal'); handleClickOpen(); }} >Edit</Button>
                    </Grid>
                </Grid>
            </Expander>

            <Expander heading="Education" secondaryHeading="View Arefin's education background" expanded={expanded} setExpanded={setExpanded} panel="panel2" >
                <Grid container className={classes.list} >
                    <Grid item xs={12} >
                        <List>
                            <AboutList
                                title="School"
                                description="Jashore Zilla School" />

                            <AboutList
                                title="College"
                                description="I'm not proud" />

                            <AboutList
                                title="BSc in CSE"
                                description="American International University, Bangladesh" />

                        </List>
                    </Grid>
                    <Grid item xs={12} >
                        <Button variant="contained" color="primary" onClick={() => { setType('education'); handleClickOpen(); }} >ADD</Button>
                    </Grid>
                </Grid>
            </Expander>

            <Expander heading="Experiences" secondaryHeading="View Arefin's experiences" expanded={expanded} setExpanded={setExpanded} panel="panel3" >

                <Grid container className={classes.list} >
                    <Grid item xs={12} >
                        <List>
                            <AboutList
                                title="Oddyssey Apps LTD"
                                description="iOS Developer" />

                        </List>
                    </Grid>
                    <Grid item xs={12} >
                        <Button variant="contained" color="primary" onClick={() => { setType('experience'); handleClickOpen(); }} >ADD</Button>
                    </Grid>
                </Grid>

            </Expander>

            <Expander heading="Social" secondaryHeading="View Arefin's social links" expanded={expanded} setExpanded={setExpanded} panel="panel4" >
                <Grid container className={classes.list} >
                    <Grid item xs={12} >
                        <List>
                            <AboutList
                                title="Facebook"
                                description="Rafin Ryan" />

                            <AboutList
                                title="Instagram"
                                description="im_arefin" />

                            <AboutList
                                title="Github"
                                description="rafin007" />

                            <AboutList
                                title="Linkedin"
                                description="Arefin Mehedi" />

                        </List>
                    </Grid>
                    <Grid item xs={12} >
                        <Button variant="contained" color="primary" onClick={() => { setType('social'); handleClickOpen(); }} >ADD</Button>
                    </Grid>
                </Grid>
            </Expander>
            <Modal open={open} handleClose={handleClose} type={type} profile={profile} />
        </Grid>
    )
}

export default About;
