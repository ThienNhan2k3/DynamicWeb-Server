"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.sequelize.query('SELECT * FROM areas');
    await queryInterface.sequelize.query('SELECT * FROM locationtypes');
    await queryInterface.sequelize.query('SELECT * FROM adstypes');

    await queryInterface.bulkInsert(
      "adsPlacements",
      [
        {
          id: 1,
          address: "222 Nguyễn Văn Cừ",
          status: "Đã quy hoạch",
          long: 106.6851262,
          lat: 10.7564838,
          AreaId: 1,
          LocationTypeId: 1,
          AdsTypeId: 1,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 2,
          address: "210 Nguyễn Văn Cừ",
          status: "Chưa quy hoạch",
          long: 106.6851352,
          lat: 10.7564735,
          AreaId: 2,
          LocationTypeId: 1,
          AdsTypeId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 3,
          address: "203 Phạm Viết Thắng",
          status: "Đã quy hoạch",
          long: 106.706576,
          lat: 10.782429,
          AreaId: 3,
          LocationTypeId: 1,
          AdsTypeId: 1,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 4,
          address: "20 Phan Xích Long",
          status: "Đã quy hoạch",
          long: 106.707703,
          lat: 10.780663,
          AreaId: 3,
          LocationTypeId: 2,
          AdsTypeId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 5,
          address: "20 Phan Xích Long",
          status: "Đã quy hoạch",
          long: 106.706104,
          lat: 10.78197,
          AreaId: 1,
          LocationTypeId: 1,
          AdsTypeId: 1,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 6,
          address: "20 Hồ Chí Minh",
          status: "Chưa quy hoạch",
          long: 106.706142,
          lat: 10.782682,
          AreaId: 1,
          LocationTypeId: 1,
          AdsTypeId: 1,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("adsPlacements", null, {});
  },
};
