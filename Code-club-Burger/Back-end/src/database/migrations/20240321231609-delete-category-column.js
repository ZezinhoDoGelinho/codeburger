'use strict';

//Deletar a coluna category de products
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'category');
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.createColumn('products',{
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  }
};
