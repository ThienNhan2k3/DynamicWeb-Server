const models = require("../models");

const authUser = async (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        res.locals.accountType = req.user.type;
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


