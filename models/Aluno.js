const { Sequelize, DataTypes } = require('sequelize')

const db = require('../database/conn')

const bcrypt = require('bcrypt')

const Alunos = db.define('Alunos', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  dt_birth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

Alunos.beforeCreate(async (user) => {    
  const passwordHash = await bcrypt.hash(user.password, 10)  
  user.password = passwordHash
})

module.exports = Alunos