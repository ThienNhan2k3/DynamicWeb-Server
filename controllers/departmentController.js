const {
  Area,
  Account,
  AdsPlacement,
  AdsType,
  LocationType,
  PermitRequest,
  Company,
  BoardType,
  Board,
  Report,
  ReportType,
  sequelize,
} = require("../models");
const severPath = "http://localhost:5000/";
const checkInput = require("../util/checkInput");
const { createWardDistrictPageQueryString } = require("../util/queryString");
const bcrypt = require("bcrypt");

const controller = {};
const { Op } = require("sequelize");

const apiKey = "8c7c7c956fdd4a598e2301d88cb48135";

/*
    + req: request
    + res: response
    + rows: Tổng dữ liệu cần phải phân trang
    + rowsPerPage: Số dòng trên một trang.
    + limitPagination: Số trang tối đa có thể di chuyển về trước hoặc về sau ở trang hiện tại.
    Vd trang hiện tại là 3 thì số trang hiển thị là 1, 2, 3, 4, 5
    
    +currentPage: Trang hiện tại giúp kiểm tra việc request có hợp lệ không
    + flag: Nếu trước đó đã thao tác xóa thì truyền vào cho flag = true
*/
async function getPagination(
  req,
  res,
  rows,
  rowsPerPage,
  currentPage,
  limitPagination = 2,
  flag = false
) {
  const minPage = 1;
  const maxPage = Math.ceil((rows.length * 1.0) / rowsPerPage);
  let pagination = {};
  if (currentPage < minPage || currentPage > maxPage) {
    if (flag) {
      currentPage = maxPage <= 0 ? 1 : maxPage;
      return res.redirect(
        "/department" +
          createWardDistrictPageQueryString(req.url, "page=", currentPage)
      );
    } else {
      pagination = {
        minPage: 1,
        currentPage: currentPage,
        maxPage: 1,
        limitPage: limitPagination,
        rows: [],
      };
    }
  } else {
    pagination = {
      minPage,
      currentPage: currentPage,
      maxPage,
      limitPage: limitPagination,
      rows: rows.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      ),
    };
  }
  return pagination;
}

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
  let message = req.flash("message")[0];
  message = message == null ? null : JSON.parse(message);
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
  let flag = false;
  if (message != null && message.type === "delete") {
    flag = true;
  }
  const pagination = await getPagination(req, res, accounts, 5, page, 2, flag);
  const currentUrl = req.url.slice(1);

  return res.render("So/accountManagement.ejs", {
    accountTypes,
    districts,
    wards,
    pagination,
    createErr,
    message,
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
    req.flash(
      "message",
      JSON.stringify({
        type: "create",
        status: "danger",
        content: "Đăng ký thất bại",
      })
    );
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
      const newAccount = await Account.create({
        firstName: firstNameCreateModal,
        lastName: lastNameCreateModal,
        username: usernameCreateModal,
        email: emailCreateModal,
        password: hashPassword,
        type: accountTypeSelectCreateModal,
        AreaId: areaId,
      });
      req.flash(
        "message",
        JSON.stringify({
          type: "create",
          status: "success",
          content: "Đăng ký thành công",
        })
      );
    }
  } catch (err) {
    console.log(err);
    req.flash(
      "message",
      JSON.stringify({
        type: "create",
        status: "danger",
        content: "Đăng ký thất bại",
      })
    );
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
    req.flash(
      "message",
      JSON.stringify({
        type: "edit",
        status: "success",
        content: "Phân công khu vực thành công",
      })
    );
    return res.send("Account updated!");
  } catch (err) {
    console.error(err);
    req.flash(
      "message",
      JSON.stringify({
        type: "edit",
        status: "danger",
        content: "Phân công khu vực thất bại",
      })
    );
    return res.send("Can not update account!");
  }
};

controller.deleteAccount = async (req, res) => {
  const { accountId } = req.body;
  try {
    await Account.destroy({ where: { id: accountId } });
    req.flash(
      "message",
      JSON.stringify({
        type: "delete",
        status: "success",
        content: "Xóa tài khoản thành công",
      })
    );
    return res.send("Account deleted!");
  } catch (err) {
    console.error(err);
    req.flash(
      "message",
      JSON.stringify({
        type: "delete",
        status: "danger",
        content: "Xóa tài khoản thất bại",
      })
    );
    return res.send("Can not delete account!");
  }
};

