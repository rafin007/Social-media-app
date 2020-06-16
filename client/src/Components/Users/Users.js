import React, { useEffect } from 'react';
import { Grid, List } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProfiles } from '../../Actions/profile';
import Spinner from '../Spinner/Spinner';
import User from './User/User';

const Users = () => {

    const dispatch = useDispatch();

    //get all the profiles when the component loads
    useEffect(() => {
        dispatch(getAllProfiles());
    }, []);

    //loading state
    const loading = useSelector(state => state.profile.loading);

    //profiles state
    const profiles = useSelector(state => state.profile.profiles);

    //@TODO => Change backend accordingly and pass followers and following there...

    return (
        <Grid item xs={12}>
            <List>
                {loading ? <Spinner /> : profiles && profiles.length > 0 && profiles.map(profile => <User profile={profile} key={profile._id} />)}
            </List>
        </Grid>
    );
}

export default Users;
