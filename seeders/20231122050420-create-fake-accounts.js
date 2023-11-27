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

    await queryInterface.bulkInsert('accounts', [{
      id: 1,
      firstName: "Nhan",
      lastName:  "Nguyen",
      username: "nhan",
      password: "$2b$12$rV7gjsFTaM/vY.jAzSjEFOXYkyMf5L/tvlz6Zadz10Pc7/tLrAspK",
      type: "So",
      district: "5",
      ward: "10",
      email: "nhan@gmail.com",
      updatedAt:"2023-11-21T04:14:54",
      createdAt:"2023-11-21T04:14:54"       
    }, 
    {
      id: 2,
      firstName: "Hoang",
      lastName:  "Nguyen",
      username: "hoang",
      password: "$2b$12$V37z8QM5g2J0Rp2XxVf2QutIMcnaRcuW9QcFvMR.lthNisApSDGPG",
      type: "Quan",
      district: "11",
      ward: "5",
      email: "hoang@gmail.com",  
      updatedAt:"2023-11-21T04:14:54",
      createdAt:"2023-11-21T04:14:54"     
    }, 
    {
      id: 3,
      firstName: "Khiem",
      lastName:  "Nguyen",
      username: "khiem",
      password: "$2b$12$.BVc.Mw9MvW2zuD9tBFXKuC1kw4P8Ez4pG6DNX53XxvYuqehQ76tS",
      type: "Phuong",
      district: "11",
      ward: "7",
      email: "khiem@gmail.com", 
      updatedAt:"2023-11-21T04:14:54",
      createdAt:"2023-11-21T04:14:54"   
    }], {});
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
