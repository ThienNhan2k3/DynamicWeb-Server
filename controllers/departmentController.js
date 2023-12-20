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
const checkInput = require("../util/checkInput");
const {createWardDistrictPageQueryString} = require("../util/queryString");
const bcrypt = require("bcrypt");

const controller = {};
const { Op } = require('sequelize');


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
async function getPagination(req, res, rows, rowsPerPage, currentPage, limitPagination=2, flag=false) {
    const minPage = 1;
    const maxPage = Math.ceil(rows.length * 1.0 / rowsPerPage);
    let pagination = {};
    if (currentPage < minPage || currentPage > maxPage) {
        if (flag) {
            currentPage = (maxPage <= 0) ? 1 : maxPage;
            return res.redirect("/department" + createWardDistrictPageQueryString(req.url, 'page=', currentPage));
        } else {
            pagination = {
                minPage: 1,
                currentPage: currentPage,
                maxPage: 1,
                limitPage: limitPagination,
                rows: [],
            }
        }
    } else {
        pagination = {
            minPage,
            currentPage: currentPage,
            maxPage,
            limitPage: limitPagination,
            rows: rows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage),
        }
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
      }
  }
    let message = req.flash("message")[0]
    message = message == null ? null : JSON.parse(message);
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
    let flag = false;
    if (message != null && message.type === 'delete') {
        flag = true;
    }
    const pagination = await getPagination(req, res, accounts, 5, page, 2, flag);
    console.log(pagination);
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
        currentWard
    });

  
}

controller.getWardsWithSpecificDistrict = async (req, res) => {
  const district = req.query.district || '';

  const options = {
      attributes: ['ward'],
  }
  if (district.trim() !== '') {
      options.where = {
          district
      }
  }
  const wards = await Area.findAll(options);

  return res.json(wards);

}


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
      wardSelectCreateModal
  } = req.body;

  let loginFailed = false;
  //First name
  if (checkInput.isEmpty(firstNameCreateModal)) {
      req.flash("firstNameCreateModalError", "Tên cán bộ không thể để trống!");
      loginFailed = true;
  } 
  //Last name
  if (checkInput.isEmpty(lastNameCreateModal)) {
      req.flash("lastNameCreateModalError", "Tên đệm và họ của cán bộ chưa được nhập!");
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
      req.flash("confirmPasswordCreateModalError", "Mật khẩu xác nhận chưa được nhập!");
  } else if (!checkInput.isValidConfirmPassword(passwordCreateModal, confirmPasswordCreateModal)) {
      loginFailed = true;
      req.flash("confirmPasswordCreateModalError", "Mật khẩu xác nhận không trùng với mật khẩu!");
  }

  if (loginFailed) {
      req.flash("firstNameCreateModal", firstNameCreateModal);
      req.flash("lastNameCreateModal", lastNameCreateModal);
      req.flash("usernameCreateModal", usernameCreateModal);
      req.flash("emailCreateModal", emailCreateModal);
      req.flash("passwordCreateModal", passwordCreateModal);
      req.flash("confirmPasswordCreateModal", confirmPasswordCreateModal);

      req.flash("message", JSON.stringify({
        type: "create",
        status: "danger",
        content: "Đăng ký thất bại"
      }))
      return res.redirect("/department/accountManagement");    
  }

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
      req.flash("message", JSON.stringify({
        type: "create",
        status: "success",
        content: "Đăng ký thành công"
      }))
  } catch(err) {
      console.log(err);
      req.flash("message", JSON.stringify({
        type: "create",
        status: "danger",
        content: "Đăng ký thất bại"
      }))
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
      req.flash("message", JSON.stringify({
        type: "edit",
        status: "success",
        content: "Phân công khu vực thành công"
      }))
      return res.send("Account updated!");
  } catch(err) {
      console.error(err);
      req.flash("message", JSON.stringify({
        type: "edit",
        status: "danger",
        content: "Phân công khu vực thất bại"
      }))
      return res.send("Can not update account!");
  }
}

controller.deleteAccount = async (req, res) => {
  const { accountId } = req.body;
  try {
      await Account.destroy(
          {where: {id: accountId}}
      )
      req.flash("message", JSON.stringify({
        type: "delete",
        status: "success",
        content: "Xóa tài khoản thành công"
      }))
      return res.send("Account deleted!");
  } catch(err) {
      console.error(err);
      req.flash("message", JSON.stringify({
        type: "delete",
        status: "danger",
        content: "Xóa tài khoản thất bại"
      }))
      return res.send("Can not delete account!");
  }
}

