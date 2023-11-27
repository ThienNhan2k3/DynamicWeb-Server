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
    await queryInterface.bulkInsert(
      "reportTypes",
      [
        {
          id: 1,
          type: "Tố giác sai phạm",
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 2,
          type: "Đăng ký nội dung",
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 3,
          type: "Đóng góp ý kiến",
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 4,
          type: "Giải đáp thắc mắc",
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
    await queryInterface.bulkDelete("reportTypes", null, {});
  },
};
