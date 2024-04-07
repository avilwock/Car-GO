const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Car extends Model {
}
Car.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    make: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            fourDigits(value) {
                if (value.toString().length !==4 || isNaN(value)) {
                    throw new Error ('Year must be a four-digit number.');
                }
            }
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model:'user',
            key:'id',
        }
    }
   
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'car'
    }
);

module.exports = Car;
