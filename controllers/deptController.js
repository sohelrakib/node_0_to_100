const Dept = require('../models/dept');

exports.index = (req, res, next) => {
    Dept.findAll({
        // where: {
        //     status: 1,
        // },
        where: {
            status: [0,1],
        },
        order: [
            ['id', 'desc']
        ]
    })
    .then(depts => {
        // console.log(depts);
        // res.send(depts);

        res.render('dept/list', {
            depts: depts,
            pageTitle: 'All Dept',
            index: 'dept'
        });
    })
    .catch(err => {
        console.log(err);
    })
    
}