exports.pageNotFound = (req, res, next) => {
    // res.status(404).send('<h1>Page not found</h1>');
    res.render('other/404');
}