import React, { useEffect } from 'react';
import { Grid, List } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProfiles } from '../../Actions/profile';
import Spinner from '../Spinner/Spinner';
import User from './User/User';

// function useForceUpdate() {
//     const [value, setValue] = useState(0); // integer state
//     return () => setValue(value => ++value); // update the state to force render
// }

const Users = () => {

    const dispatch = useDispatch();

    //loading state
    const loading = useSelector(state => state.profile.loading);

    //profiles state
    const profiles = useSelector(state => state.profile.profiles);

    //get all the profiles when the component loads
    useEffect(() => {
        dispatch(getAllProfiles());
    }, []);

    return (
        <Grid item xs={12}>
            <List>
                {loading ? <Spinner /> : profiles && profiles.length > 0 && profiles.map(profile => <User profile={profile} key={profile._id} />)}
            </List>
        </Grid>
    );
}

export default Users;
