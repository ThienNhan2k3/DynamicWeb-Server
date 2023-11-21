const getForgetPassword = (req, res, next) => {
  res.render("auth/forgetPassword.ejs");
};

module.exports = { 
  getForgetPassword
};
