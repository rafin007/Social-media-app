import React from 'react';
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
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    //do some weird sorcery shit to convert the buffer to image url
    const [imageURL, setImageURL] = useState('');
    useEffect(() => {
        if (post.image) {
            const arrayBufferView = new Uint8Array(post.image.data);
            const blob = new Blob([arrayBufferView], { type: "image/png" });
            const urlCreator = window.URL || window.webkitURL;
            const imageUrl = urlCreator.createObjectURL(blob);

            setImageURL(imageUrl);
        }
    }, [post]);

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar alt="Avatar" src={props.owner} />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={post.user.name}
                subheader={<Moment fromNow >{post.date}</Moment>}
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