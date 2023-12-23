const models = require("../models");

// const authUser = async (req, res, next) => {
//     if (req.session.accountId == null || req.session.accountId == undefined) {
//         return res.redirect("/");
//     }
//     const account = await models.Account.findOne({ where: { id: req.session.accountId } });
//     if (!account) {
//       return res.redirect("/");
//     }
//     next();
// }

const authUser = async (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        next();
    } else {
        return res.redirect("/");
    }
}

const authRole = (type) => {
    return async (req, res, next) => {
        const account = req.user;
        if (account.type !== type) {
            res.status(401)
            return res.send("Not allowed !!!");
        }
        res.locals.accountType = type;
        res.locals.createWardDistrictPageQueryString = require("../util/queryString").createWardDistrictPageQueryString;
        next();
    }
}

module.exports = {
    authUser,
    authRole
}


