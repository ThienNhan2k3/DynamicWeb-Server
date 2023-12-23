'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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

    await queryInterface.bulkInsert('accounts', [{
      id: 1,
      firstName: "Nhân",
      lastName:  "Nguyễn Thiện",
      username: "nhan",
      password: "$2b$12$rV7gjsFTaM/vY.jAzSjEFOXYkyMf5L/tvlz6Zadz10Pc7/tLrAspK", //nhan123
      type: "So",
      AreaId: 1,
      email: "ntnhan21@clc.fitus.edu.vn",
      birth: "2023-11-11 00:00:00",
      phone: "0123456789",
      updatedAt:"2023-11-21T04:14:54",
      createdAt:"2023-11-21T04:14:54"       
    }, 
    {
      id: 2,
      firstName: "Hoàng",
      lastName:  "Nguyễn Khánh",
      username: "hoang",
      password: "$2b$12$V37z8QM5g2J0Rp2XxVf2QutIMcnaRcuW9QcFvMR.lthNisApSDGPG", //hoang123
      type: "Quan",
      AreaId: 190,
      email: "hoang@gmail.com",
      birth: "2023-11-11 00:00:00",
      phone: "0123456789",
      updatedAt:"2023-11-21T04:14:54",
      createdAt:"2023-11-21T04:14:54"     
    }, 
    {
      id: 3,
      firstName: "Khiêm",
      lastName:  "Nguyễn Tấn",
      username: "khiem",
      password: "$2b$12$.BVc.Mw9MvW2zuD9tBFXKuC1kw4P8Ez4pG6DNX53XxvYuqehQ76tS", //khiem123
      type: "Phuong",
      AreaId: 3,
      email: "khiem@gmail.com",
      birth: "2023-11-11 00:00:00",
      phone: "0123456789",
      updatedAt:"2023-11-21T04:14:54",
      createdAt:"2023-11-21T04:14:54"   
    },
    {
      id: 4,
      firstName: "Đại",
      lastName:  "Nguyễn Trọng",
      username: "dai",
      password: "$2b$12$uRB4sdMgytHx3Z8qq8v4m.GXqWWa57cMJtfExuuIBfCEAALPFRVrG", //dai123
      type: "Phuong",
      AreaId: 7,
      email: "dai@gmail.com",
      birth: "2023-11-11 00:00:00",
      phone: "0123456789",
      updatedAt:"2023-11-21T04:14:54",
      createdAt:"2023-11-21T04:14:54"   
    },
    {
      id: 5,
      firstName: "Nhân",
      lastName:  "Nguyễn Thiện",
      username: "nhan123",
      password: "$2b$12$rV7gjsFTaM/vY.jAzSjEFOXYkyMf5L/tvlz6Zadz10Pc7/tLrAspK", //nhan123
      type: "Phuong",
      email: "nhan123@gmail.com",
      birth: "2023-11-11 00:00:00",
      phone: "0123456789",
      AreaId: 186,
      updatedAt:"2023-11-21T04:14:54",
      createdAt:"2023-11-21T04:14:54"       
    },
    {
      id: 6,
      firstName: "Đại",
      lastName:  "Nguyễn Trọng",
      username: "dai123",
      password: "$2b$12$uRB4sdMgytHx3Z8qq8v4m.GXqWWa57cMJtfExuuIBfCEAALPFRVrG", //dai123
      type: "Quan",
      AreaId: 5,
      email: "dai123@gmail.com",
      birth: "2023-11-11 00:00:00",
      phone: "0123456789",
      updatedAt:"2023-11-21T04:14:54",
      createdAt:"2023-11-21T04:14:54"   
    },
    {
      id: 7,
      firstName: "Hoàng",
      lastName:  "Nguyễn Khánh",
      username: "hoang123",
      password: "$2b$12$V37z8QM5g2J0Rp2XxVf2QutIMcnaRcuW9QcFvMR.lthNisApSDGPG", //hoang123
      type: "Quan",
      AreaId: 6,
      email: "hoang123@gmail.com", 
      birth: "2023-11-11 00:00:00",
      phone: "0123456789",
      updatedAt:"2023-11-21T04:14:54",
      createdAt:"2023-11-21T04:14:54"     
    }, 
    {
      id: 8,
      firstName: "Khiêm",
      lastName:  "Nguyễn Tấn",
      username: "khiem123",
      password: "$2b$12$.BVc.Mw9MvW2zuD9tBFXKuC1kw4P8Ez4pG6DNX53XxvYuqehQ76tS", //khiem123
      type: "So",
      AreaId: 1,
      email: "khiem123@gmail.com",
      birth: "2023-11-11 00:00:00",
      phone: "0123456789",
      updatedAt:"2023-11-21T04:14:54",
      createdAt:"2023-11-21T04:14:54"   
    },{
      id: 9,
      firstName: "Nhân",
      lastName:  "Nguyễn Thiện",
      username: "nhan032",
      password: "$2b$12$rV7gjsFTaM/vY.jAzSjEFOXYkyMf5L/tvlz6Zadz10Pc7/tLrAspK", //nhan123
      type: "So",
      AreaId: 1,
      email: "thnhan032@gmail.com",
      birth: "2023-11-11 00:00:00",
      phone: "0123456789",
      updatedAt:"2023-11-21T04:14:54",
      createdAt:"2023-11-21T04:14:54"       
    },  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('accounts', null, {});

  }
};
