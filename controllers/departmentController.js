<<<<<<< HEAD:controllers/department.js
const {
  Area,
  Account,
  AdsPlacement,
  AdsType,
  LocationType,
  sequelize,
} = require("../models");
=======
const {Area, Account, PermitRequest, Board, sequelize} = require("../models");
>>>>>>> 3ad61d65399b331c63b85703e25b183558939804:controllers/departmentController.js
const checkInput = require("../util/checkInput");
const {createWardDistrictPageQueryString} = require("../util/queryString");
const bcrypt = require("bcrypt");

const controller = {};
const { Op } = require('sequelize');



controller.accountManagement = async (req, res) => {
<<<<<<< HEAD:controllers/department.js
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
=======
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
        }
    }
    const createMsg = {
        status: req.flash("createMsgStatus"), 
        content: req.flash("createMsgContent"),
    }

    const editMsg = {
        status: req.flash("editMsgStatus"), 
        content: req.flash("editMsgContent")
    }

    const deleteMsg = {
        status: req.flash("deleteMsgStatus"), 
        content: req.flash("deleteMsgContent")
    }

    let page = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
    let district = req.query.district || '';
    let ward = req.query.ward || '';
    const options = {
        attributes: ["id", "firstName", "lastName", "email", "type"],
        where: {
            id: { [Op.ne]: req.session.accountId }
        },
        include: [{
            model: Area,
            attributes: ['id', 'district', 'ward'],
            where: {}
        }]
    }
    let wards = [], currentDistrict = '', currentWard = ''; 
    if (district.trim() !== '') {
        options.include[0].where.district = district;
        options.where = {
            [Op.or]: [
                { type: 'Quan' },
                { type: 'Phuong' }
            ]
        }
        wards = await Area.findAll({
            where: {
                district
            }
        })
        currentDistrict = district;
        if (ward.trim() !== '') {
            options.include[0].where.ward = ward;
            options.where = {
                type: "Phuong",
            }
            currentWard = ward;
        }
    }

    const accountTypes = ["Phuong", "Quan", "So"]
    const [districts] = await sequelize.query(`SELECT DISTINCT district FROM Areas`);
    let accounts = await Account.findAll(options);

    const minPage = 1;
    const accountsPerPage = 5;
    const maxPage = Math.ceil(accounts.length * 1.0 / accountsPerPage);
    let pagination = {};
    if (page < minPage || page > maxPage) {
        if (deleteMsg.status.length > 0) {
            page = (maxPage <= 0) ? 1 : maxPage;
            return res.redirect("/department" + createWardDistrictPageQueryString(req.url, 'page=', page));
        } else {
            if (page !== 1) {
                return res.send("<h1>Page not found</h1>")
            }
            pagination = {
                minPage: 1,
                currentPage: page,
                maxPage: 1,
                limitPage: 2,
                accounts: [],
            }
        }
    } else {
        pagination = {
            minPage,
            currentPage: page,
            maxPage,
            limitPage: 2,
            accounts: accounts.slice((page - 1) * accountsPerPage, page * accountsPerPage),
        }
    }
    const currentUrl = req.url.slice(1);
    console.log(pagination);
    return res.render("So/accountManagement.ejs", {
        accountTypes,
        districts, 
        wards,
        pagination,
        createErr,
        createMsg,
        editMsg,
        deleteMsg,
        currentUrl,
        currentDistrict,
        currentWard
    });
}
>>>>>>> 3ad61d65399b331c63b85703e25b183558939804:controllers/departmentController.js

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

<<<<<<< HEAD:controllers/department.js
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
=======
    try {
        const hashPassword = await bcrypt.hash(passwordCreateModal, 12);
        let areaId = 1;
        if (accountTypeSelectCreateModal !== 'So') {
            const options = {
                where: {
                    district: districtSelectCreateModal,
                }
            }
            if (accountTypeSelectCreateModal === 'Phuong') {
                options.where.ward = wardSelectCreateModal;
            }
            areaId = (await Area.findOne(options)).id;
        }
        const newAccount = await Account.create({ 
            firstName: firstNameCreateModal, 
            lastName: lastNameCreateModal,
            username: usernameCreateModal,
            email: emailCreateModal,
            password: hashPassword,
            type: accountTypeSelectCreateModal,
            AreaId: areaId,
        });
        req.flash("createMsgStatus", "success");
        req.flash("createMsgContent", "Đăng ký thành công");
    } catch(err) {
        console.log(err);
        req.flash("createMsgStatus", "danger");
        req.flash("createMsgContent", "Đăng ký thất bại");
    }
    return res.redirect("/department/accountManagement");    
}

