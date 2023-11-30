const {Area, Account, sequelize} = require("../models");
const checkInput = require("../util/checkInput");
const bcrypt = require("bcrypt");
const controller = {};

controller.accountManagement = async (req, res) => {
    let page = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
    const options = {
        attributes: ["id", "firstName", "lastName", "email", "type", "district", "ward"],
    }

    const accountTypes = ["Phuong", "Quan", "So"]
    const [districts] = await sequelize.query(`SELECT DISTINCT district FROM Areas`);
    let accounts = await Account.findAll(options);

    const sizePage = 1;
    const minPage = 1;
    const accountsPerPage = 1;
    const maxPage = Math.ceil(accounts.length * 1.0 / accountsPerPage);
    let pagination = {};
    if (page < minPage || page > maxPage) {
        res.send("<h1>Page not found!!!</h1>")
    } else {
        pagination = {
            minPage,
            currentPage: page,
            maxPage,
            sizePage,
            accounts: accounts.slice((page - 1) * sizePage, page * sizePage)
        }
    }

    const err = {
        firstNameCreateModal: req.flash("firstNameCreateModal"),
        lastNameCreateModal: req.flash("lastNameCreateModal"),
        usernameCreateModal: req.flash("usernameCreateModal"),
        emailCreateModal: req.flash("emailCreateModal"),
        passwordCreateModal: req.flash("passwordCreateModal"),
        confirmPasswordCreateModal: req.flash("confirmPasswordCreateModal"),
    }

    console.log(err);

    const createMsg = {
        status: req.flash("createMsgStatus"), 
        content: req.flash("createMsgContent")
    }
    console.log(createMsg);
     
    return res.render("So/accountManagement.ejs", {
        accountTypes,
        districts, 
        pagination,
        err,
        createMsg
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
        req.flash("firstNameCreateModal", "Tên cán bộ không thể để trống!");
        loginFailed = true;
    } 
    //Last name
    if (checkInput.isEmpty(lastNameCreateModal)) {
        req.flash("lastNameCreateModal", "Tên đệm và họ của cán bộ chưa được nhập!");
        loginFailed = true;
    } 
    //Username 
    if (checkInput.isEmpty(usernameCreateModal)) {
        loginFailed = true;
        req.flash("usernameCreateModal", "Tên đăng nhập không thể để trống!");
    } else if (await checkInput.usernameExists(usernameCreateModal)) {
        loginFailed = true;
        req.flash("usernameCreateModal", "Tên đăng nhập đã tồn tại!");
    }
    //Email
    if (checkInput.isEmpty(emailCreateModal)) {
        loginFailed = true;
        req.flash("emailCreateModal", "Email chưa được nhập!");
    } else if (!checkInput.isEmail(emailCreateModal)) {
        loginFailed = true;
        req.flash("emailCreateModal", "Email không hợp lệ!");
    } else if (await checkInput.emailExists(emailCreateModal)) {
        loginFailed = true;
        req.flash("emailCreateModal", "Email này đã được sử dụng!");
    }
    //Password
    if (checkInput.isEmpty(passwordCreateModal)) {
        loginFailed = true;
        req.flash("passwordCreateModal", "Mật khẩu không thể bỏ trống!");
    } else if (checkInput.isValidPassword(passwordCreateModal)) {
        loginFailed = true;
        req.flash("passwordCreateModal", "Mật khẩu này quá yếu!");
    }
    //Confirm password 
    if (checkInput.isEmpty(confirmPasswordCreateModal)) {
        loginFailed = true;
        req.flash("confirmPasswordCreateModal", "Mật khẩu xác nhận chưa được nhập!");
    } else if (checkInput.isValidConfirmPassword(confirmPasswordCreateModal)) {
        loginFailed = true;
        req.flash("confirmPasswordCreateModal", "Mật khẩu xác nhận không trùng với mật khẩu!");
    }

    if (loginFailed) {
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
            ward: wardSelectCreateModal
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

module.exports = controller;