controller.viewAdsRequests = async (req, res) => {
  let page = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
  let district = req.query.district || "";
  let ward = req.query.ward || "";

  let whereCondition = {};
  let wards = [],
    currentDistrict = "",
    currentWard = "";
  if (district.trim() !== "") {
    wards = await Area.findAll({
      where: {
        district,
      },
    });
    whereCondition.district = district;
    currentDistrict = district;
    if (ward.trim() !== "") {
      currentWard = ward;
      whereCondition.ward = ward;
    }
  }

  const [districts] = await sequelize.query(
    `SELECT DISTINCT district FROM Areas`
  );
  let permitRequests = await PermitRequest.findAll({
    include: [
      Company,
      {
        model: Board,
        include: [
          BoardType,
          {
            model: AdsPlacement,
            include: [
              {
                model: Area,
                where: whereCondition,
                required: true,
              },
            ],
            required: true,
          },
        ],
        required: true,
      },
      {
        model: Account,
        attributes: ["firstName", "lastName", "type", "email"],
      },
    ],
  });
  const permitRequestsPerPage = 1;
  let pagination = await getPagination(
    req,
    res,
    permitRequests,
    permitRequestsPerPage,
    page
  );
  const currentUrl = req.url.slice(1);

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

controller.acceptOrDenyAdsRequest = async (req, res) => {
  const id = isNaN(req.params.id) ? -1 : parseInt(req.params.id);
  let permitRequest = await PermitRequest.findOne({
    include: [
      Company,
      {
        model: Board,
        include: [
          BoardType,
          {
            model: AdsPlacement,
            include: [Area],
          },
        ],
      },
      {
        model: Account,
        attributes: ["firstName", "lastName", "type", "email"],
      },
    ],
    where: {
      id,
    },
  });
  return res.render("So/acceptOrDenyAdsRequest.ejs", { permitRequest });
};

controller.viewReports = async (req, res) => {
  let page = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
  let district = req.query.district || "";
  let ward = req.query.ward || "";

  let wards = [],
    currentDistrict = "",
    currentWard = "";
  let whereCondition = {};
  if (district.trim() !== "") {
    wards = await Area.findAll({
      where: {
        district,
      },
    });
    whereCondition.district = district;
    currentDistrict = district;
    if (ward.trim() !== "") {
      currentWard = ward;
      whereCondition.ward = ward;
    }
  }

  const [districts] = await sequelize.query(
    `SELECT DISTINCT district FROM Areas`
  );
  let reports = await Report.findAll({
    include: [
      ReportType,
      {
        model: AdsPlacement,
        include: [
          {
            model: Area,
            where: whereCondition,
            required: true,
          },
        ],
        required: true,
      },
    ],
    required: true,
  });
  const pagination = await getPagination(req, res, reports, 1, page);
  // console.log(pagination.rows);
  const currentUrl = req.url.slice(1);
  return res.render("So/viewReports.ejs", {
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

controller.detailReport = async (req, res) => {
  const id = isNaN(req.params.id) ? -1 : parseInt(req.params.id);
  let report = await Report.findOne({
    include: [
      ReportType,
      {
        model: AdsPlacement,
        include: [Area],
      },
      {
        model: Account,
        attributes: ["firstName", "lastName", "type", "email"],
      },
    ],
    where: {
      id,
    },
  });
  console.log(report);
  return res.render("So/detailReport.ejs", {
    report,
  });
};

controller.statisticReport = async (req, res) => {
  let { type, size } = req.body;
  try {
    let reports = await Report.findAll({
      where: {
        createdAt: {
          [Op.lt]: new Date(),
          [Op.gt]: new Date(
            new Date() -
              size * (type === "month" ? 31 : 1) * 24 * 60 * 60 * 1000
          ),
        },
        method: {
          [Op.not]: null,
        },
        status: "Chưa xử lý",
      },
    });

    let labels = [],
      numberOfReportsList = [],
      waiting = 0,
      processed = 0;
    if (type === "day") {
      for (let i = size - 1; i >= 0; i--) {
        let date = new Date(new Date() - i * 24 * 60 * 60 * 1000);
        labels.push(
          `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        );
        numberOfReportsList.push(0);
      }
    } else if (type === "month") {
      let currentMonth = new Date().getMonth();
      let currentYear = new Date().getFullYear();
      while (size > 0) {
        labels.unshift(`${currentMonth + 1}/${currentYear}`);
        numberOfReportsList.unshift(0);
        currentMonth -= 1;
        if (currentMonth < 0) {
          currentMonth = 11;
          currentYear -= 1;
        }
        size -= 1;
      }
    }

    for (let i = 0; i < reports.length; i++) {
      let date = new Date(reports[i].createdAt);
      let dateStr =
        (type === "day" ? `${date.getDate()}/` : "") +
        `${date.getMonth() + 1}/${date.getFullYear()}`;
      let index = labels.indexOf(dateStr);
      if (index > -1) {
        numberOfReportsList[index] += 1;
        if (reports[i].method == null) {
          waiting += 1;
        } else {
          processed += 1;
        }
      }
    }
    return res.json({
      status: "success",
      labels,
      numberOfReportsList,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      status: "fail",
    });
  }
};

controller.getWaitingAndProcessedReport = async (req, res) => {
  try {
    let reports = await Report.findAll();
    let waitingReports = reports.filter((report) => report.method == null);

    return res.json({
      status: "success",
      waiting: waitingReports.length,
      processed: reports.length - waitingReports.length,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      status: "fail",
      waiting: 0,
      processed: 0,
    });
  }
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

  let message = req.flash("message")[0];
  message = message == null ? null : JSON.parse(message);

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
  let page = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
  let flag = false;

  if (message !== null && message.type === "delete") {
    flag = true;
  }
  const adsPlacements = await AdsPlacement.findAll(optionsAdsPlacement);
  const adsTypes = await AdsType.findAll();
  const locationsType = await LocationType.findAll();
  const currentUrl = req.url.slice(1);
  const pagination = await getPagination(
    req,
    res,
    adsPlacements,
    5,
    page,
    2,
    flag
  );

  const status = ["Đã quy hoạch", "Chưa quy hoạch"];

  res.render("So/adplaceManagement.ejs", {
    pagination,
    adsPlacements,
    districts,
    wards,
    currentUrl,
    currentDistrict,
    currentWard,
    createErr,
    adsTypes,
    locationsType,
    editMsg,
    deleteMsg,
    message,
    status,
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
  let fullAddress = await checkInput.getFullAddressInfo(
    addressCreateModal,
    apiKey
  );
  const district = await checkInput.getDistrictFromAdress(fullAddress);
  if (district !== districtSelectCreateModal) {
    req.flash("addressCreateModalError", "Địa chỉ không hợp lệ.");
    createFailed = true;
  }
  if (checkInput.isEmpty(addressCreateModal)) {
    req.flash("addressCreateModalError", "Địa điểm không hợp lệ.");
    createFailed = true;
  }

  let address = await checkInput.getLatLongFromAddress(
    addressCreateModal +
      "," +
      wardSelectCreateModal +
      "," +
      districtSelectCreateModal,
    apiKey
  );

  if (!address) {
    req.flash("addressCreateModalError", "Địa điểm không hợp lệ.");
    createFailed = true;
  }
  if (await checkInput.isDuplicateAddress(addressCreateModal)) {
    req.flash("addressCreateModalError", "Địa điểm đặt được tạo.");
    createFailed = true;
  }

  if (createFailed) {
    req.flash("numBoardCreateModal", numBoardCreateModal);
    req.flash("addressCreateModal", addressCreateModal);

    req.flash(
      "message",
      JSON.stringify({
        type: "create",
        status: "danger",
        content: "Tạo điểm quảng cáo thất bại",
      })
    );
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
  console.log("Bắt đầu khởi tạo AdsPlacement");
  try {
    const newAdsPlacement = await AdsPlacement.create({
      address: addressCreateModal,
      status: "Chưa quy hoạch",
      long: address.lon,
      lat: address.lat,
      AreaId: areaId,
      LocationTypeId: locationTypeId,
      AdsTypeId: adTypeId,
    });
    await newAdsPlacement.save();
    console.log("Kết thúc khởi tạo AdsPlacement");
    req.flash("createMsgStatus", "success");
    req.flash("createMsgContent", "Đăng ký thành công");
    return res.redirect("/department/adplaceManagement");
  } catch (err) {}
};

controller.editAdplace = async (req, res) => {
  let editFailed = false;
  const {
    idEditModal,
    districtSelectEditModal,
    wardSelectEditModal,
    addressEditModal,
    locationTypeSelectEditModal,
    adTypeSelectEditModal,
    statusEditModal,
  } = req.body;
  console.log(
    idEditModal,
    districtSelectEditModal,
    wardSelectEditModal,
    addressEditModal,
    locationTypeSelectEditModal,
    adTypeSelectEditModal,
    statusEditModal
  );
  let locationTypeId = await checkInput.findLocationTypeIdByLocationType(
    locationTypeSelectEditModal
  );
  let fullAddress = await checkInput.getFullAddressInfo(
    addressEditModal,
    apiKey
  );
  const district = await checkInput.getDistrictFromAdress(fullAddress);
  if (district !== districtSelectEditModal) {
    req.flash("addressCreateModalError", "Địa chỉ không hợp lệ.");
    editFailed = true;
  }
  if (editFailed) {
    req.flash("addressCreateModal", addressEditModal);

    req.flash(
      "message",
      JSON.stringify({
        type: "create",
        status: "danger",
        content: "Chỉnh sửa điểm quảng cáo thất bại",
      })
    );
    return res.send("Update Fail");
  }
  let adTypeId = await checkInput.findAdsTypeIdByAdsType(adTypeSelectEditModal);
  try {
    await AdsPlacement.update(
      {
        district: districtSelectEditModal,
        ward: wardSelectEditModal,
        address: addressEditModal,
        LocationTypeId: locationTypeId,
        AdsTypeId: adTypeId,
        status: statusEditModal,
      },
      {
        where: {
          id: idEditModal,
        },
      }
    );
    req.flash(
      "message",
      JSON.stringify({
        type: "edit",
        status: "success",
        content: "Cập nhật điểm quảng cáo thành công",
      })
    );
    return res.send("AdsPlacement updated");
  } catch (err) {
    console.error(err);
    req.flash(
      "message",
      JSON.stringify({
        type: "edit",
        status: "danger",
        content: "Cập nhật thất bại",
      })
    );
    return res.send("Can not update AdsPlacement");
  }
};

controller.deleteAdplace = async (req, res) => {
  const { adsPlacementId } = req.body;
  console.log("da vao delete");
  try {
    await AdsPlacement.destroy({
      where: {
        id: adsPlacementId,
      },
    });
    req.flash(
      "message",
      JSON.stringify({
        type: "delete",
        status: "success",
        content: "Xóa thành công",
      })
    );
    return res.send("Adplacement deleted!");
  } catch (err) {
    console.error(err);
    req.flash(
      "message",
      JSON.stringify({
        type: "delete",
        status: "danger",
        content: "Xóa thất bại",
      })
    );
    return res.send("Can not delete adplacement!");
  }
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
    hasNextNextPage: perPage * (page + 1) < amount,
    hasPreviousPage: page > 1,
    hasPreviousPreviousPage: page - 1 > 1,
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

controller.boardManagement = async (req, res) => {
  let message = req.flash("message")[0];
  message = message == null ? null : JSON.parse(message);
  const createErr = {
    error: {
      address: req.flash("addressCreateModalError"),
      height: req.flash("heightCreateModalError"),
      weight: req.flash("weightCreateModalError"),
    },
    value: {
      address: req.flash("addressCreateModal")[0],
      height: req.flash("heightCreateModal")[0],
      weight: req.flash("weightCreateModal")[0],
    },
  };
  const optionsBoardManagement = {
    attributes: ["id", "size", "quantity", "boardTypeId", "adsPlacementId"],
    include: [
      {
        model: BoardType,
        attributes: ["id", "type"],
      },
      {
        model: AdsPlacement,
        attributes: ["id", "address", "areaId"],
        where: {},

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
        ],
      },
    ],
  };
  let search = req.query.search || "";
  if (search.trim() !== "") {
    optionsBoardManagement.where = {
      [Op.or]: [
        {
          '$AdsPlacement.Area.district$': {
            [Op.like]: `%${search}%`,
          },
        },
        {
          '$AdsPlacement.Area.ward$': {
            [Op.like]: `%${search}%`,
          },
        },
        {
          '$AdsPlacement.address$': {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    };
    
  }
  let district = req.query.district || "";
  console.log(district);
  let ward = req.query.ward || "";
  let wards = [],
    currentDistrict = "",
    currentWard = "";

  if (district.trim() !== "") {
    optionsBoardManagement.include[1].include[0].where.district = district;
    wards = await Area.findAll({
      where: {
        district,
      },
    });
    currentDistrict = district;

    if (ward.trim() !== "") {
      optionsBoardManagement.include[1].include[0].where.ward = ward;
      currentWard = ward;
    }
  }

  const [districts] = await sequelize.query(
    `SELECT DISTINCT district FROM Areas ORDER BY district`
  );

  let page = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
  let flag = false;

  if (message !== null && message.type === "delete") {
    flag = true;
  }

  const boards = await Board.findAll(optionsBoardManagement);

  const currentUrl = req.url.slice(1);
  const boardTypes = await BoardType.findAll();
  const pagination = await getPagination(req, res, boards, 5, page, 2, flag);

  res.render("So/boardManagement.ejs", {
    pagination,
    boards,
    districts,
    wards,
    currentUrl,
    currentDistrict,
    currentWard,
    message,
    createErr,
    boardTypes,
    search,
  });
};

controller.createBoard = async (req, res) => {
  console.log(req.body);
  const {
    districtSelectCreateModal,
    wardSelectCreateModal,
    boardTypeSelectCreateModal,
    heightCreateModal,
    weightCreateModal,
    addressCreateModal,
    quantityCreateModal,
  } = req.body;

  let createFailed = false;
  if (
    !checkInput.isNumber(heightCreateModal) ||
    checkInput.isEmpty(heightCreateModal)
  ) {
    req.flash("heightCreateModalError", "Chiều dài không hợp lệ");
    createFailed = true;
  }
  if (
    !checkInput.isNumber(weightCreateModal) ||
    checkInput.isEmpty(weightCreateModal)
  ) {
    req.flash("weightCreateModalError", "Chiều rộng không hợp lệ");
    createFailed = true;
  }
  if (
    !checkInput.isNumber(quantityCreateModal) ||
    checkInput.isEmpty(quantityCreateModal)
  ) {
    req.flash("quantityCreateModalError", "Số lượng trụ không hợp lệ");
    createFailed = true;
  }
  let boardTypeid = await checkInput.findBoardsTyoeIdByBoardType(
    boardTypeSelectCreateModal
  );

  let adPlacementId = await checkInput.findAdplacementByAddress(
    addressCreateModal,
    await checkInput.findAreaIdByWardAndDistrict(
      wardSelectCreateModal,
      districtSelectCreateModal
    )
  );
  if (boardTypeid == null || adPlacementId == null) {
    createFailed = true;
  }
  if (createFailed) {
    req.flash("addressCreateModal", addressCreateModal);

    req.flash(
      "message",
      JSON.stringify({
        type: "create",
        status: "danger",
        content: "Tạo bảng quảng cáo thất bại",
      })
    );
    return res.redirect("/department/boardManagement");
  }
  try {
    console.log(boardTypeid, adPlacementId);
    const newBoard = await Board.create({
      size: heightCreateModal + "m x " + weightCreateModal + "m",
      quantity: quantityCreateModal + " trụ/bảng",
      BoardTypeId: parseInt(boardTypeid),
      AdsPlacementId: adPlacementId,
    });
    await newBoard.save();
    req.flash(
      "message",
      JSON.stringify({
        type: "create",
        status: "success",
        content: "Tạo bảng quảng cáo thành công",
      })
    );
  } catch (error) {
    console.log(error);
    req.flash(
      "message",
      JSON.stringify({
        type: "create",
        status: "danger",
        content: "Tạo bảng quảng cáo thất bại",
      })
    );
  }
  return res.redirect("/department/boardManagement");
};

controller.editBoard = async (req, res) => {
  console.log(req.body);
  const {
    districtSelectEditModal,
    boardTypeSelectEditModal,
    wardSelectEditModal,
    heightEditModal,
    weightEditModal,
    quantityEditModal,
    addressEditModal,
    idEditModal,
  } = req.body;
  console.log(req.body);
  let updateFailed = false;
  if (
    !checkInput.isNumber(heightEditModal) ||
    checkInput.isEmpty(heightEditModal)
  ) {
    req.flash("heightEditModalError", "Chiều dài không hợp lệ");
    updateFailed = true;
  }
  if (
    !checkInput.isNumber(weightEditModal) ||
    checkInput.isEmpty(weightEditModal)
  ) {
    req.flash("weightEditModalError", "Chiều rộng không hợp lệ");
    updateFailed = true;
  }

  if (
    !checkInput.isNumber(quantityEditModal) ||
    checkInput.isEmpty(quantityEditModal)
  ) {
    req.flash("quantityEditModalError", "Số lần trụ không hợp lệ");
    updateFailed = true;
  }
  if (checkInput.isEmpty(addressEditModal)) {
    req.flash("addressEditModalError", "Địa điểm không hợp lệ.");
    updateFailed = true;
  }

  let address = await checkInput.getLatLongFromAddress(
    addressEditModal +
      "," +
      wardSelectEditModal +
      "," +
      districtSelectEditModal,
    apiKey
  );

  if (!address) {
    req.flash("addressEditModalError", "Địa điểm không hợp lệ.");
    updateFailed = true;
  }

  let fullAddress = await checkInput.getFullAddressInfo(
    addressEditModal,
    apiKey
  );
  const district = await checkInput.getDistrictFromAdress(fullAddress);

  console.log(district);
  console.log(districtSelectEditModal);

  if (district !== districtSelectEditModal) {
    req.flash("addressEditModalError", "Địa chỉ không hợp lệ.");
    updateFailed = true;
  }

  if (checkInput.isEmpty(addressEditModal)) {
    req.flash("addressEditModalError", "Địa điểm không hợp lệ.");
    updateFailed = true;
  }

  const adPlacementId = await checkInput.findAdplacementByAddress(
    addressEditModal,
    await checkInput.findAreaIdByWardAndDistrict(
      wardSelectEditModal,
      districtSelectEditModal
    )
  );
  console.log(updateFailed);
  let boardTypeId = await checkInput.findBoardsTyoeIdByBoardType(
    boardTypeSelectEditModal
  );
  if (updateFailed) {
    req.flash("addressEditModal", addressEditModal);
    req.flash(
      "message",
      JSON.stringify({
        type: "edit",
        status: "danger",
        content: "Cập nhật bảng quảng cáo thất bại",
      })
    );
    return res.send("Update Fail");
  }
  try {
    await Board.update(
      {
        size: heightEditModal + "m x " + weightEditModal + "m",
        quantity: quantityEditModal + " trụ/bảng",
        BoardTypeId: parseInt(boardTypeId),
        AdsPlacementId: adPlacementId,
      },
      {
        where: {
          id: idEditModal,
        },
      }
    );
    console.log("cập nhật tc");
    req.flash(
      "message",
      JSON.stringify({
        type: "edit",
        status: "success",
        content: "Cập nhật bảng quảng cáo thành công",
      })
    );
    return res.send("Board updated");
  } catch (err) {
    console.error(err);
    req.flash(
      "message",
      JSON.stringify({
        type: "edit",
        status: "danger",
        content: "Cập nhật bảng quảng không thành công",
      })
    );
    return res.send("Can not update board");
  }
};

controller.deleteBoard = async (req, res) => {
  const { boardId } = req.body;

  console.log(req.body);

  try {
    await Board.destroy({
      where: {
        id: boardId,
      },
    });
    req.flash(
      "message",
      JSON.stringify({
        type: "edit",
        status: "success",
        content: "Xóa thành công",
      })
    );
    return res.send("Board deleted!");
  } catch (err) {
    console.error(err);
    req.flash(
      "message",
      JSON.stringify({
        type: "edit",
        status: "danger",
        content: "Xóa thất bại",
      })
    );
    return res.send("Can not delete board!");
  }
};
module.exports = controller;