controller.editAccount = async (req, res) => {
    const {
        idEditModal,
        accountTypeSelectEditModal, 
        districtSelectEditModal,
        wardSelectEditModal
    } = req.body;
    try {
        let areaId = 1;
        if (accountTypeSelectEditModal !== 'So') {
            const options = {
                where: {
                    district: districtSelectEditModal,
                }
            }
            if (accountTypeSelectEditModal === 'Phuong') {
                options.where.ward = wardSelectEditModal;
            }
            areaId = (await Area.findOne(options)).id;
        }
        await Account.update(
            {type: accountTypeSelectEditModal, AreaId: areaId},
            {where: {id: idEditModal}}
        )
        req.flash("editMsgStatus", "success");
        req.flash("editMsgContent", "Phân công khu vực thành công");
        return res.send("Account updated!");
    } catch(err) {
        console.error(err);
        req.flash("editMsgStatus", "danger");
        req.flash("editMsgContent", "Phân công khu vực thất bại");
        return res.send("Can not update account!");
    }
}

controller.deleteAccount = async (req, res) => {
    const { accountId } = req.body;
    try {
        await Account.destroy(
            {where: {id: accountId}}
        )
        req.flash("deleteMsgStatus", "success");
        req.flash("deleteMsgContent", "Xóa tài khoản thành công");
        return res.send("Account deleted!");
    } catch(err) {
        console.error(err);
        req.flash("deleteMsgStatus", "danger");
        req.flash("deleteMsgContent", "Xóa tài khoản thất bại");
        return res.send("Can not delete account!");
    }
}


controller.viewAdsRequest = async (req, res) => {
    let page = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
    let district = req.query.district || '';
    let ward = req.query.ward || '';

    let wards = [], currentDistrict = '', currentWard = ''; 
    let whereCondition = '';
    if (district.trim() !== '') {
        wards = await Area.findAll({
            where: {
                district
            }
        })
        whereCondition += `WHERE A.district="${district}" `;
        currentDistrict = district;
        if (ward.trim() !== '') {
            currentWard = ward;
            whereCondition += ` AND A.ward="${ward}"`;
        }
    }

    const [districts] = await sequelize.query(`SELECT DISTINCT district FROM Areas`);
    let permitRequests = await sequelize.query(`
        SELECT BTs.type AS boardType, PRs.id, PRs.content, PRs.start, PRs.end, PRs.status, Cs.id AS companyId, Cs.name AS companyName, Cs.phone AS companyPhone, Cs.address AS companyAddress, Cs.email AS companyEmail, 
        A.id AS areaId, A.district AS district, A.ward AS ward, APs.address AS address
        FROM permitRequests PRs
        LEFT JOIN companies Cs ON PRs.companyId = Cs.id
        LEFT JOIN boards Bs ON PRs.boardId = Bs.id
        LEFT JOIN boardTypes BTs ON Bs.boardTypeId = BTs.id
        LEFT JOIN adsPlacements APs ON Bs.adsPlacementId = APs.id
        LEFT JOIN areas A ON APs.areaId = A.id
    ` + whereCondition, { type: sequelize.QueryTypes.SELECT });

    const minPage = 1;
    const requestsPerPage = 1;
    const maxPage = Math.ceil(permitRequests.length * 1.0 / requestsPerPage);
    let pagination = {};
    console.log(page, minPage, permitRequests.length);
    if (page < minPage || page > maxPage) {
        if (page !== 1) {
            return res.send("<h1>Page not found</h1>");
        }
        pagination = {
            minPage: 1,
            currentPage: page,
            maxPage: 1,
            limitPage: 2,
            permitRequests: [],
        }
    } else {
        pagination = {
            minPage,
            currentPage: page,
            maxPage,
            limitPage: 2,
            permitRequests: permitRequests.slice((page - 1) * requestsPerPage, page * requestsPerPage),
        }
    }
    const currentUrl = req.url.slice(1);
    console.log(pagination);
    
    return res.render("So/viewAdsRequest.ejs", {
        formatDate: (date) => {
            return date.toLocaleDateString({
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
        },
        pagination,
        currentUrl,
        districts,
        wards,
        currentDistrict,
        currentWard
    });
}

controller.acceptOrDenyAdsRequest = (req, res) => {
    return res.send("Hello world");
}

module.exports = controller;
>>>>>>> 3ad61d65399b331c63b85703e25b183558939804:controllers/departmentController.js
