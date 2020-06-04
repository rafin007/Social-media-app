import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, Button } from '@material-ui/core';
import Expander from '../../Components/Expander/Expander';
import AboutList from '../../Components/AboutList/AboutList';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    list: {
        width: '100%'
    }
}));

const About = () => {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    return (
        <Grid item xs={12} className={classes.root} >

            <Expander heading="Personal" secondaryHeading="View Arefin's personal details" expanded={expanded} setExpanded={setExpanded} panel="panel1" >
                <Grid container className={classes.list} >
                    <Grid item xs={12} >
                        <List >
                            <AboutList
                                title="Gender"
                                description="Male" />

                            <AboutList
                                title="Birthday"
                                description="16th August 1995" />

                            <AboutList
                                title="Address"
                                description="Jashore, Bangladesh" />

                            <AboutList
                                title="Website"
                                description="www.arefinmehedi.com" />

                        </List>
                    </Grid>
                    <Grid item xs={12} >
                        <Button variant="contained" color="primary" >Edit</Button>
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
                        <Button variant="contained" color="primary" >ADD</Button>
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
                        <Button variant="contained" color="primary" >ADD</Button>
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
                        <Button variant="contained" color="primary" >ADD</Button>
                    </Grid>
                </Grid>
            </Expander>

        </Grid>
    )
}

export default About;
