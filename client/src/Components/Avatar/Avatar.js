import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import bufferToImage from '../../utils/bufferToImage';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        justifyContent: 'center',
    },
}));

export default function ImageAvatars(props) {
    const classes = useStyles();

    const theme = useTheme();

    /**
     * ------------ show avatar---------------
     */
    //convert the buffer to image URL/blob
    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        if (props.image) {
            const imageUrl = bufferToImage(props.image.data);
            setImageURL(imageUrl);
        }
    }, [props.image]);

    return (
        <div className={classes.root}>
            <Avatar alt="My avatar" src={imageURL && imageURL} style={{ width: theme.spacing(props.width), height: theme.spacing(props.height) }} />
        </div>
    );
}
