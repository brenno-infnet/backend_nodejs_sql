const { Sequelize, DataTypes } = require('sequelize')

const db = require('../database/conn')
const Cursos = db.define('Cursos', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  qtd_vagas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dt_init_insc: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dt_end_insc: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dt_start_curso: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dt_end_curso: {
    type: DataTypes.DATE,
    allowNull: false,
  },
})

module.exports = Cursos