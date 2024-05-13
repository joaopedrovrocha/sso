import { DataTypes, Model, Optional } from "sequelize"
import sequelizeConnection from ".."
import Customer from "./customer.model"

interface UserAttributes {
  id: number
  username: string
  password: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface UserInput extends Optional<UserAttributes, 'id'> { }
export interface UserOutput extends Required<UserAttributes> { }

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number
  public username!: string
  public password!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
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
}, {
  sequelize: sequelizeConnection
})

export default User