const { Account } = require("../models");
const { AdsPlacement } = require("../models");
const { AdsType } = require("../models");
const { Area } = require("../models");
const { LocationType } = require("../models");
const { BoardType } = require("../models");
const { Op } = require("sequelize");

function isEmpty(input) {
  if (input) {
    return input.trim().length === 0;
  }
  return true;
}

function isEmail(email) {
  const emailRegExp = new RegExp(
    "^[a-zA-z0-9!@#$%^*()&_-~]+@[a-zA-z0-9!@#$%^*()&_-~]+\\.[a-z]{2,}$"
  );
  if (email.match(emailRegExp) != null) {
    return true;
  }
  return false;
}

async function emailExists(email) {
  const account = await Account.findOne({
    where: {
      email,
    },
  });
  if (account) {
    return true;
  }
  return false;
}

async function usernameExists(username) {
  const account = await Account.findOne({
    where: {
      username,
    },
  });
  if (account) {
    return true;
  }
  return false;
}

function isValidPassword(password) {
  let count = 0;
  if (password.match(/\w+/g) != null) {
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
function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

async function getLatLongFromAddress(address, apiKey) {
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    const { lat, lng: lon } = data.results[0].geometry;

    if (isNumber(lat) && isNumber(lon)) {
      return { lat, lon };
    }
  }

  return false;
}

async function getFullAddressInfo(address, apiKey) {
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    const fullAddress = data.results[0].formatted;

    if (fullAddress) {
      return fullAddress;
    }
  }

  return false;
}

async function getDistrictFromAdress(address) {
  const districtInfo = address.match(/(Quận|Huyện)\s(.*?),/);

  if (districtInfo && districtInfo[1] && districtInfo[2]) {
    const districtType = districtInfo[1].trim();
    const districtName = districtInfo[2].trim();
    console.log("Loại quận/huyện là:", districtType);
    console.log("Tên quận/huyện là:", districtName);
    return districtType + " " + districtName;
  } else {
    return null;
  }
}

async function isDuplicateAddress(address) {
  const existingAdplace = await AdsPlacement.findOne({
    where: {
      address: address,
    },
  });
  return existingAdplace !== null; // Trả về true nếu đã tồn tại, ngược lại là false
}

async function findAreaIdByWardAndDistrict(ward, district) {
  try {
    const result = await Area.findOne({
      where: {
        ward: ward,
        district: district,
      },
      attributes: ["id"],
    });

    return result ? result.id : null;
  } catch (error) {
    console.error("Error finding Area ID by Ward and District:", error);
    throw error;
  }
}

async function findLocationTypeIdByLocationType(locationType) {
  try {
    const result = await LocationType.findOne({
      where: {
        locationType: locationType,
      },
      attributes: ["id"],
    });
    return result ? result.id : null;
  } catch (error) {
    console.error("Error finding Location Type ID by Location Type:", error);
    throw error;
  }
}

async function findAdsTypeIdByAdsType(adType) {
  const result = await AdsType.findOne({
    where: {
      type: adType,
    },
    attributes: ["id"],
  });
  return result ? result.id : null;
}

async function findBoardsTyoeIdByBoardType(boardType) {
  const result = await BoardType.findOne({
    where: {
      type: boardType,
    },
    attributes: ["id"],
  });
  return result ? result.id : null;
}

async function findAdplacementByAddress(address, areaId) {
  const result = await AdsPlacement.findOne({
    where: {
      address: address,
      areaId: areaId,
    },
    attributes: ["id"],
  });
  return result ? result.id : null;
}

module.exports = {
  isEmpty,
  isEmail,
  emailExists,
  usernameExists,
  isValidPassword,
  isValidConfirmPassword,
  isNumber,
  getLatLongFromAddress,
  isDuplicateAddress,
  findAreaIdByWardAndDistrict,
  findLocationTypeIdByLocationType,
  findAdsTypeIdByAdsType,
  findBoardsTyoeIdByBoardType,
  findAdplacementByAddress,
  getFullAddressInfo,
  getDistrictFromAdress,
};
