const { Sequelize, DataTypes } = require('sequelize');

const db = require('../database/conn')

const Inscricao = db.define('Inscricao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  canceled_at: {
    type: DataTypes.DATE,    
    allowNull: true,
  },
  curso_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Cursos',
      key: 'id',
    },
  },
  aluno_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Alunos',
      key: 'id',
    },
  },
})

module.exports = Inscricao