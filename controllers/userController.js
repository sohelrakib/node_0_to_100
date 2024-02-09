
exports.index = (req, res, next) => {
    // res.send('<html><h1>Hello User</h1></html>');
    res.render('user/list', {
        
        index: 'user'
    });
}