controller.viewAdsRequests = async (req, res) => {
  let page = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
  let district = req.query.district || '';
  let ward = req.query.ward || '';

  let whereCondition = {};
  let wards = [], currentDistrict = '', currentWard = ''; 
  if (district.trim() !== '') {
      wards = await Area.findAll({
          where: {
              district
          }
      })
      whereCondition.district = district;
      currentDistrict = district;
      if (ward.trim() !== '') {
          currentWard = ward;
          whereCondition.ward = ward;
      }
  }

  const [districts] = await sequelize.query(`SELECT DISTINCT district FROM Areas`);
  let permitRequests = await PermitRequest.findAll({
        include: [
            Company, {
                model: Board,
                include: [BoardType, {
                        model: AdsPlacement,
                        include: [{
                            model: Area,
                            where: whereCondition,
                            required: true
                        }],
                        required: true
                    },
                ],
                required: true
            }, {
                model: Account,
                attributes: ["firstName", "lastName", "type", "email"]
            }
        ],
    });
  const permitRequestsPerPage = 1;
  let pagination = await getPagination(req, res, permitRequests, permitRequestsPerPage, page);
  const currentUrl = req.url.slice(1);
  
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


controller.acceptOrDenyAdsRequest = async (req, res) => {
    const id = isNaN(req.params.id) ? -1 : parseInt(req.params.id);
    let permitRequest = await PermitRequest.findOne({
        include: [
            Company, {
                model: Board,
                include: [BoardType, {
                    model: AdsPlacement,
                    include: [Area]
                }]
            }, {
                model: Account,
                attributes: ["firstName", "lastName", "type", "email"]
            }
        ],
        where: {
            id
        }
    })
    return res.render("So/acceptOrDenyAdsRequest.ejs", {permitRequest});
}

controller.viewReports = async (req, res) => {
    let page = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
  let district = req.query.district || '';
  let ward = req.query.ward || '';

  let wards = [], currentDistrict = '', currentWard = ''; 
  let whereCondition = {};
  if (district.trim() !== '') {
    wards = await Area.findAll({
        where: {
            district
        }
    })
    whereCondition.district = district;
    currentDistrict = district;
    if (ward.trim() !== '') {
        currentWard = ward;
        whereCondition.ward = ward;
    }
}

    const [districts] = await sequelize.query(`SELECT DISTINCT district FROM Areas`);
    let reports = await Report.findAll({
        include: [ReportType, {
            model: AdsPlacement,
            include: [{
                model: Area,
                where: whereCondition,
                required: true
            }],
            required: true
        }],
        required: true
    });
    const pagination = await getPagination(req, res, reports, 1, page);
    // console.log(pagination.rows);
    const currentUrl = req.url.slice(1);
    return res.render("So/viewReports.ejs", {
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

controller.detailReport = async (req, res) => {
    const id = isNaN(req.params.id) ? -1 : parseInt(req.params.id);
    let report = await Report.findOne({
        include: [ReportType, {
            model: AdsPlacement,
            include: [Area],
        }, {
            model: Account,
            attributes: ["firstName", "lastName", "type", "email"]
        }],
        where: {
            id
        }
    });
    console.log(report);
    return res.render("So/detailReport.ejs", {
        report
    })
}

controller.statisticReport = async (req, res) => {
    let {type, size} = req.body;
    try {
        let reports = await Report.findAll({
            where: {
                createdAt: {
                    [Op.lt]: new Date(),
                    [Op.gt]: new Date(new Date() - (size * (type === 'month' ? 31 : 1)) * 24 * 60 * 60 * 1000)
                },
                method: {
                    [Op.not]: null
                }, 
                status: "Chưa xử lý"
            }
        });
        
        let labels = [], numberOfReportsList = [], waiting = 0, processed = 0;
        if (type === 'day') {
            for (let i = size - 1; i >= 0; i--) {
                let date = new Date(new Date() - i * 24 * 60 * 60 * 1000);
                labels.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
                numberOfReportsList.push(0);
            }
        } else if (type === 'month') {
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
            let dateStr = (type === 'day' ? `${date.getDate()}/` : '') + `${date.getMonth() + 1}/${date.getFullYear()}`;
            let index = labels.indexOf(dateStr);
            if (index > -1) {
                numberOfReportsList[index] += 1;
                if (reports[i].method == null) {
                    waiting += 1;
                }  else {
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
            status: "fail"
        })
    }
}

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
        })
    } 
}



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
