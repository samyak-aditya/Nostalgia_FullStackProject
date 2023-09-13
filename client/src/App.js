import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
import Auth from './components/Auth/Auth';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import useStyles from './styles';
import Navbar from './components/Navbar.js/Navbar';
import Home from './components/Home/Home';
import SignUp from './components/Auth/Auth';

const App = () => (
  <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Container>
  </BrowserRouter>
);

export default App;
