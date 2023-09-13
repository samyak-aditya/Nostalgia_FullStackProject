import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

// Get the directory name of the current module
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

const auth = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(405).json({ message: 'Authorization header is missing' });
        }

        const token = authorizationHeader.split(" ")[1];
        const isCustomAuth = token.length < 500;
        console.log(token);

        let decodedData;

        if (token) {
            decodedData = jwt.verify(token, privateKey, { algorithms: ['RS256'] });
            req.userId = decodedData?.id;
            console.log(decodedData);
        } else {
            decodedData = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
            req.userId = decodedData?.sub;
            console.log(decodedData);
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(406).json({ message: 'Authentication failed' });
    }
};

export default auth;
