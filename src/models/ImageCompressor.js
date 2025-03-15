import { Sequelize, DataTypes } from 'sequelize';
import  db from './Model.js';

const ImageCompressor = db.define('ImageCompressor', {
    sno: {
        type: DataTypes.INTEGER,
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    input: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed', 'processing'),
        allowNull: false,
        defaultValue: 'pending',
    },
    output: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: [],
    },
    uniqueId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
});

export default ImageCompressor;