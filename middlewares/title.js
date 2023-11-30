const controller = {};

controller.role = async (req, res, next) => {
    let type = req.session.accountType;
    if (type == 'Phuong') res.locals.role = 'Phường'
    else if (type == 'Quan') res.locals.role = 'Quận'
    else if (type == 'So') res.locals.role = 'Sở'

    next();
}

module.exports = controller;