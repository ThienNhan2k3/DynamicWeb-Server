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
    await queryInterface.sequelize.query('SELECT * FROM boards');
    await queryInterface.sequelize.query('SELECT * FROM adsplacements');
    await queryInterface.sequelize.query('SELECT * FROM reporttypes');
    await queryInterface.sequelize.query('SELECT * FROM accounts');
    await queryInterface.sequelize.query('SELECT * FROM reporttypes');

    await queryInterface.bulkInsert(
      "reports",
      [
        {
          id: 1,
          submission_time: "2023-11-22 02:33:58",
          name: "Nguyễn Khánh Hoàng",
          email: "test@test.com",
          phone: "090293021",
          reportContent: "<p>Cái báo cáo xấu quá</p>",
          image:
            "https://banghieuminhkhang.com/upload/sanpham/bang-hieu/bien-quang-cao-dung-12.jpg",
          BoardId: null,
          ReportTypeId: 1,
          AdsPlacementId: 2,
          status: "Chưa xử lý",
          method: null,
          AccountId: null,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 2,
          submission_time: "2023-11-22 02:33:58",
          name: "Nguyễn Trọng Đại",
          email: "test@test.com",
          phone: "090293021",
          reportContent: "<p>Cái báo cáo xấu điên</p>",
          image:
            "https://banghieuminhkhang.com/upload/sanpham/bang-hieu/bien-quang-cao-dung-12.jpg",
          BoardId: null,
          ReportTypeId: 1,
          AdsPlacementId: 3,
          status: "Chưa xử lý",
          method: null,
          AccountId: null,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 3,
          submission_time: "2023-11-22 02:33:58",
          name: "Nguyễn Thiện Nhân",
          email: "test@test.com",
          phone: "090293021",
          reportContent: "<p>Vi phạm thuần phong mỹ tục rồi</p>",
          image:
            "https://banghieuminhkhang.com/upload/sanpham/bang-hieu/bien-quang-cao-dung-12.jpg",
          BoardId: null,
          ReportTypeId: 1,
          AdsPlacementId: 4,
          status: "Chưa xử lý",
          method: null,
          AccountId: null,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 4,
          submission_time: "2023-11-22 02:33:58",
          name: "Nguyễn Tấn Khiêm",
          email: "test@test.com",
          phone: "090293021",
          reportContent: "<p>Ta nói nó chán</p>",
          image:
            "https://banghieuminhkhang.com/upload/sanpham/bang-hieu/bien-quang-cao-dung-12.jpg",
          BoardId: 3,
          ReportTypeId: 2,
          AdsPlacementId: 1,
          status: "Chưa xử lý",
          method: null,
          AccountId: null,
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
    await queryInterface.bulkDelete("reports", null, {});
  },
};
