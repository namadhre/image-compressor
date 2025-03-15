import { Sequelize, DataTypes } from 'sequelize';
import  db from './Model.js';

const Request = db.define('Request', {
    status: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    uniqueId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
});

export default Request;