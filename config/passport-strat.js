'use strict';

const bCrypt = require('bcrypt-nodejs');
const passport = require('passport');
const { Strategy } = require('passport-local');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
let User = null;

// Registration authetication.
const RegistrationStrategy = new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    (req, email, password, done) => {
        User = req.app.get('models').User;
        const generateHash = (password) => {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8));
        };

        User.findOne({
            raw: true,
            where: {
                [Op.or]: [{ email },
                { screenName: req.body.screenName }]
            }
        }).then((user) => {
            if (user && user.screenName == req.body.screenName) {
                return done(null, false, {
                    message: 'That screen name is already taken'
                });
            } else if (user && user.email == email) {
                return done(null, false, {
                    message: 'That email is already taken'
                });
            } else {
                const userPassword = generateHash(password);
                const data =
                    {
                        screenName: req.body.screenName,
                        email,
                        password: userPassword,
                        last_logged_in: new Date()
                    };
                User.create(data).then((newUser, created) => {
                    if (!newUser) {
                        return done(null, false);
                    }
                    if (newUser) {
                        return done(null, newUser);
                    }
                });
            }
        });
    }
);


// login authentication
const LoginStrategy = new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        User = req.app.get('models').User;
        const isValidPassword = (userpass, password) => {
            return bCrypt.compareSync(password, userpass);
        };

        User.findOne({ where: { email } })
            .then((user) => {

                if (!user) {
                    return done(null, false, {
                        message: 'Can\'t find a user with those credentials. Please try again'
                    });
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                const userinfo = user.get();
                return done(null, userinfo);
            })
            .catch((err) => {
                console.log("Error:", err);
                return done(null, false, {
                    message: 'Something went wrong with your sign in'
                });
            });
    }
);

passport.serializeUser((user, done) => {
    done(null, user);
});

// deserialize user
passport.deserializeUser(({ id }, done) => {
    User.findById(id).then((user) => {
        if (user) {
            done(null, user.get());
        } else {
            done(user.errors, null);
        }
    });
});

// A POST to register or login will trigger a strategy, 
passport.use('local-signup', RegistrationStrategy);
passport.use('local-signin', LoginStrategy);
