const User = require('../model/userModel');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
// const profile = require("../config/multer");


const getAllUser = async (req, res) => {
    const users = await User.find();
    res.json({ users })
};

const getUser = async (req, res) => {
    const id = req.params.eid;

    const users = await User.findById(id);
    res.json({ users })
};

const middleware = async (req, res, next) => {
    try {
        console.log('Middleware triggered');
        const { email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('user already exists');
        }
        next();
    }

    catch (error) {
        console.error('Error in middleware', error);
        res.status(500).send('Internal server error')
    }
}

// const createUser = async (req, res) => {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//         return res.status(400).send('user is created');
//     }

//     const newUser = new User({ name, email, password })
//     await newUser.save();
//     res.status(201).send(`Hello ${name}`);
//     console.log('New user added:', newUser);
// };

const auth = async (req, res, next) => {
    const token = req.headers.tk;
    if (!token) {
        return res.status(401).send('access denied');
    }

    try {
        const verified = jwt.verify(token, "secret");
        next();
    }
    catch (error) {
        return res.status(400).send('invalid token');
    }
}

const createUser = async (req, res) => {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    try {
        const { name, email, password } = req.body;
        console.log('name:', name);
        console.log('email:', email);
        console.log('password:', password);
        if (!name || !email || !password) {
            return res.status(400).send('All fields are required');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // const profileImage = req.file.filename;

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            profile: req.file ? req.file.filename : null
        });
        // const hashedPassword = await bcrypt.hash(password, 10);
        // const newUser = new User({ name, email, password: hashedPassword, profile: req.file ? req.file.filename : null });
        await newUser.save();

        res.status(201).send(`Hello ${name}`);
        console.log('New user added:', newUser);

    }

    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt with email:', email);
    console.log('Login attempt with password:', password );   

    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'user is not found' });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log("Stored password:", user.password);
        console.log("Entered password:", password);
        return res.status(400).json({ message: 'Invalid credentials' });
    }


    const genTkn = {
        name: user.name,
        email: user.email,
    }
    const token = jwt.sign(genTkn, "secret", { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
    // res.status(200).json(`welcomeback, ${user.name}!`,{token})
    console.log('user logged in:', user);

}

const updateUser = async (req, res) => {
    try {
        const id = req.params.eid;
        const { name, email, password } = req.body;

        let updateData = { name, email };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.json({ updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.eid;
        const deleteUser = await User.findByIdAndDelete(id);

        if (!deleteUser) {
            return res.send('user not found');
        }

        res.json({ deleteUser });

    } catch (error) {
        console.log(error);
        res.send('Internal Server Error');
    }
}

module.exports = {
    getAllUser,
    createUser,
    updateUser,
    deleteUser,
    getUser,
    middleware,
    login,
    auth
}