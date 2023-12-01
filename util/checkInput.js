const {Account} = require("../models"); 

function isEmpty(input) {
    if (input) {
        return input.trim().length === 0;
    }
    return true;
}

function isEmail(email) {
    const emailRegExp = new RegExp("^[a-zA-z0-9!@#$%^*()&_-~]+@[a-zA-z0-9!@#$%^*()&_-~]+\\.[a-z]{2,}$")
    if (email.match(emailRegExp) != null) {
        return true;
    }
    return false;
}

async function emailExists(email) {
    const account = await Account.findOne({
        where: {
            email
        }
    });
    if (account) {
        return true;
    }
    return false;
}

async function usernameExists(username) {
    const account = await Account.findOne({
        where: {
            username
        }
    });
    if (account) {
        return true;
    }
    return false;
}

function isValidPassword(password){
    let count = 0;
    if (password.match(/\w+/g) != null){
        count += 1;
    }
    if (password.length > 5) {
        if (password.match(/\d+/g) != null) {
            count += 1;
        }
        if (password.match(/[!,@,#,$,%,^,*,(,),&,_,-,~]/g) != null) {
            count += 1;
        }
    }
    if (count <= 1) {
        return false;
    }
    return true;
}

function isValidConfirmPassword(confirmPassword, password) {
    return confirmPassword === password;
}

module.exports = {
    isEmpty,
    isEmail,
    emailExists,
    usernameExists,
    isValidPassword,
    isValidConfirmPassword
}