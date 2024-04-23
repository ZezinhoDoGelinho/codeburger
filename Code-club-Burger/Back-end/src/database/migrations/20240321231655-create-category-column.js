'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    //Adicionando uma coluna na tabela de "products" com o nome "category_id"
    await queryInterface.addColumn('products', 'category_id',
    {
      type: Sequelize.INTEGER,
      references: { model: 'categories', key: 'id'}, // Ele vai buscar se na tabela de "categories" tem alguma com o id que passarmos
      onUpdate: 'CASCADE', 
      onDelete: 'SET NULL',
      allowNull: true,
    });
     
  },

  async down (queryInterface) {
    // Caso der erro ele remove a coluna "category_id"
    await queryInterface.removeColumn('products', 'category_id');
  }
};
