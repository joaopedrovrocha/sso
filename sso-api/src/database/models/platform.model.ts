import { DataTypes, Model, Optional } from "sequelize"
import sequelizeConnection from ".."

interface PlatformAttributes {
  id: number
  name: string
  url: string
  logo: string
  uuid: string
  redirectUrl: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface PlatformInput extends Optional<PlatformAttributes, 'id'> { }
export interface PlatformOutput extends Required<PlatformAttributes> { }

class Platform extends Model<PlatformAttributes, PlatformInput> implements PlatformAttributes {
  public id!: number
  public name!: string
  public url!: string
  public logo!: string
  public uuid!: string
  public redirectUrl!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

Platform.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
  },
  redirectUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'NOT-SET'
  }
}, {
  sequelize: sequelizeConnection
})

export default Platform