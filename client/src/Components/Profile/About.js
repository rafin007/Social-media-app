import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, List, ListItem, ListItemText } from "@material-ui/core";
import Expander from "../../Components/Expander/Expander";
import AboutList from "../../Components/AboutList/AboutList";
import { useSelector } from "react-redux";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  list: {
    width: "100%",
  },
}));

const About = ({ profile }) => {
  const classes = useStyles();

  //expanding logic
  const [expanded, setExpanded] = useState(false);

  //error state
  const errors = useSelector((state) => state.profile.errors);

  //loading state
  // const loading = useSelector(state => state.profile.loading);

  return (
    <>
      <Grid item xs={12} className={classes.root}>
        <Expander
          heading="Personal"
          secondaryHeading={`View ${
            profile && profile.user.name
          }'s personal details`}
          expanded={expanded}
          setExpanded={setExpanded}
          panel="panel1"
        >
          <Grid container className={classes.list}>
            <Grid item xs={12}>
              <List>
                <AboutList
                  title="Profession"
                  description={profile && profile.profession}
                />

                <AboutList
                  title="Gender"
                  description={profile && profile.user.gender}
                />

                <AboutList
                  title="Birthday"
                  description={profile && profile.birthday}
                />

                <AboutList
                  title="Address"
                  description={profile && profile.address}
                />

                <AboutList
                  title="Website"
                  description={profile && profile.website}
                />
              </List>
            </Grid>
          </Grid>
        </Expander>

        <Expander
          heading="Education"
          secondaryHeading={`View ${
            profile && profile.user.name
          }'s educational background`}
          expanded={expanded}
          setExpanded={setExpanded}
          panel="panel2"
        >
          <Grid container className={classes.list}>
            <Grid item xs={12}>
              <List>
                {profile &&
                  profile.education.length > 0 &&
                  profile.education.map((edu) => {
                    return (
                      <ListItem>
                        <ListItemText
                          primary={edu.degree}
                          secondary={edu.school}
                          key={edu._id}
                        />
                      </ListItem>
                    );
                  })}
              </List>
            </Grid>
          </Grid>
        </Expander>

        <Expander
          heading="Experiences"
          secondaryHeading={`View ${
            profile && profile.user.name
          }'s experiences`}
          expanded={expanded}
          setExpanded={setExpanded}
          panel="panel3"
        >
          <Grid container className={classes.list}>
            <Grid item xs={12}>
              <List>
                {profile &&
                  profile.experience.length > 0 &&
                  profile.experience.map((exp) => {
                    return (
                      <ListItem>
                        <ListItemText
                          primary={exp.company}
                          secondary={exp.title}
                          key={exp._id}
                        />
                      </ListItem>
                    );
                  })}
              </List>
            </Grid>
          </Grid>
        </Expander>

        <Expander
          heading="Social"
          secondaryHeading={`View ${
            profile && profile.user.name
          }'s social links`}
          expanded={expanded}
          setExpanded={setExpanded}
          panel="panel4"
        >
          <Grid container className={classes.list}>
            <Grid item xs={12}>
              <List>
                {profile &&
                  profile.social.length > 0 &&
                  profile.social.map((soc) => {
                    return (
                      <ListItem>
                        <ListItemText
                          primary={soc.name}
                          secondary={soc.username}
                          key={soc._id}
                        />
                      </ListItem>
                    );
                  })}
              </List>
            </Grid>
          </Grid>
        </Expander>
      </Grid>
      <Grid item xs={10} md={6} lg={4} className={classes.errors}>
        {errors && errors.length > 0
          ? errors.map((error, i) => (
              <CustomAlert message={error} severity="error" key={i} />
            ))
          : null}
      </Grid>
    </>
  );
};

export default About;
