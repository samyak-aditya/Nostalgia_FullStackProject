import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import fs from 'fs';
import path from 'path';
import User from '../models/user.js';

import NodeRSA from 'node-rsa';

const __dirname = ''

// Define the relative paths to your .pem files
const privateKeyPath = 'E:\\memoryproj\\server\\middleware\\private_key.pem'; // Replace with the actual relative path to your private key
const publicKeyPath = 'E:\\memoryproj\\server\\middleware\\public_key.pem';   // Replace with the actual relative path to your public key

// Construct the full paths using __dirname
const privateKeyFullPath = path.join( privateKeyPath);
const publicKeyFullPath = path.join(publicKeyPath);

// Read the private key and public key from the files
const privateKey = fs.readFileSync(privateKeyFullPath, 'utf8');
const publicKey = fs.readFileSync(publicKeyFullPath, 'utf8');
export const signin = async (req, res) => {
    const { email, password } = req.body;

    
        
        try {
            const oldUser = await User.findOne({ email });
        
            if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
        
            const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        
            if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign(
            { email: oldUser.email, id: oldUser._id },
            privateKey,
            { algorithm: 'RS256', expiresIn: '1h' }
        );

        res.status(200).json({ result: oldUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        // Input validation
        if (!email || !password || !confirmPassword || !firstName || !lastName) {
            return res.status(401).json({ message: "Please fill in all fields" });
        }

        if (password !== confirmPassword) {
            return res.status(402).json({ message: "Passwords do not match" });
        }

        // Check if the user already exists
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(403).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create the user
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        // Generate and send a JWT token
        const token = jwt.sign(
            { email: result.email, id: result._id },
            privateKey,
            { algorithm: 'RS256', expiresIn: '1h' }
        );

        res.status(200).json({ result, token });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Something went wrong" });
    }
}

