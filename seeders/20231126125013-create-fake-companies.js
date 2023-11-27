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
      "companies",
      [
        {
          id: 1,
          name: "Công ty ma",
          phone: "0902839512",
          address: "115 Phạm Viết Thắng",
          email: "test@test.com",
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 2,
          name: "Công ty HITECT",
          phone: "0902839514",
          address: "20 Lê Lợi",
          email: "test2@test.com",
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        }
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
    await queryInterface.bulkDelete("companies", null, {});
  },
};
