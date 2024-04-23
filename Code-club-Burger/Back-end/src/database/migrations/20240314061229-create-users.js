'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Cria uma tabela de users
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID, //tipo dele
        defaultValue: Sequelize.UUIDV4, // valor que ele vai ser
        allowNull: false, //Define que esse campo é obrigatorio
        primaryKey: true, //define que ele nao pode se repetir
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, //Aqui dizemos que ele dever ser unico
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false, //valor padrão = false
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users')
  },
};
