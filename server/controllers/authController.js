const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // console.log('User found:', user);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // console.log('Password does not match');
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        console.log('Password matches');

        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                // console.log('Token generated:', token);
                res.json({ token, role: user.role, classroomId: user.classroomId });
            }
        );
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).send('Server error');
    }
};


exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ msg: 'Logged out successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
