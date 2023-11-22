const bcrypt = require("bcrypt");
const { Account } = require("../models");
const Mailjet = require("node-mailjet");
const Sequelize = require("sequelize");

const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC || "5f453b57b69003f11cdbd0d46c363385",
  apiSecret:
    process.env.MJ_APIKEY_PRIVATE || "b7af7b365498a7f77d1270fb86fa5826",
});

const getForgetPassword = (req, res, next) => {
  res.render("auth/forgetPassword.ejs");
};

const postForgetPassword = async (req, res, next) => {
  const usernameOrEmail = req.body.email;
  const account = await Account.findOne({
    where: {
      [Sequelize.Op.or]: {
        username: usernameOrEmail,
        email: usernameOrEmail,
      },
    },
  });
  if (account == undefined) {
    return res.redirect("/forget-password");
  }
  const email = account.email;
  let otp = "";
  for (let i = 0; i < 6; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    otp += randomDigit.toString();
  }
  console.log(otp);
  let currentTime = new Date();

  account.otp = otp;
  account.expiredOtp = currentTime.setMinutes(currentTime.getMinutes() + 30);

  await account.save();

  const request = await mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "hiiback0608@gmail.com",
          Name: "Sở văn hóa và du lịch",
        },
        To: [
          {
            Email: email,
            Name: email,
          },
        ],
        TemplateID: 5332254,
        Subject: "Password reset",
        TemplateLanguage: true,
        Variables: {
          otp_code: otp,
        },
      },
    ],
  });
  const id = account.id;
  res.redirect(`/otp-waiting?account=${id}`);
};

const getOtpWaiting = (req, res, next) => {
  const accountId = req.query.account;
  res.render("auth/otpWaiting.ejs", { accountId: accountId });
};

const postOtpWaiting = async (req, res, next) => {
  console.log(req.body)
  const accountId = req.body.account;
  const inputOtp = req.body.otp;
  console.log(accountId);

  const account = await Account.findOne({ where: { id: accountId } });
  console.log(account);
  if (!account) return res.status(400).json({ message: "Account not found!" });
  // check OTP
  if (new Date() > account.expiredOtp) {
    res.redirect("/");
  }
  if (inputOtp != account.otp) {
    res.redirect("/");
  } else {
    res.redirect(`/reset-password?account=${accountId}&otp=${inputOtp}`);
  }
};

const getResetPassword = (req, res, next) => {
  const accountId = req.query.account;
  const otp = req.query.otp;
  res.render("auth/resetPassword.ejs", { accountId: accountId, otp: otp });
};

const postResetPassword = async (req, res, next) => {
  const accountId = req.body.account;
  const newPassword = req.body.password;
  const otp = req.body.otp;

  const account = await Account.findOne({ where: { id: accountId } });
  if (!account) return res.status(400);
  if (account.otp == otp) {
    console.log(newPassword)
    account.password = newPassword;
    account.save();
  }
  res.redirect("/")
};

const getLogin = (req, res) => {
  res.render("index");
};

const postLogin = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  const account = Account.findOne({
    where: {
      [Op.or]: {
        username: usernameOrEmail,
        email: usernameOrEmail,
      },
    },
  });

  if (!account) {
    return res.redirect("/", {
      error: "Username or email doesn't exist",
    });
  }

  const isMatch = await bcrypt.compare(password, account.password);
  if (!isMatch) {
    return res.redirect("/", {
      error: "Your password is not valid",
    });
  }

  if (account.type === "So") {
    req.redirect("/department/accountManagement");
  }
};

module.exports = {
  getForgetPassword,
  getLogin,
  postLogin,
  getOtpWaiting,
  postForgetPassword,
  getResetPassword,
  postOtpWaiting,
  postResetPassword,
};
