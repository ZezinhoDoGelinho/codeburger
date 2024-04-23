'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    //Criamos uma coluna de "oferta" na tabela de produtos
    await queryInterface.addColumn('products', 'offer', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'offer');
  }
};
