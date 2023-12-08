const {
  Area,
  Account,
  AdsPlacement,
  AdsType,
  LocationType,
  sequelize,
} = require("../models");
const checkInput = require("../util/checkInput");
const bcrypt = require("bcrypt");

const controller = {};

controller.accountManagement = async (req, res) => {
  let page = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
  const options = {
    attributes: ["id", "firstName", "lastName", "email", "type", "areaId"],
  };

  const accountTypes = ["Phuong", "Quan", "So"];
  const [districts] = await sequelize.query(
    `SELECT DISTINCT district FROM Areas`
  );
  let accounts = await Account.findAll(options);

  const sizePage = 1;
  const minPage = 1;
  const accountsPerPage = 1;
  const maxPage = Math.ceil((accounts.length * 1.0) / accountsPerPage);
  let pagination = {};
  if (page < minPage || page > maxPage) {
    res.send("<h1>Page not found!!!</h1>");
  } else {
    pagination = {
      minPage,
      currentPage: page,
      maxPage,
      sizePage,
      limitPage: 2,
      accounts: accounts.slice((page - 1) * sizePage, page * sizePage),
    };
  }

  const createErr = {
    error: {
      firstName: req.flash("firstNameCreateModalError"),
      lastName: req.flash("lastNameCreateModalError"),
      username: req.flash("usernameCreateModalError"),
      email: req.flash("emailCreateModalError"),
      password: req.flash("passwordCreateModalError"),
      confirmPassword: req.flash("confirmPasswordCreateModalError"),
    },
    value: {
      firstName: req.flash("firstNameCreateModal")[0],
      lastName: req.flash("lastNameCreateModal")[0],
      username: req.flash("usernameCreateModal")[0],
      email: req.flash("emailCreateModal")[0],
      password: req.flash("passwordCreateModal")[0],
      confirmPassword: req.flash("confirmPasswordCreateModal")[0],
    },
  };

  const createMsg = {
    status: req.flash("createMsgStatus"),
    content: req.flash("createMsgContent"),
  };
  const editMsg = {
    status: req.flash("editMsgStatus"),
    content: req.flash("editMsgContent"),
  };

  return res.render("So/accountManagement.ejs", {
    accountTypes,
    districts,
    pagination,
    createErr,
    createMsg,
    editMsg,
  });
};

controller.getWardsWithSpecificDistrict = async (req, res) => {
  const district = req.query.district || "";

  const options = {
    attributes: ["ward"],
  };
  if (district.trim() !== "") {
    options.where = {
      district,
    };
  }
  const wards = await Area.findAll(options);

  return res.json(wards);
};

controller.createAccount = async (req, res) => {
  const {
    firstNameCreateModal,
    lastNameCreateModal,
    usernameCreateModal,
    emailCreateModal,
    passwordCreateModal,
    confirmPasswordCreateModal,
    accountTypeSelectCreateModal,
    districtSelectCreateModal,
    wardSelectCreateModal,
  } = req.body;

  let loginFailed = false;
  //First name
  if (checkInput.isEmpty(firstNameCreateModal)) {
    req.flash("firstNameCreateModalError", "Tên cán bộ không thể để trống!");
    loginFailed = true;
  }
  //Last name
  if (checkInput.isEmpty(lastNameCreateModal)) {
    req.flash(
      "lastNameCreateModalError",
      "Tên đệm và họ của cán bộ chưa được nhập!"
    );
    loginFailed = true;
  }
  //Username
  if (checkInput.isEmpty(usernameCreateModal)) {
    loginFailed = true;
    req.flash("usernameCreateModalError", "Tên đăng nhập không thể để trống!");
  } else if (await checkInput.usernameExists(usernameCreateModal)) {
    loginFailed = true;
    req.flash("usernameCreateModalError", "Tên đăng nhập đã tồn tại!");
  }
  //Email
  if (checkInput.isEmpty(emailCreateModal)) {
    loginFailed = true;
    req.flash("emailCreateModalError", "Email chưa được nhập!");
  } else if (!checkInput.isEmail(emailCreateModal)) {
    loginFailed = true;
    req.flash("emailCreateModalError", "Email không hợp lệ!");
  } else if (await checkInput.emailExists(emailCreateModal)) {
    loginFailed = true;
    req.flash("emailCreateModalError", "Email này đã được sử dụng!");
  }
  //Password
  if (checkInput.isEmpty(passwordCreateModal)) {
    loginFailed = true;
    req.flash("passwordCreateModalError", "Mật khẩu không thể bỏ trống!");
  } else if (!checkInput.isValidPassword(passwordCreateModal)) {
    loginFailed = true;
    req.flash("passwordCreateModalError", "Mật khẩu này quá yếu!");
  }
  //Confirm password
  if (checkInput.isEmpty(confirmPasswordCreateModal)) {
    loginFailed = true;
    req.flash(
      "confirmPasswordCreateModalError",
      "Mật khẩu xác nhận chưa được nhập!"
    );
  } else if (
    !checkInput.isValidConfirmPassword(
      passwordCreateModal,
      confirmPasswordCreateModal
    )
  ) {
    loginFailed = true;
    req.flash(
      "confirmPasswordCreateModalError",
      "Mật khẩu xác nhận không trùng với mật khẩu!"
    );
  }

  if (loginFailed) {
    req.flash("firstNameCreateModal", firstNameCreateModal);
    req.flash("lastNameCreateModal", lastNameCreateModal);
    req.flash("usernameCreateModal", usernameCreateModal);
    req.flash("emailCreateModal", emailCreateModal);
    req.flash("passwordCreateModal", passwordCreateModal);
    req.flash("confirmPasswordCreateModal", confirmPasswordCreateModal);

    req.flash("createMsgStatus", "danger");
    req.flash("createMsgContent", "Đăng ký thất bại");
    return res.redirect("/department/accountManagement");
  }

  try {
    const hashPassword = await bcrypt.hash(passwordCreateModal, 12);
    const newAccount = await Account.create({
      firstName: firstNameCreateModal,
      lastName: lastNameCreateModal,
      username: usernameCreateModal,
      email: emailCreateModal,
      password: hashPassword,
      type: accountTypeSelectCreateModal,
      district: districtSelectCreateModal,
      ward: wardSelectCreateModal,
    });
    req.flash("createMsgStatus", "success");
    req.flash("createMsgContent", "Đăng ký thành công");
  } catch (err) {
    console.log(err);
    req.flash("createMsgStatus", "danger");
    req.flash("createMsgContent", "Đăng ký thất bại");
  }
  return res.redirect("/department/accountManagement");
};

