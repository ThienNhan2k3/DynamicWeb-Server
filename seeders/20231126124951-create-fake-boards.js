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
    await queryInterface.sequelize.query('SELECT * FROM boardtypes');
    await queryInterface.sequelize.query('SELECT * FROM adsplacements');

    await queryInterface.bulkInsert(
      "boards",
      [
        {
          id: 1,
          size: "12m x 25m",
          quantity: "1 trụ/bảng",
          AdsPlacementId: 4,
          BoardTypeId: 1,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 2,
          size: "20m x 25m",
          quantity: "5 trụ/bảng",
          AdsPlacementId: 4,
          BoardTypeId: 1,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 3,
          size: "20m x 25m",
          quantity: "5 trụ/bảng",
          AdsPlacementId: 1,
          BoardTypeId: 1,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 4,
          size: "35m x 25m",
          quantity: "5 trụ/bảng",
          AdsPlacementId: 2,
          BoardTypeId: 1,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 5,
          size: "20m x 20m",
          quantity: "4 trụ/bảng",
          AdsPlacementId: 2,
          BoardTypeId: 1,
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
    await queryInterface.bulkDelete("boards", null, {});
  },
};
