import React from "react";
import useStyles from './styles'
import { Card, CardActions,CardContent ,CardMedia, Button, Typography } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { EditNote } from "@mui/icons-material";

import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost,likePost } from "../../../actions/posts";




const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (post.likes && post.likes.length > 0) {
      return post.likes.find((like) => like === ( user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><EditNote fontSize="medium" /></Button>
      </div>
      <div className={classes.details}>
      <Typography variant="body2" color="textSecondary" component="h2">
  {Array.isArray(post.tags) ? post.tags.map((tag) => `#${tag} `) : ''}
</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
      <Button size="small" color="primary"  onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        
        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
        
      </CardActions>
    </Card>
  );
};

export default Post;