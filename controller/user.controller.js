import fs from 'fs';
import bcrypt from 'bcryptjs';
import path from 'path';

import * as uuid from 'uuid'

const userPath = path.resolve('data', 'user.json');

export const readFile = async () => {
    const response = JSON.parse(fs.readFileSync(userPath));

    return response;
}

export const writeFile = async (data) => {
    fs.writeFileSync(userPath, JSON.stringify(data));
}

export const createUser = async (req, res, next) => {
    try {
        let user = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        user = { ...user, password: hashedPassword, id: uuid.v4() };

        const userList = await readFile();

        userList.push(user);

        await writeFile(userList);

        return res.status(201).json({ success: true });
    } catch (error) {
        return next(error);
    }
}

export const fetchAllUsers = async (req, res, next) => {
    try {
        const users = await readFile();

        return res.status(201).json({ success: true, users });
    } catch (error) {
        return next(error);
    }
}

export const fetchUserById = async (req, user, next) => {
    try {
        const { userId } = req.params;
        const userList = await readFile();

        const user = userList.find((user) => user.id === userId);

        if(!user)
        return res.status(404).json({ success: true, message: 'User not found!!!' });

        return res.status(201).json({ success: true, user });
    } catch (error) {
        return next(error);
    }
}