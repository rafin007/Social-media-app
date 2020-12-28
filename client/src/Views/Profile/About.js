import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, List, Button } from "@material-ui/core";
import Expander from "../../Components/Expander/Expander";
import AboutList from "../../Components/AboutList/AboutList";
import Modal from "../../Components/Modal/Modal";
import { useSelector } from "react-redux";
import CustomAlert from "../../Components/CustomAlert/CustomAlert";
import Spinner from "../../Components/Spinner/Spinner";

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

  //modal logic
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //info type logic
  const [type, setType] = useState("");

  //error state
  const errors = useSelector((state) => state.profile.errors);

  //loading state
  const loading = useSelector((state) => state.profile.loading);

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
              {loading ? (
                <Spinner />
              ) : (
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
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setType("personal");
                  handleClickOpen();
                }}
              >
                Edit
              </Button>
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
              {loading ? (
                <Spinner />
              ) : (
                <List>
                  {profile &&
                    profile.education.length > 0 &&
                    profile.education.map((edu) => {
                      return (
                        <AboutList
                          title={edu.degree}
                          description={edu.school}
                          key={edu._id}
                          id={edu._id}
                          type="education"
                        />
                      );
                    })}
                </List>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setType("education");
                  handleClickOpen();
                }}
              >
                ADD
              </Button>
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
              {loading ? (
                <Spinner />
              ) : (
                <List>
                  {profile &&
                    profile.experience.length > 0 &&
                    profile.experience.map((exp) => {
                      return (
                        <AboutList
                          title={exp.company}
                          description={exp.title}
                          key={exp._id}
                          id={exp._id}
                          type="experience"
                        />
                      );
                    })}
                </List>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setType("experience");
                  handleClickOpen();
                }}
              >
                ADD
              </Button>
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
              {loading ? (
                <Spinner />
              ) : (
                <List>
                  {profile &&
                    profile.social.length > 0 &&
                    profile.social.map((soc) => {
                      return (
                        <AboutList
                          title={soc.name}
                          description={soc.username}
                          key={soc._id}
                          id={soc._id}
                          type="social"
                        />
                      );
                    })}
                </List>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setType("social");
                  handleClickOpen();
                }}
              >
                ADD
              </Button>
            </Grid>
          </Grid>
        </Expander>
        <Modal
          open={open}
          handleClose={handleClose}
          type={type}
          profile={profile}
        />
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
