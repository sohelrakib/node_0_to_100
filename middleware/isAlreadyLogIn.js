module.exports = (req, res, next) => {
    if ( req.session.isLoggedIn ) {
        // return res.redirect('back');
        backURL= req.get('referer') || '/dept';
        console.log('previous url: ', backURL);
        res.redirect(backURL);
    }
    next();
}