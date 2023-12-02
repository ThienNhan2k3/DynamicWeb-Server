const models = require("../models");

const authUser = async (req, res, next) => {
    if (req.session.accountId == null || req.session.accountId == undefined) {
        return res.redirect("/");
    }
    const account = await models.Account.findOne({ where: { id: req.session.accountId } });
    if (!account) {
      return res.redirect("/");
    }
    next();
}

const authRole = (type) => {
    return async (req, res, next) => {
        const account = await models.Account.findOne({where: {id: req.session.accountId}});
        // console.log("Account id: ", req.session.accountId);
        // console.log("Account: ", account);
        if (account.type !== type) {
            res.status(401)
            return res.send("Not allowed !!!");
        }
        res.locals.accountType = type;
        next();
    }
}

module.exports = {
    authUser,
    authRole
}


