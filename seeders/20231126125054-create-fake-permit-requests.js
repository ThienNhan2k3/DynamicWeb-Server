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
    await queryInterface.sequelize.query('SELECT * FROM companies')
    await queryInterface.sequelize.query('SELECT * FROM boards');
    await queryInterface.sequelize.query('SELECT * FROM reporttypes');
    await queryInterface.sequelize.query('SELECT * FROM accounts');

    await queryInterface.bulkInsert(
      "permitRequests",
      [
        {
          id: 1,
          content: "Quảng cáo sản phẩm nông nghiệp",
          image:
            "https://cdn.brvn.vn/editor/2020/04/quangcaopanobillboardngoaitroi30_1585971255.jpg",
          start: "2023-11-11 00:00:00",
          end: "2023-11-11 00:00:00",
          status: "Bị báo cáo",
          CompanyId: 1,
          BoardId: 5,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 2,
          content: "Quảng cáo nước giải khát",
          image:
            "https://cdn.brvn.vn/editor/2020/04/quangcaopanobillboardngoaitroi30_1585971255.jpg",
          start: "2023-11-11 00:00:00",
          end: "2023-11-11 00:00:00",
          status: "Chưa cấp phép",
          CompanyId: 1,
          BoardId: 4,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 3,
          content: "Quảng cáo máy tính",
          image:
            "https://cdn.brvn.vn/editor/2020/04/quangcaopanobillboardngoaitroi30_1585971255.jpg",
          start: "2023-11-11 00:00:00",
          end: "2023-11-11 00:00:00",
          status: "Chưa cấp phép",
          CompanyId: 1,
          BoardId: 3,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 4,
          content: "Quảng cáo máy tính",
          image:
            "https://cdn.brvn.vn/editor/2020/04/quangcaopanobillboardngoaitroi30_1585971255.jpg",
          start: "2023-11-11 00:00:00",
          end: "2023-11-11 00:00:00",
          status: "Chưa cấp phép",
          CompanyId: 1,
          BoardId: 3,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 5,
          content: "Quảng cáo sản phẩm công nghiệp",
          image:
            "https://cdn.brvn.vn/editor/2020/04/quangcaopanobillboardngoaitroi30_1585971255.jpg",
          start: "2023-11-11 00:00:00",
          end: "2023-11-11 00:00:00",
          status: "Chưa cấp phép",
          CompanyId: 1,
          BoardId: 2,
          AccountId: 2,
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
    await queryInterface.bulkDelete("permitRequests", null, {});
  },
};
