import fs from 'fs';
import bcrypt from 'bcryptjs';
import path from 'path';

import jwt from 'jsonwebtoken';
import { readFile } from './user.controller.js';
import dotenv from 'dotenv';

dotenv.config();

const userPath = path.resolve('data', 'user.json');

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userList = await readFile();

        const user = userList.find((user) => user.email === email);

        if(!user)
        res.status(404).json({ success: false, message: 'User not found!!'});

        const matchPassword = await bcrypt.compare(password, user.password);

        if(!matchPassword)
        res.status(400).json({ success: false, message: 'Incorrect Credentials!!'});

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        res.cookie('accessToken', token, { httpOnly: true });

        res.status(201).json({ success: true, user, token });
    } catch (error) {
        return next(error);
    }
}