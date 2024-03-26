import jwt from 'jsonwebtoken';
import {JWT_EXPIRATION_TIME, JWT_SECRET} from "../config.js";

export const EncodeToken = (userID, userName) => {
    const KEY = JWT_SECRET;
    const EXPIRE = { expiresIn: JWT_EXPIRATION_TIME };
    const PAYLOAD = { userID: userID, userName: userName};
    return jwt.sign(PAYLOAD,KEY,EXPIRE);
};

export const DecodeToken = (token) => {
    try {
        return jwt.verify(token,JWT_SECRET);
    } catch (error) {
        return null;
    }
};
