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
          long: 106.6818167,
          lat: 10.7651610,
          AreaId: 9,
          LocationTypeId: 1,
          AdsTypeId: 1,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 2,
          address: "210 Nguyễn Văn Cừ",
          status: "Chưa quy hoạch",
          long: 106.6840608,
          lat: 10.7598791,
          AreaId: 9,
          LocationTypeId: 1,
          AdsTypeId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 3,
          address: "227 Nguyễn Văn Cừ",
          status: "Đã quy hoạch",
          long: 106.6822505,
          lat: 10.7628963,
          AreaId: 186,
          LocationTypeId: 1,
          AdsTypeId: 1,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 4,
          address: "280 An Dương Vương",
          status: "Đã quy hoạch",
          long: 106.707703,
          lat: 10.780663,
          AreaId: 186,
          LocationTypeId: 2,
          AdsTypeId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 5,
          address: "99 Nguyễn Huệ",
          status: "Đã quy hoạch",
          long: 106.703849,
          lat: 10.77332,
          AreaId: 3,
          LocationTypeId: 1,
          AdsTypeId: 1,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 6,
          address: "102/1 cống quỳnh",
          status: "Chưa quy hoạch",
          long: 106.69095,
          lat: 10.765198,
          AreaId: 6,
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
