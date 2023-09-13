import express from "express";
import {signin, signup} from '../controllers/user.js'

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/signup', (req, res) => {
    console.log("get signup");
    res.send('Hello, World!');
  });
export default router;