controller.editAccount = async (req, res) => {
  const {
    idEditModal,
    accountTypeSelectEditModal,
    districtSelectEditModal,
    wardSelectEditModal,
  } = req.body;
  try {
    await Account.update(
      {
        type: accountTypeSelectEditModal,
        district: districtSelectEditModal ? districtSelectEditModal : "",
        ward: wardSelectEditModal ? wardSelectEditModal : "",
      },
      { where: { id: idEditModal } }
    );
    req.flash("editMsgStatus", "success");
    req.flash("editMsgContent", "Phân công khu vực thành công");
    return res.send("Account updated!");
  } catch (err) {
    console.error(err);
    req.flash("editMsgStatus", "danger");
    req.flash("editMsgContent", "Phân công khu vực thất bại");
    return res.send("Can not update account!");
  }
};

controller.deleteAccount = async (req, res) => {
  const { idEditModal } = req.body;
  try {
    await Account.destroy({ where: { id: idEditModal } });
    req.flash("deleteMsgStatus", "success");
    req.flash("deleteMsgContent", "Xóa tài khoản thành công");
    return res.send("Account deleted!");
  } catch (err) {
    console.error(err);
    req.flash("editMsgStatus", "danger");
    req.flash("editMsgContent", "Xóa tài khoản thất bại");
    return res.send("Can not delete account!");
  }
};

const getAdsTypeName = async (adsPlacement) => {
  try {
    const adsType = await AdsType.findByPk(adsPlacement.AdsTypeId);
    return adsType ? adsType.type : null;
  } catch (error) {
    console.error("Error fetching AdsType:", error);
    throw error;
  }
};

const getLocationTypeName = async (adsPlacement) => {
  try {
    const locationType = await LocationType.findByPk(
      adsPlacement.LocationTypeId
    );
    return locationType ? locationType.locationType : null;
  } catch (error) {
    console.error("Error fetching LocationType:", error);
    throw error;
  }
};
controller.adplaceManagement = async (req, res) => {
  const adsPlacements = await AdsPlacement.findAll({
    include: [{ model: Area }, { model: LocationType }, { model: AdsType }],
  });
  console.log(adsPlacements.length);

  const adsPlacementsWithData = await Promise.all(
    adsPlacements.map(async (adsPlacement) => {
      const adsTypeName = await getAdsTypeName(adsPlacement);
      const locationTypeName = await getLocationTypeName(adsPlacement);
      return { ...adsPlacement.toJSON(), adsTypeName, locationTypeName };
    })
  );

  for (let i = 0; i < adsPlacementsWithData.length; i++) {
    console.log(adsPlacementsWithData[i]);
  }
  res.render("So/adplaceManagement.ejs", { adsPlacementsWithData });
};

module.exports = controller;
