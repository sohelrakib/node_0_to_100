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
        let flash_msg = req.flash('flash_msg');
        if ( flash_msg.length > 0 ) {
            flash_msg = flash_msg[0];
        } else {
            flash_msg = null;
        }
        console.log('flash:',flash_msg);

        res.render('dept/list', {
            depts: depts,
            pageTitle: 'All Dept',
            index: 'dept',
            flash_msg: flash_msg
        });
    })
    .catch(err => {
        console.log(err);
    })
    
}

exports.add = (req, res, next) => {
    // console.log('dept add');
    res.render('dept/add', { 
        pageTitle: 'Add a Dept',
        index: 'dept.add'
    });
}

exports.postAdd = (req, res, next) => {
    // console.log('dept post add');
    // res.send(req.body);

    const name = req.body.name;
    const status = req.body.status;

    if ( !name ) {
        req.flash('flash_msg', 'invalid dept!');
        return res.redirect('/dept/add');
    }

    Dept.create({
        name: name,
        status: status,
    })
    .then(result => {
        console.log('Dept created');
        req.flash('flash_msg', 'new dept added!');
        res.redirect('/dept');
    })
    .catch(err => {
        console.log(err);
    });
}