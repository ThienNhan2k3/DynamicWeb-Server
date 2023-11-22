const bcrypt = require("bcrypt");
const {Account} = require("../models");
const { Op } = require("sequelize");


const getForgetPassword = (req, res, next) => {
  res.render("auth/forgetPassword.ejs");
};

const getLogin = (req, res) => {
  const users = [];
  const types = ["So", "Quan", "Phuong"];
  for (let i = 0; i < types.length; i++){
    users.push(Account.findOne({ where: { type: types[i]}}));
  }
  res.render("index", users);
}

const postLogin = async (req, res) => {
  const {usernameOrEmail, password} = req.body;

  try {
    const account = await Account.findOne({where: {
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
    console.log(password, account.password);
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.redirect("/", {
        error: "Your password is not valid"
      })
    }
  
    req.session.accountId = account.id;
    console.log(account.type);
    res.redirect("/department/accountManagement");
    // if (account.type === 'So') {
    //   res.redirect("/department/accountManagement");
    // }
  } catch(err) {
    console.log(err);
    res.redirect('/login')
  }
  
}

const getLogout = (req, res) => {
  if (req.session.accountId) {
    req.session.destroy((err) => {
      console.error(err);
      res.redirect("/");
    })
  }
}

module.exports = { 
  getForgetPassword,
  getLogin,
  postLogin,
  getLogout
};
