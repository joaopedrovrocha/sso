import { DataTypes, Deferrable, Model, Optional } from "sequelize"
import sequelizeConnection from ".."
import User from "./user.model"
import Platform from "./platform.model"

interface PlatformUserAttributes {
  id: number
  platformId: number
  userId: number
  validationToken?: string
  tokenExpiresAt?: Date
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface PlatformUserInput extends Optional<PlatformUserAttributes, 'id'> { }
export interface PlatformUserOutput extends Required<PlatformUserAttributes> { }

class PlatformUser extends Model<PlatformUserAttributes, PlatformUserInput> implements PlatformUserAttributes {
  public id!: number
  public platformId!: number
  public userId!: number
  public validationToken!: string
  public tokenExpiresAt!: Date

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

PlatformUser.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  platformId: {
    type: DataTypes.INTEGER,
    references: { model: Platform }
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: User }
  },
  validationToken: {
    type: DataTypes.STRING
  },
  tokenExpiresAt: {
    type: DataTypes.DATE
  },
}, {
  sequelize: sequelizeConnection
})

export default PlatformUser