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
          submission_time: "2023-12-12 02:33:58",
          name: "Nguyễn Khánh Hoàng",
          email: "test@test.com",
          phone: "090293021",
          reportContent: "<p>Cái báo cáo xấu quá</p>",
          image:
            "images/reports/bien-quang-cao-dung-12.jpg",
          BoardId: null,
          ReportTypeId: 1,
          AdsPlacementId: 2,
          status: "Chưa xử lý",
          method: null,
          AccountId: null,
          updatedAt: "2023-12-12 02:33:58",
          createdAt: "2023-12-12 02:33:58",
        },
        {
          id: 2,
          submission_time: "2023-12-13 02:33:58",
          name: "Nguyễn Trọng Đại",
          email: "test@test.com",
          phone: "090293021",
          reportContent: "<p>Cái báo cáo xấu điên</p>",
          image:
            "images/reports/bien-quang-cao-dung-12.jpg",
          BoardId: null,
          ReportTypeId: 1,
          AdsPlacementId: 3,
          status: "Chưa xử lý",
          method: null,
          AccountId: null,
          updatedAt: "2023-12-14 02:33:58",
          createdAt: "2023-12-14 02:33:58",
        },
        {
          id: 3,
          submission_time: "2023-12-14 02:33:58",
          name: "Nguyễn Thiện Nhân",
          email: "test@test.com",
          phone: "090293021",
          reportContent: "<p>Vi phạm thuần phong mỹ tục rồi</p>",
          image:
            "images/reports/bien-quang-cao-dung-12.jpg",
          BoardId: null,
          ReportTypeId: 1,
          AdsPlacementId: 4,
          status: "Chưa xử lý",
          method: null,
          AccountId: null,
          updatedAt: "2023-12-14 02:33:58",
          createdAt: "2023-12-14 02:33:58",
        },
        {
          id: 4,
          submission_time: "2023-12-15 02:33:58",
          name: "Nguyễn Tấn Khiêm",
          email: "test@test.com",
          phone: "090293021",
          reportContent: "<p>Ta nói nó chán</p>",
          image:
            "images/reports/bien-quang-cao-dung-12.jpg",
          BoardId: 3,
          ReportTypeId: 2,
          AdsPlacementId: 1,
          status: "Chưa xử lý",
          method: null,
          AccountId: null,
          updatedAt: "2023-12-16 02:33:58",
          createdAt: "2023-12-16 02:33:58",
        },
        {
          id: 5,
          submission_time: "2023-12-15 02:33:58",
          name: "Nguyễn Thiện Nhân",
          email: "ntnhan21@clc.fitus.edu.vn",
          phone: "090293021",
          reportContent: "<p>Lừa đảo</p>",
          image:
            "images/reports/2024-01-01T15-56-55.806Z-hinh,-nen.png, images/reports/2024-01-01T15-56-55.816Z-minimalist.jpg",
          BoardId: 74,
          AdsPlacementId: 47,
          ReportTypeId: 1,
          status: "Chưa xử lý",
          method: null,
          AccountId: null,
          updatedAt: "2023-12-16 02:33:58",
          createdAt: "2023-12-16 02:33:58",
        },
        {
          id: 6,
          submission_time: "2023-12-15 02:33:58",
          name: "Nguyễn Thiện Nhân",
          email: "ntnhan21@clc.fitus.edu.vn",
          phone: "090293021",
          reportContent: "<p>Lừa đảo</p>",
          image:
            "images/reports/2024-01-01T15-34-57.327Z-hinhnen.png, images/reports/2024-01-01T15-34-57.338Z-minimalist.jpg",
          BoardId: 74,
          AdsPlacementId: 47,
          ReportTypeId: 1,
          status: "Chưa xử lý",
          method: null,
          AccountId: null,
          updatedAt: "2023-12-16 02:33:58",
          createdAt: "2023-12-16 02:33:58",
        },
        {
          id: 7,
          submission_time: "2023-12-15 02:33:58",
          name: "Nguyễn Thiện Nhân",
          email: "ntnhan21@clc.fitus.edu.vn",
          phone: "090293021",
          reportContent: "<p>Lừa đảo</p>",
          image:
            "images/reports/2024-01-01T16-12-16.842Z-4k_pc_wallpapers_160_6cd0d.jpg",
          BoardId: 74,
          AdsPlacementId: 47,
          ReportTypeId: 1,
          status: "Chưa xử lý",
          method: null,
          AccountId: null,
          updatedAt: "2023-12-16 02:33:58",
          createdAt: "2023-12-16 02:33:58",
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
