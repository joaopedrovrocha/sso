import { DataTypes, Deferrable, Model, Optional } from "sequelize"
import sequelizeConnection from ".."
import User from "./user.model"

interface CustomerAttributes {
  id: number
  name: string
  phoneNumber: string
  email: string
  userId: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface CustomerInput extends Optional<CustomerAttributes, 'id'> { }
export interface CustomerOutput extends Required<CustomerAttributes> { }

class Customer extends Model<CustomerAttributes, CustomerInput> implements CustomerAttributes {
  public id!: number
  public name!: string
  public phoneNumber!: string
  public email!: string
  public userId!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

Customer.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: User }
  },
}, {
  sequelize: sequelizeConnection
})

export default Customer