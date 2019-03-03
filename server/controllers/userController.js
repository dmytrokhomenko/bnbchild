const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongooseHelpers');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

exports.auth = (req, res) => {
    const { username, email, password, passwordConfirmation } = req.body;

    if (!password || !email) {
        return res.status(422).send({
            errors: [{
                title: 'Authentication error!', detail: 'Provide email and password!'
            }]
        });
    }

    User.findOne({ email }, (err, existingUser) => {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (!existingUser) {
            return res.status(422).send({
                errors: [{
                    title: 'Authentication error!', detail: 'User does not exist!'
                }]
            });
        }

        if (existingUser.hasSamePassword(password)) {
            const token = jwt.sign(
                {
                    userId: existingUser._id,
                    username: existingUser.username
                },
                config.SECRET_JWT,
                { expiresIn: '1h' }
            );

            return res.json(token);

        } else {
            return res.status(422).send({
                errors: [{
                    title: 'Authentication error!', detail: 'Wrong password!'
                }]
            });
        }
    })

}

exports.register = (req, res) => {
    console.log(req.body);
    const { username, email, password, passwordConfirmation } = req.body;

    if (!password || !email) {
        return res.status(422).send({
            errors: [{
                title: 'Registration error!', detail: 'Provide email and password!'
            }]
        });
    }

    if (password !== passwordConfirmation) {
        return res.status(422).send({
            errors: [{
                title: 'Registration error!', detail: 'Password and confirm password don\'t match!'
            }]
        });
    }

    User.findOne({ email }, (err, existingUser) => {//same as { email: email};
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (existingUser) {
            return res.status(422).send({
                errors: [{
                    title: 'Registration error!', detail: 'User with this email already exist!'
                }]
            });
        }

        const user = new User({ username, email, password });
        user.save(err => {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }
            return res.json({ "registred": true });
        })
    });


}


exports.authMiddleware = function (req, res, next) {
    const token = req.headers.authorization;



    if (token) {
        const user = parseToken(token);

        User.findById(user.userId, (err, existingUser) => {//same as { email: email};
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            if (existingUser) {
                res.locals.existingUser = user;
                next();
            } else {
                sendUnAthorizedRes();
            }
        })
    } else {
        sendUnAthorizedRes();
    }
}

function parseToken(token) {
    return jwt.verify(token.split(' ')[1], config.SECRET_JWT);
}

const sendUnAthorizedRes = () => {
    return res.status(401).send({
        errors: [{
            title: 'Not authorized!', detail: 'You need to login to get access!'
        }]
    });
};