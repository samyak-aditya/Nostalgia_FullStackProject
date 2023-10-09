import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';

const initialState = { firstName: '', lastName: '', username: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Renamed 'history' to 'navigate'
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, navigate)); // Use 'navigate' here
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <Container  component="main"  maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid alignItem="center" justifyContent='center' container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="username" label="Username" handleChange={handleChange} type="username" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={setShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          
          <Button type="submit"  variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          </Grid>
          <Grid alignItem="center" justifyContent='center' container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
