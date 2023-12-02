const controller = {};

controller.role = async (req, res, next) => {
    let type = req.session.accountType;
    if (type == 'ward') res.locals.role = 'Phường'
    else if (type == 'district') res.locals.role = 'Quận'
    else if (type == 'department') res.locals.role = 'Sở'

    res.locals.accountType = req.session.accountType;

    next();
}

module.exports = controller;