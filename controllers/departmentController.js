const {
  Area,
  Account,
  AdsPlacement,
  AdsType,
  LocationType,
  Board,
  sequelize,
} = require("../models");
const severPath = "http://localhost:5000/";
const checkInput = require("../util/checkInput");
const { createWardDistrictPageQueryString } = require("../util/queryString");
const bcrypt = require("bcrypt");

const controller = {};
const { Op } = require("sequelize");

const apiKey = "8c7c7c956fdd4a598e2301d88cb48135";

controller.accountManagement = async (req, res) => {
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

  const deleteMsg = {
    status: req.flash("deleteMsgStatus"),
    content: req.flash("deleteMsgContent"),
  };

  let page = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
  let district = req.query.district || "";
  let ward = req.query.ward || "";
  const options = {
    attributes: ["id", "firstName", "lastName", "email", "type"],
    where: {
      id: { [Op.ne]: req.session.accountId },
    },
    include: [
      {
        model: Area,
        attributes: ["id", "district", "ward"],
        where: {},
      },
    ],
  };
  let wards = [],
    currentDistrict = "",
    currentWard = "";
  if (district.trim() !== "") {
    options.include[0].where.district = district;
    options.where = {
      [Op.or]: [{ type: "Quan" }, { type: "Phuong" }],
    };
    wards = await Area.findAll({
      where: {
        district,
      },
    });
    currentDistrict = district;
    if (ward.trim() !== "") {
      options.include[0].where.ward = ward;
      options.where = {
        type: "Phuong",
      };
      currentWard = ward;
    }
  }

  const accountTypes = ["Phuong", "Quan", "So"];
  const [districts] = await sequelize.query(
    `SELECT DISTINCT district FROM Areas`
  );
  let accounts = await Account.findAll(options);

  const minPage = 1;
  const accountsPerPage = 5;
  const maxPage = Math.ceil((accounts.length * 1.0) / accountsPerPage);
  let pagination = {};
  if (page < minPage || page > maxPage) {
    if (deleteMsg.status.length > 0) {
      page = maxPage <= 0 ? 1 : maxPage;
      return res.redirect(
        "/department" +
          createWardDistrictPageQueryString(req.url, "page=", page)
      );
    } else {
      if (page !== 1) {
        return res.send("<h1>Page not found</h1>");
      }
      pagination = {
        minPage: 1,
        currentPage: page,
        maxPage: 1,
        limitPage: 2,
        accounts: [],
      };
    }
  } else {
    pagination = {
      minPage,
      currentPage: page,
      maxPage,
      limitPage: 2,
      accounts: accounts.slice(
        (page - 1) * accountsPerPage,
        page * accountsPerPage
      ),
    };
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
    currentWard,
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
    let areaId = 1;
    if (accountTypeSelectCreateModal !== "So") {
      const options = {
        where: {
          district: districtSelectCreateModal,
        },
      };
      if (accountTypeSelectCreateModal === "Phuong") {
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
    let areaId = 1;
    if (accountTypeSelectEditModal !== "So") {
      const options = {
        where: {
          district: districtSelectEditModal,
        },
      };
      if (accountTypeSelectEditModal === "Phuong") {
        options.where.ward = wardSelectEditModal;
      }
      areaId = (await Area.findOne(options)).id;
    }
    await Account.update(
      { type: accountTypeSelectEditModal, AreaId: areaId },
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
  const { accountId } = req.body;
  try {
    await Account.destroy({ where: { id: accountId } });
    req.flash("deleteMsgStatus", "success");
    req.flash("deleteMsgContent", "Xóa tài khoản thành công");
    return res.send("Account deleted!");
  } catch (err) {
    console.error(err);
    req.flash("deleteMsgStatus", "danger");
    req.flash("deleteMsgContent", "Xóa tài khoản thất bại");
    return res.send("Can not delete account!");
  }
};

controller.viewAdsRequest = async (req, res) => {
  let page = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
  let district = req.query.district || "";
  let ward = req.query.ward || "";

  let wards = [],
    currentDistrict = "",
    currentWard = "";
  let whereCondition = "";
  if (district.trim() !== "") {
    wards = await Area.findAll({
      where: {
        district,
      },
    });
    whereCondition += `WHERE A.district="${district}" `;
    currentDistrict = district;
    if (ward.trim() !== "") {
      currentWard = ward;
      whereCondition += ` AND A.ward="${ward}"`;
    }
  }

  const [districts] = await sequelize.query(
    `SELECT DISTINCT district FROM Areas`
  );
  let permitRequests = await sequelize.query(
    `
      SELECT BTs.type AS boardType, PRs.id, PRs.content, PRs.start, PRs.end, PRs.status, Cs.id AS companyId, Cs.name AS companyName, Cs.phone AS companyPhone, Cs.address AS companyAddress, Cs.email AS companyEmail, 
      A.id AS areaId, A.district AS district, A.ward AS ward, APs.address AS address
      FROM permitRequests PRs
      LEFT JOIN companies Cs ON PRs.companyId = Cs.id
      LEFT JOIN boards Bs ON PRs.boardId = Bs.id
      LEFT JOIN boardTypes BTs ON Bs.boardTypeId = BTs.id
      LEFT JOIN adsPlacements APs ON Bs.adsPlacementId = APs.id
      LEFT JOIN areas A ON APs.areaId = A.id
  ` + whereCondition,
    { type: sequelize.QueryTypes.SELECT }
  );

  const minPage = 1;
  const requestsPerPage = 1;
  const maxPage = Math.ceil((permitRequests.length * 1.0) / requestsPerPage);
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
    };
  } else {
    pagination = {
      minPage,
      currentPage: page,
      maxPage,
      limitPage: 2,
      permitRequests: permitRequests.slice(
        (page - 1) * requestsPerPage,
        page * requestsPerPage
      ),
    };
  }

  const currentUrl = req.url.slice(1);
  console.log(pagination);

  return res.render("So/viewAdsRequest.ejs", {
    formatDate: (date) => {
      return date.toLocaleDateString({
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    pagination,
    currentUrl,
    districts,
    wards,
    currentDistrict,
    currentWard,
  });
};

controller.adplaceManagement = async (req, res) => {
  const createErr = {
    error: {
      address: req.flash("addressCreateModalError"),
      numBoard: req.flash("numBoardCreateModalError"),
    },
    value: {
      address: req.flash("addressCreateModal")[0],
      numBoard: req.flash("numBoardCreateModal")[0],
      // ... add other value fields for AdsPlacement ...
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

  const deleteMsg = {
    status: req.flash("deleteMsgStatus"),
    content: req.flash("deleteMsgContent"),
  };

  const optionsAdsPlacement = {
    attributes: [
      "id",
      "address",
      "status",
      "long",
      "lat",
      "createdAt",
      "updatedAt",
      "AreaId",
      "LocationTypeId",
      "AdsTypeId",
    ],
    include: [
      {
        model: Area,
        attributes: ["id", "district", "ward"],
        where: {},
      },
      {
        model: LocationType,
        attributes: ["id", "locationType"],
      },
      {
        model: AdsType,
        attributes: ["id", "type"],
      },
      {
        model: Board,
        attributes: ["id", "size", "quantity"],
      },
      // ... other associations ...
    ],
  };

  let district = req.query.district || "";
  let ward = req.query.ward || "";
  let search = req.query.search || "";
  console.log(search);
  let wards = [],
    currentDistrict = "",
    currentWard = "";

  if (search.trim !== "") {
    optionsAdsPlacement.where = {
      [Op.or]: [
        {
          address: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          [Op.and]: [
            {
              [Op.or]: [
                {
                  "$Area.district$": {
                    [Op.like]: `%${search}%`,
                  },
                },
                {
                  "$Area.ward$": {
                    [Op.like]: `%${search}%`,
                  },
                },
              ],
            },
            {
              address: {
                [Op.notLike]: `%${search}%`,
              },
            },
          ],
        },
      ],
    };
  }

  if (district.trim() !== "") {
    optionsAdsPlacement.include[0].where.district = district;
    wards = await Area.findAll({
      where: {
        district,
      },
    });
    currentDistrict = district;

    if (ward.trim() !== "") {
      optionsAdsPlacement.include[0].where.ward = ward;
      currentWard = ward;
    }
  }

  const [districts] = await sequelize.query(
    `SELECT DISTINCT district FROM Areas ORDER BY district`
  );
  const adsPlacements = await AdsPlacement.findAll(optionsAdsPlacement);
  const adsTypes = await AdsType.findAll();
  const locationsType = await LocationType.findAll();
  const currentUrl = req.url.slice(1);
  res.render("So/adplaceManagement.ejs", {
    adsPlacements,
    districts,
    wards,
    currentUrl,
    currentDistrict,
    currentWard,
    createErr,
    createMsg,
    adsTypes,
    locationsType,
    editMsg,
    deleteMsg,
  });
};

controller.createAdplace = async (req, res) => {
  const {
    districtSelectCreateModal,
    wardSelectCreateModal,
    addressCreateModal,
    numBoardCreateModal,
    locationTypeSelectCreateModal,
    adTypeSelectCreateModal,
  } = req.body;

  let createFailed = false;

  if (
    !checkInput.isNumber(numBoardCreateModal) ||
    checkInput.isEmpty(numBoardCreateModal)
  ) {
    req.flash("numBoardCreateModalError", "Số lượng biển không hợp lệ.");
    createFailed = true;
  }
  if (checkInput.isEmpty(addressCreateModal)) {
    req.flash("addressCreateModalError", "Địa điểm không hợp lệ.");
    createFailed = true;
  }

  let address = await checkInput.getLatLongFromAddress(
    addressCreateModal,
    apiKey
  );

  if (!address) {
    req.flash("addressCreateModalError", "Địa điểm không hợp lệ.");
    createFailed = true;
  }
  if (await checkInput.isDuplicateAddress(addressCreateModal)) {
    console.log("Địa chỉ đặt đã đc táoj.");
    req.flash("addressCreateModalError", "Địa điểm đặt được tạo.");
    createFailed = true;
  }

  if (createFailed) {
    req.flash("numBoardCreateModal", numBoardCreateModal);
    req.flash("addressCreateModal", addressCreateModal);

    req.flash("createMsgStatus", "danger");
    req.flash("createMsgContent", "Đăng ký thất bại");
    return res.redirect("/department/adplaceManagement");
  }

  let areaId = await checkInput.findAreaIdByWardAndDistrict(
    wardSelectCreateModal,
    districtSelectCreateModal
  );

  let locationTypeId = await checkInput.findLocationTypeIdByLocationType(
    locationTypeSelectCreateModal
  );
  let adTypeId = await checkInput.findAdsTypeIdByAdsType(
    adTypeSelectCreateModal
  );

  console.log(areaId, locationTypeId, adTypeId, address);
  try {
    console.log("Bắt đầu khởi tạo AdsPlacement");
    const newAdsPlacement = await AdsPlacement.create({
      address: addressCreateModal,
      status: "Trạng thái mới",
      long: address.lon,
      lat: address.lat,
    });
    await newAdsPlacement.save();
    console.log("Kết thúc khởi tạo AdsPlacement");
    req.flash("createMsgStatus", "success");
    req.flash("createMsgContent", "Đăng ký thành công");
    return res.redirect("/department/adplaceManagement");
  } catch (err) {}
};

controller.acceptOrDenyAdsRequest = (req, res) => {
  return res.send("Hello world");
};

controller.getAreas = async (req, res) => {
  let district = req.query.district || "";

  const amount = await Area.count({
    where: district == "" ? {} : { district: district },
  });

  let page = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
  const perPage = 5;

  let areas = await Area.findAll({
    where: district == "" ? {} : { district: district },
    limit: perPage,
    offset: (page - 1) * perPage,
  });
  const [districts] = await sequelize.query(
    `SELECT DISTINCT district FROM Areas`
  );
  const message = req.flash("manageAreaMsg");

  res.render("So/areaManagement.ejs", {
    areas: areas,
    total: amount,
    hasNextPage: perPage * page < amount,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    currentPage: page,
    previousPage: page - 1,
    lastPage: Math.ceil((amount * 1.0) / perPage),
    districts,
    currentDistrict: district,
    serverPath: severPath,
    message: message.length == 0 ? null : message[0],
  });
};

controller.postEditArea = async (req, res) => {
  try {
    const { id, district, ward, path } = req.body;

    if (!id || !district || !ward) {
      req.flash("manageAreaMsg", "Các trường nhập bị sai hoặc thiếu");
      return res.redirect(path);
    }

    const updatedArea = await Area.update(
      { ward: ward, district: district },
      {
        where: { id: id },
      }
    );
    if (updatedArea[0] === 0) {
      req.flash("manageAreaMsg", "Không có trong cơ sở dữ liệu");
      return res.redirect(path);
    }
    req.flash("manageAreaMsg", "Thay đổi thành công");
    res.redirect(path);
  } catch (error) {
    req.flash("manageAreaMsg", "Internal server error.");
    return res.redirect(path);
  }
};

controller.postAddArea = async (req, res) => {
  try {
    const { district, ward } = req.body;
    if (!district || !ward) {
      req.flash("manageAreaMsg", "Các trường nhập bị sai hoặc thiếu");
      return res.redirect("/department/areaManagement");
    }

    const existingArea = await Area.findOne({
      where: { district: district, ward: ward },
    });
    if (existingArea) {
      req.flash("manageAreaMsg", "Đã tồn tại khu vực");
      return res.redirect("/department/areaManagement");
    }

    const newArea = await Area.create({ district: district, ward: ward });
    await newArea.save();

    req.flash("manageAreaMsg", "Tạo thành công");
    return res.redirect("/department/areaManagement");
  } catch (error) {
    req.flash("manageAreaMsg", "Internal server error.");
    return res.redirect("/department/areaManagement");
  }
};
module.exports = controller;
