const getForgetPassword = (req, res, next) => {
  res.render("auth/forgetPassword.ejs");
};

export default { getForgetPassword };
