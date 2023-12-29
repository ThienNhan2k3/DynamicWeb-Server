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
    await queryInterface.sequelize.query("SELECT * FROM companies");
    await queryInterface.sequelize.query("SELECT * FROM boards");
    await queryInterface.sequelize.query("SELECT * FROM reporttypes");
    await queryInterface.sequelize.query("SELECT * FROM accounts");

    await queryInterface.bulkInsert(
      "permitRequests",
      [
        {
          id: 1,
          content: "Quảng cáo sản phẩm nông nghiệp",
          image: "bien-1.jpg",
          start: "2023-11-11 00:00:00",
          end: "2023-11-11 00:00:00",
          status: "Bị báo cáo",
          CompanyId: 1,
          BoardId: 1,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 2,
          content: "Quảng cáo nước giải khát",
          image: "bien-1.jpg",
          start: "2023-11-11 00:00:00",
          end: "2023-11-11 00:00:00",
          status: "Chưa cấp phép",
          CompanyId: 1,
          BoardId: 2,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 3,
          content: "Quảng cáo máy tính",
          image: "bien-1.jpg",
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
          image: "bien-1.jpg",
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
          id: 5,
          content: "Quảng cáo sản phẩm công nghiệp",
          image: "bien-1.jpg",
          start: "2023-11-11 00:00:00",
          end: "2023-11-11 00:00:00",
          status: "Chưa cấp phép",
          CompanyId: 1,
          BoardId: 5,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 6,
          content: "Quảng cáo đồ gia dụng",
          image: "bien-1.jpg",
          start: "2023-11-11 00:00:00",
          end: "2023-11-11 00:00:00",
          status: "Chưa cấp phép",
          CompanyId: 1,
          BoardId: 6,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 7,
          content: "Quảng cáo đồ điện tử",
          image: "bien-5.jpg",
          start: "2023-11-13 10:00:00",
          end: "2023-11-13 20:00:00",
          status: "Chưa cấp phép",
          CompanyId: 5,
          BoardId: 7,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 8,
          content: "Quảng cáo thực phẩm sạch",
          image: "bien-2.jpg",
          start: "2023-11-14 12:00:00",
          end: "2023-11-14 22:00:00",
          status: "Chưa cấp phép",
          CompanyId: 1,
          BoardId: 8,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 9,
          content: "Quảng cáo thời trang",
          image: "bien-4.jpg",
          start: "2023-11-15 14:30:00",
          end: "2023-11-15 23:00:00",
          status: "Chưa cấp phép",
          CompanyId: 4,
          BoardId: 9,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 10,
          content: "Quảng cáo dịch vụ du lịch",
          image: "bien-7.jpg",
          start: "2023-11-16 16:00:00",
          end: "2023-11-16 01:00:00",
          status: "Đã cấp phép",
          CompanyId: 3,
          BoardId: 10,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 11,
          content: "Quảng cáo đồ chơi trẻ em",
          image: "bien-1.jpg",
          start: "2023-11-17 18:30:00",
          end: "2023-11-17 03:00:00",
          status: "Chưa cấp phép",
          CompanyId: 2,
          BoardId: 11,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 12,
          content: "Quảng cáo xe máy mới",
          image: "bien-6.jpg",
          start: "2023-11-18 20:00:00",
          end: "2023-11-18 04:30:00",
          status: "Bị báo cáo",
          CompanyId: 5,
          BoardId: 12,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 13,
          content: "Quảng cáo thực phẩm hữu cơ",
          image: "bien-3.jpg",
          start: "2023-11-19 22:30:00",
          end: "2023-11-19 06:00:00",
          status: "Đã cấp phép",
          CompanyId: 1,
          BoardId: 13,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 14,
          content: "Quảng cáo sách mới",
          image: "bien-2.jpg",
          start: "2023-11-20 01:00:00",
          end: "2023-11-20 08:30:00",
          status: "Chưa cấp phép",
          CompanyId: 4,
          BoardId: 14,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 15,
          content: "Quảng cáo điện thoại di động",
          image: "bien-7.jpg",
          start: "2023-11-21 03:30:00",
          end: "2023-11-21 10:00:00",
          status: "Chưa cấp phép",
          CompanyId: 3,
          BoardId: 15,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 16,
          content: "Quảng cáo đồ gia dụng khác",
          image: "bien-4.jpg",
          start: "2023-11-22 10:30:00",
          end: "2023-11-22 20:00:00",
          status: "Chưa cấp phép",
          CompanyId: 5,
          BoardId: 16,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 17,
          content: "Quảng cáo đồ điện tử mới",
          image: "bien-1.jpg",
          start: "2023-11-23 12:00:00",
          end: "2023-11-23 22:30:00",
          status: "Chưa cấp phép",
          CompanyId: 3,
          BoardId: 17,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 18,
          content: "Quảng cáo thực phẩm sạch và organic",
          image: "bien-6.jpg",
          start: "2023-11-24 14:30:00",
          end: "2023-11-24 23:00:00",
          status: "Đã cấp phép",
          CompanyId: 1,
          BoardId: 18,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 19,
          content: "Quảng cáo thời trang mùa đông",
          image: "bien-3.jpg",
          start: "2023-11-25 16:00:00",
          end: "2023-11-25 01:30:00",
          status: "Chưa cấp phép",
          CompanyId: 4,
          BoardId: 19,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 20,
          content: "Quảng cáo dịch vụ du lịch hè 2024",
          image: "bien-2.jpg",
          start: "2023-11-26 18:30:00",
          end: "2023-11-26 03:00:00",
          status: "Đã cấp phép",
          CompanyId: 2,
          BoardId: 20,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 21,
          content: "Quảng cáo đồ chơi cho bé yêu",
          image: "bien-5.jpg",
          start: "2023-11-27 20:00:00",
          end: "2023-11-27 04:30:00",
          status: "Chưa cấp phép",
          CompanyId: 3,
          BoardId: 21,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 22,
          content: "Quảng cáo xe máy và phụ kiện",
          image: "bien-7.jpg",
          start: "2023-11-28 22:30:00",
          end: "2023-11-28 06:00:00",
          status: "Bị báo cáo",
          CompanyId: 5,
          BoardId: 22,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 23,
          content: "Quảng cáo thực phẩm hữu cơ mới",
          image: "bien-4.jpg",
          start: "2023-11-29 01:00:00",
          end: "2023-11-29 08:30:00",
          status: "Chưa cấp phép",
          CompanyId: 1,
          BoardId: 23,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 24,
          content: "Quảng cáo sách mới nhất",
          image: "bien-6.jpg",
          start: "2023-11-30 03:30:00",
          end: "2023-11-30 10:00:00",
          status: "Chưa cấp phép",
          CompanyId: 4,
          BoardId: 24,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 25,
          content: "Quảng cáo điện thoại di động cao cấp",
          image: "bien-2.jpg",
          start: "2023-12-01 10:30:00",
          end: "2023-12-01 20:00:00",
          status: "Chưa cấp phép",
          CompanyId: 3,
          BoardId: 25,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 26,
          content: "Quảng cáo đồ gia dụng hiện đại",
          image: "bien-1.jpg",
          start: "2023-12-02 12:00:00",
          end: "2023-12-02 22:30:00",
          status: "Chưa cấp phép",
          CompanyId: 5,
          BoardId: 26,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 27,
          content: "Quảng cáo đồ điện tử công nghệ mới",
          image: "bien-3.jpg",
          start: "2023-12-03 14:30:00",
          end: "2023-12-03 23:00:00",
          status: "Đã cấp phép",
          CompanyId: 3,
          BoardId: 27,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 28,
          content: "Quảng cáo thực phẩm sạch và chất lượng",
          image: "bien-6.jpg",
          start: "2023-12-04 16:00:00",
          end: "2023-12-04 01:30:00",
          status: "Chưa cấp phép",
          CompanyId: 1,
          BoardId: 28,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 29,
          content: "Quảng cáo thời trang mùa xuân",
          image: "bien-2.jpg",
          start: "2023-12-05 18:30:00",
          end: "2023-12-05 03:00:00",
          status: "Bị báo cáo",
          CompanyId: 4,
          BoardId: 29,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 30,
          content: "Quảng cáo dịch vụ du lịch hạ long",
          image: "bien-4.jpg",
          start: "2023-12-06 20:00:00",
          end: "2023-12-06 04:30:00",
          status: "Đã cấp phép",
          CompanyId: 2,
          BoardId: 30,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 31,
          content: "Quảng cáo đồ chơi giáo dục cho trẻ em",
          image: "bien-5.jpg",
          start: "2023-12-07 22:30:00",
          end: "2023-12-07 06:00:00",
          status: "Chưa cấp phép",
          CompanyId: 3,
          BoardId: 31,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 32,
          content: "Quảng cáo xe máy mới nhất",
          image: "bien-7.jpg",
          start: "2023-12-08 01:00:00",
          end: "2023-12-08 08:30:00",
          status: "Đã cấp phép",
          CompanyId: 5,
          BoardId: 32,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 33,
          content: "Quảng cáo thực phẩm hữu cơ cao cấp",
          image: "bien-1.jpg",
          start: "2023-12-09 03:30:00",
          end: "2023-12-09 10:00:00",
          status: "Chưa cấp phép",
          CompanyId: 1,
          BoardId: 33,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 34,
          content: "Quảng cáo sách giáo trình mới",
          image: "bien-3.jpg",
          start: "2023-12-10 10:30:00",
          end: "2023-12-10 20:00:00",
          status: "Chưa cấp phép",
          CompanyId: 4,
          BoardId: 34,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 35,
          content: "Quảng cáo điện thoại di động hiệu suất cao",
          image: "bien-6.jpg",
          start: "2023-12-11 12:00:00",
          end: "2023-12-11 22:30:00",
          status: "Chưa cấp phép",
          CompanyId: 3,
          BoardId: 35,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 36,
          content: "Quảng cáo đồ gia dụng thông minh",
          image: "bien-2.jpg",
          start: "2023-12-12 14:30:00",
          end: "2023-12-12 23:00:00",
          status: "Chưa cấp phép",
          CompanyId: 5,
          BoardId: 36,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 37,
          content: "Quảng cáo đồ điện tử tiện ích",
          image: "bien-5.jpg",
          start: "2023-12-13 16:00:00",
          end: "2023-12-13 01:30:00",
          status: "Đã cấp phép",
          CompanyId: 3,
          BoardId: 37,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 38,
          content: "Quảng cáo thực phẩm sạch cao cấp",
          image: "bien-7.jpg",
          start: "2023-12-14 18:30:00",
          end: "2023-12-14 03:00:00",
          status: "Chưa cấp phép",
          CompanyId: 1,
          BoardId: 38,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 39,
          content: "Quảng cáo thời trang mùa hè",
          image: "bien-1.jpg",
          start: "2023-12-15 20:00:00",
          end: "2023-12-15 04:30:00",
          status: "Đã cấp phép",
          CompanyId: 4,
          BoardId: 39,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 40,
          content: "Quảng cáo dịch vụ du lịch Sapa",
          image: "bien-3.jpg",
          start: "2023-12-16 22:30:00",
          end: "2023-12-16 06:00:00",
          status: "Chưa cấp phép",
          CompanyId: 2,
          BoardId: 40,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 41,
          content: "Quảng cáo đồ chơi thông minh cho bé",
          image: "bien-6.jpg",
          start: "2023-12-17 01:00:00",
          end: "2023-12-17 08:30:00",
          status: "Chưa cấp phép",
          CompanyId: 3,
          BoardId: 41,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 42,
          content: "Quảng cáo xe máy hiện đại",
          image: "bien-2.jpg",
          start: "2023-12-18 03:30:00",
          end: "2023-12-18 10:00:00",
          status: "Chưa cấp phép",
          CompanyId: 5,
          BoardId: 42,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 43,
          content: "Quảng cáo thực phẩm hữu cơ mới nhất",
          image: "bien-5.jpg",
          start: "2023-12-19 10:30:00",
          end: "2023-12-19 20:00:00",
          status: "Đã cấp phép",
          CompanyId: 1,
          BoardId: 43,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 44,
          content: "Quảng cáo sách giáo trình chất lượng",
          image: "bien-7.jpg",
          start: "2023-12-20 12:00:00",
          end: "2023-12-20 22:30:00",
          status: "Chưa cấp phép",
          CompanyId: 4,
          BoardId: 44,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 45,
          content: "Quảng cáo điện thoại di động cao cấp nhất",
          image: "bien-3.jpg",
          start: "2023-12-21 14:30:00",
          end: "2023-12-21 23:00:00",
          status: "Chưa cấp phép",
          CompanyId: 3,
          BoardId: 45,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 46,
          content: "Quảng cáo đồ gia dụng tiện ích",
          image: "bien-6.jpg",
          start: "2023-12-22 16:00:00",
          end: "2023-12-22 01:30:00",
          status: "Chưa cấp phép",
          CompanyId: 5,
          BoardId: 46,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 47,
          content: "Quảng cáo đồ điện tử công nghệ hiện đại",
          image: "bien-1.jpg",
          start: "2023-12-23 18:30:00",
          end: "2023-12-23 03:00:00",
          status: "Đã cấp phép",
          CompanyId: 3,
          BoardId: 47,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 48,
          content: "Quảng cáo thực phẩm sạch và chất lượng cao",
          image: "bien-4.jpg",
          start: "2023-12-24 20:00:00",
          end: "2023-12-24 04:30:00",
          status: "Chưa cấp phép",
          CompanyId: 1,
          BoardId: 48,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 49,
          content: "Quảng cáo thời trang mùa đông ấm áp",
          image: "bien-7.jpg",
          start: "2023-12-25 22:30:00",
          end: "2023-12-25 06:00:00",
          status: "Đã cấp phép",
          CompanyId: 4,
          BoardId: 49,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 50,
          content: "Quảng cáo dịch vụ du lịch đón xuân mới",
          image: "bien-2.jpg",
          start: "2023-12-26 01:00:00",
          end: "2023-12-26 08:30:00",
          status: "Chưa cấp phép",
          CompanyId: 2,
          BoardId: 50,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 51,
          content: "Quảng cáo đồ chơi giáo dục cho trẻ em thông minh",
          image: "bien-5.jpg",
          start: "2023-12-27 03:30:00",
          end: "2023-12-27 10:00:00",
          status: "Đã cấp phép",
          CompanyId: 3,
          BoardId: 51,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 52,
          content: "Quảng cáo xe máy điện mới",
          image: "bien-6.jpg",
          start: "2023-12-28 10:30:00",
          end: "2023-12-28 20:00:00",
          status: "Chưa cấp phép",
          CompanyId: 5,
          BoardId: 52,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 53,
          content: "Quảng cáo thực phẩm hữu cơ chất lượng",
          image: "bien-1.jpg",
          start: "2023-12-29 12:00:00",
          end: "2023-12-29 22:30:00",
          status: "Đã cấp phép",
          CompanyId: 1,
          BoardId: 53,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 54,
          content: "Quảng cáo sách giáo trình chất lượng cao",
          image: "bien-4.jpg",
          start: "2023-12-30 14:30:00",
          end: "2023-12-30 23:00:00",
          status: "Chưa cấp phép",
          CompanyId: 4,
          BoardId: 54,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 55,
          content: "Quảng cáo điện thoại di động cao cấp nhất",
          image: "bien-7.jpg",
          start: "2023-12-31 16:00:00",
          end: "2023-12-31 01:30:00",
          status: "Chưa cấp phép",
          CompanyId: 3,
          BoardId: 55,
          AccountId: 2,
          updatedAt: "2023-11-21T04:14:54",
          createdAt: "2023-11-21T04:14:54",
        },
        {
          id: 56,
          content: "Quảng cáo đồ gia dụng thông minh",
          image: "bien-2.jpg",
          start: "2024-01-01 18:30:00",
          end: "2024-01-01 03:00:00",
          status: "Chưa cấp phép",
          CompanyId: 5,
          BoardId: 56,
          AccountId: 2,
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
    await queryInterface.bulkDelete("permitRequests", null, {});
  },
};
