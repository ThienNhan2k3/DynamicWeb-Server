const controller = {};

controller.accountManagement = (req, res) => {
    return res.render("So/accountManagement.ejs");
}

controller.registerAccount = (req, res) => {
    return res.render("So/accountManagement.ejs");
}

module.exports = controller;