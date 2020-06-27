import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Collapse, List, Divider } from '@material-ui/core';
import Moment from 'react-moment';
import { useState } from 'react';
import { useEffect } from 'react';
import Comment from '../Comment/Comment';
import SimpleMenu from '../SimpleMenu/SimpleMenu';
import bufferToImage from '../../utils/bufferToImage';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: '1.5rem',
        [theme.breakpoints.up('md')]: {

        }
    },
    media: {
        height: 200,
        paddingTop: '100%', // 16:9
        [theme.breakpoints.up('md')]: {
            paddingTop: '80%'
        }
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    comments: {
        marginLeft: 'auto',
    }
}));

const Post = ({ post, ...props }) => {

    const classes = useStyles();

    //comment section handler
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    //convert the buffer to image URL
    const [imageURL, setImageURL] = useState('');
    useEffect(() => {
        if (post.image) {
            const imageUrl = bufferToImage(post.image.data);
            setImageURL(imageUrl);
        }
    }, [post]);


    //menu handler
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar alt="Avatar" src={props.owner} />
                }
                action={
                    <Fragment>
                        <IconButton aria-label="settings" onClick={handleClick} >
                            <MoreVertIcon />
                        </IconButton>
                        <SimpleMenu onClose={handleClose} anchorEl={anchorEl} open={Boolean(anchorEl)} postId={post._id} />
                    </Fragment>
                }
                title={post.user.name}
                subheader={
                    <Fragment>
                        {/* <Moment fromNow >{post.date}</Moment>
                        <br /> */}
                        <Moment format="D MMM YYYY HH:mm" withTitle >{post.date}</Moment>
                    </Fragment>
                }
            />
            {post.image && <CardMedia
                className={classes.media}
                // component="img"
                image={imageURL && imageURL}
            // title={post.text}
            />}
            <CardContent>
                <Typography variant="body1" color="textSecondary" component="p" >
                    {post.text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" color="secondary" >
                    <FavoriteIcon />
                </IconButton>
                <Typography >49</Typography>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <div className={classes.comments} onClick={handleExpandClick} >
                    Comments
                <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </div>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <List>
                        <Comment />
                        <Divider variant="middle" component="li" />
                    </List>
                </CardContent>
            </Collapse>
        </Card>
    );
}


export default Post;