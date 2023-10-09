import React, {useState, useEffect} from "react";
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from 'react-file-base64'
import { useDispatch,useSelector } from "react-redux";
import { createPost,updatePost, likePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) setPostData (post)
    },[post])
    
    const clear = () => {
        setCurrentId(0);
        setPostData({creator: '', title: '', message: '', tags: '', selectedFile: '' });
      };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (currentId === 0) {
          dispatch(createPost(postData));
          clear();
        } else {
          dispatch(updatePost(currentId, postData ));
          clear();
        }
      };
    

    
    if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }
    return (
        <Paper className={classes.paper}>
           <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6" >{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
            
            <TextField name='creator' variant='outlined' label='Creator' fullWidth value={postData.creator}
            onChange={(e) => setPostData({ ...postData, creator: e.target.value})}
            />
            <TextField name='title' variant='outlined' label='Title' fullWidth 
            value={postData.title}
            onChange={(e) => setPostData({ ...postData, title: e.target.value})}
            />
            <TextField name='message' variant='outlined' label='Message' fullWidth 
            value={postData.message}
            onChange={(e) => setPostData({ ...postData, message: e.target.value})}
            />
            <TextField name='tags' variant='outlined' label='Tags' fullWidth 
            value={postData.tags}
            onChange={(e) => setPostData({ ...postData, tags: e.target.value})}
            />

            <div className={classes.fileInput}>
                <FileBase type='file'
                multiple={false}
                onDone={({base64}) =>setPostData({...postData,selectedFile:base64})} />
            </div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button  color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>
            </form> 
        </Paper>
    );
}

export default Form;