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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Collapse, List, Divider, TextField, Button, Grid } from '@material-ui/core';
import Moment from 'react-moment';
import { useState } from 'react';
import { useEffect } from 'react';
import Comment from '../Comment/Comment';
import SimpleMenu from '../SimpleMenu/SimpleMenu';
import bufferToImage from '../../utils/bufferToImage';
import { useSelector, useDispatch } from 'react-redux';
import { removeLike, addLike, postCommentOnPostById } from '../../Actions/post';

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
    },
    // comment: {
    //     display: 'flex',
    //     justifyContent: 'space-between',
    //     width: '100%',
    //     alignItems: 'center',
    // },
    commentBox: {
        width: '100%'
    }
}));

const Post = ({ post, ...props }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //comment section handler
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    //convert the buffer to image URL/blob
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

    //user state from auth
    const user = useSelector(state => state.auth.user);

    //check post like
    const [isLiked, setIsLiked] = useState(null);

    //check if the current user liked this post
    useEffect(() => {
        if (post.likes.filter(like => like.user === user._id).length > 0) {
            setIsLiked(Boolean(true));
        }
        else {
            setIsLiked(Boolean(false));
        }
    }, [user._id, isLiked, post]);

    //update like
    const updateLike = () => {
        if (isLiked) {
            dispatch(removeLike(post._id));
        }
        else {
            dispatch(addLike(post._id));
        }
    }

    let likeString = '';

    if (isLiked && post.likes.length === 1) {
        likeString = 'You like this';
    }
    else if (isLiked && post.likes.length > 1) {
        likeString = `You and ${post.likes.length - 1} others`;
    }
    else if (!isLiked && post.likes.length > 0) {
        likeString = `${post.likes.length}`;
    }

    const likeLoading = useSelector(state => state.post.likeLoading);

    //comment logic
    // const [comment, setComment] = useState('');

    // const postComment = () => {
    //     dispatch(postCommentOnPostById(post._id, comment));
    // }

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
                <IconButton aria-label="add to favorites" color={isLiked ? 'secondary' : 'default'} onClick={updateLike} disabled={likeLoading} >
                    <FavoriteIcon />
                </IconButton>
                <Typography >{likeString}</Typography>
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
            <CardContent>
                <Grid container className={classes.comment} alignItems="center" justify="space-evenly" >
                    <Grid item xs={9} >
                        {/* <TextField variant="standard" placeholder="Write a comment.." multiline className={classes.commentBox} size="small" value={comment} onChange={(event) => setComment(event.target.value)} /> */}
                    </Grid>
                    <Grid item xs={2} >
                        <Button variant="outlined" color="primary" disabled={!comment} >post</Button>
                    </Grid>
                </Grid>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {/* <List>
                        {post.comments && post.comments.length > 0 && post.comments.map(comment => {
                            return (
                                <Fragment>
                                    <Comment />
                                    <Divider variant="middle" component="li" />
                                </Fragment>
                            );
                        })}
                    </List> */}
                </CardContent>
            </Collapse>
        </Card>
    );
}


export default Post;