import { DataTypes } from 'sequelize';
import { sequelize } from '../config/postgresDb.js';

const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    timestamps: true,
  },
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

export default User;