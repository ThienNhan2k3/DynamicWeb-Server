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
      username: "nhan",
      password: "$2b$12$rV7gjsFTaM/vY.jAzSjEFOXYkyMf5L/tvlz6Zadz10Pc7/tLrAspK",
      type: "So",
      district: "",
      ward: "",
      email: "thnhan032@gmail.com",    
    }, 
    {
      id: 2,
      username: "hoang",
      password: "$2b$12$V37z8QM5g2J0Rp2XxVf2QutIMcnaRcuW9QcFvMR.lthNisApSDGPG",
      type: "Quan",
      district: "1",
      ward: "",
      email: "hoang@gmail.com",    
    }, 
    {
      id: 3,
      username: "khiem",
      password: "$2b$12$.BVc.Mw9MvW2zuD9tBFXKuC1kw4P8Ez4pG6DNX53XxvYuqehQ76tS",
      type: "Phuong",
      district: "5",
      ward: "4",
      email: "khiem@gmail.com",    
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
