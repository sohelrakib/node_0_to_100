const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const AdminModel = require('../models/admin');

exports.registration = (req, res, next) => {
    let flash_msg = req.flash('flash_msg');
    if ( flash_msg.length > 0 ) {
        flash_msg = flash_msg[0];
    } else {
        flash_msg = null;
    }

    let flash_alert = req.flash('flash_alert');
    if ( flash_alert.length > 0 ) {
        flash_alert = flash_alert[0];
    } else {
        flash_alert = null;
    }

    res.render('admin/registration', { 
        pageTitle: 'Admin Registration',
        index: 'registration',
        flash_msg: flash_msg,
        flash_alert: flash_alert,
    });
}

exports.postRegistration = [
    body('name').notEmpty().withMessage('Please enter a valid name'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('confirm_password').isLength({ min: 5 }).withMessage('Confirm Password must be at least 5 characters long'),
    body('confirm_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords did not match');
        }
        return true;
    }),
    body('email').custom(async (value) => {
        try {
            const admin = await AdminModel.findOne({ where: { email: value } });
            if (admin) {
                throw new Error('Admin user already exists');
            }
            return true; // Validation passes if no admin with the same email is found
        } catch (error) {
            console.error('Error:', error);
            throw new Error(error);
        }
    }),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('admin/registration', { 
                pageTitle: 'Admin Registration',
                index: 'registration',
                errors: errors.array() 
            });
        }

        // res.send(req.body.password);

        bcrypt.hash(req.body.password, 12, (err, hash) => {
            if (err) {
                // Handle error
                return res.status(500).send('Error hashing password');
            }
            // Send the hashed password as response
            // res.send(hash);
            AdminModel.create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            })
            .then(result => {
                console.log('registration done:');
                console.log(result.name);
                req.flash('flash_msg', 'Registration done, please login!');
                req.flash('flash_alert', 'success');
                req.flash('flash_keyword', result.name);
                res.redirect('/login');
            })
            .catch(err => {
                return res.status(500).send('Please try with a different email!');
                // console.log('registration error:');
                // console.log(err);
                // req.flash('flash_msg', 'Please try with a different email!');
                // req.flash('flash_alert', 'danger');
                // res.redirect('/registration');
            });

        });
    }
];


exports.login = (req, res, next) => {
    let flash_msg = req.flash('flash_msg');
    if ( flash_msg.length > 0 ) {
        flash_msg = flash_msg[0];
    } else {
        flash_msg = null;
    }

    let flash_keyword = req.flash('flash_keyword');
    if ( flash_keyword.length > 0 ) {
        flash_keyword = flash_keyword[0];
    } else {
        flash_keyword = null;
    }

    let flash_alert = req.flash('flash_alert');
    if ( flash_alert.length > 0 ) {
        flash_alert = flash_alert[0];
    } else {
        flash_alert = null;
    }

    res.render('admin/login', { 
        pageTitle: 'Admin Login',
        index: 'login',
        flash_msg: flash_msg,
        flash_keyword: flash_keyword,
        flash_alert: flash_alert
    });
}


exports.postLogin = async (req, res, next) => {
    // res.send(req.body);
    const loggedInUser = await authenticateUser(req.body.email, req.body.password);
    if (loggedInUser) {
        req.flash('flash_keyword', loggedInUser.email);
        req.flash('flash_msg', 'Welcome');
        req.flash('flash_alert', 'success');

        req.session.isLoggedIn = true;
        req.session.user = loggedInUser;

        res.redirect('/dept');
    } else {
        // console.log('Invalid username or password.');
        req.flash('flash_keyword', null);
        req.flash('flash_msg', 'Invalid username or password.');
        req.flash('flash_alert', 'danger');

        res.redirect('/login');
    }
}

// Function to authenticate a user
async function authenticateUser(email, password) {
    // Retrieve the user from the database based on the username
    const admin = await AdminModel.findOne({ where: { email: email }  });

    if (!admin) {
        // admin not found
        return false;
    }

    // Compare the hashed password in the database with the provided password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
        // Incorrect password
        return false;
    }

    // Password is correct, return the user
    return admin;
}

exports.postLogout = async (req, res, next) => {
    await req.session.destroy();
    res.redirect('/login');
}

exports.postLogout2 = (req, res, next) => {
    req.session.destroy(() => {
        // req.flash('error', 'logout!');
        res.redirect('/login');
    })
}