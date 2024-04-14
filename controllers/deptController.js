const Dept = require('../models/dept');

exports.index = (req, res, next) => {
    // res.send(res.locals.csrfToken);

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

        console.log('flash:',flash_msg);

        res.render('dept/list', {
            depts: depts,
            pageTitle: 'All Dept',
            index: 'dept',
            flash_msg: flash_msg,
            flash_keyword: flash_keyword,
            flash_alert: flash_alert,
            admin_user: req.session.user,
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
        req.flash('flash_alert', 'success');
        res.redirect('/dept');
    })
    .catch(err => {
        console.log(err);
    });
}

exports.deleteDept = (req, res, next) => {
    // console.log(req.body);
    // res.send(req.body);

    const deptId = req.body.deptId;
    Dept.findByPk(deptId)
            .then(dept => {
                req.flash('flash_keyword', dept.name);
                return dept.destroy();
                // res.send(dept);
                // console.log(dept.name);
            })
            .then(result => {
                console.log('destroyed');
                console.log(result);
                req.flash('flash_msg', 'Dept deleted!');
                req.flash('flash_alert', 'danger');
                res.redirect('/dept');
            })
            .catch()
}

exports.edit = (req, res, next) => {
    const deptId = req.params.id;
    console.log(deptId);

    Dept.findByPk(deptId)
        .then(dept => {
            if (!dept) {
                return res.redirect('/dept');
            }
            res.render('dept/edit', { 
                pageTitle: 'Edit Dept',
                index: 'edit',
                dept: dept
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.update = (req, res, next) => {
    // console.log(req.body);
    const deptId = req.body.deptId;
    const name = req.body.name;
    const status = req.body.status;

    if ( !name || !status ) {
        return res.redirect('/dept/edit/'+deptId);
    }

    Dept.findByPk(deptId)
            .then(dept => {
                dept.name = name;
                dept.status = status;
                return dept.save();
            })
            .then(result => {
                console.log('updated');

                req.flash('flash_keyword', name);
                req.flash('flash_msg', 'Dept updated!');
                req.flash('flash_alert', 'success');

                res.redirect('/dept');
            })
            .catch(err => console.log(err));
}