const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

exports.registration = (req, res, next) => {
    res.render('admin/registration', { 
        pageTitle: 'Admin Registration',
        index: 'registration'
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
            res.send(hash);
        });
    }
];