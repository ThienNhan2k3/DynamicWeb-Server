const bcrypt = require("bcrypt");
const {Account} = require("../models");

const getForgetPassword = (req, res, next) => {
  res.render("auth/forgetPassword.ejs");
};

const getLogin = (req, res) => {
  res.render("index");
}

const postLogin = async (req, res) => {
  const {usernameOrEmail, password} = req.body;

  const account = Account.findOne({where: {
    [Op.or]: {
      username: usernameOrEmail,
      email: usernameOrEmail
    }
  }});

  if (!account) {
    return res.redirect("/", {
      error: "Username or email doesn't exist"
    })
  }

  const isMatch = await bcrypt.compare(password, account.password);
  if (!isMatch) {
    return res.redirect("/", {
      error: "Your password is not valid"
    })
  }

  if (account.type === 'So') {
    req.redirect("/department/accountManagement");
  }
}

module.exports = { 
  getForgetPassword,
  getLogin,
  postLogin
};
