import request from 'supertest'
import { useGenerators } from '../../../utils/test.utils'
import { Customer, Platform, PlatformUser, User } from '../../../database/models'
import app from '../../../app'
import sequelize, { Transaction } from 'sequelize'
import sequelizeConnection from '../../../database'

jest.mock('sequelize')
jest.mock('ioredis')

const {
  genUser,
  genCustomer,
  genPlatform,
  genPlatformUser
} = useGenerators()

describe('Register', () => {
  beforeEach(() => {
    jest.resetAllMocks()

    sequelizeConnection.transaction = jest.fn().mockResolvedValue(({
      commit: jest.fn().mockResolvedValue(true),
      rollback: jest.fn().mockResolvedValue(true)
    }))
  })

  it('should handle the success response', async () => {
    const user = genUser()
    const customer = genCustomer(undefined, user.id)
    const platform = genPlatform()
    const platformUser = genPlatformUser(undefined, platform.id, user.id)

    Platform.findAll = jest.fn().mockResolvedValue([platform])
    User.create = jest.fn().mockResolvedValue(user)
    Customer.create = jest.fn().mockResolvedValue(customer)
    PlatformUser.create = jest.fn().mockResolvedValue(platformUser)

    const payload = {
      username: user.username,
      password: user.password,
      name: customer.name,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      platformUUID: platform.uuid
    }

    const res = await request(app)
      .post('/api/v1/user/register')
      .send(payload)

    const expectedResult = {
      success: true,
      data: JSON.parse(JSON.stringify(platformUser))
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(200)
  })

  it('should handle the error response', async () => {
    Platform.findAll = jest.fn().mockResolvedValue([])

    const payload = {
      username: 'username@email.com',
      password: 'password',
      name: 'name',
      email: 'email@email.com',
      phoneNumber: 'phoneNumber',
      platformUUID: 'platformUUID',
    }

    const res = await request(app)
      .post('/api/v1/user/register')
      .send(payload)

    const expectedResult = {
      success: false,
      error: `Platform not found with uuid platformUUID`
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(400)
  })

  it('should handle the error response when incorrect params', async () => {
    Platform.findAll = jest.fn().mockResolvedValue([])

    const payload = {
      username: 'username',
      password: 'password',
      name: 'name',
      email: 'email@email.com',
      phoneNumber: 'phoneNumber',
      platformUUID: 'platformUUID',
    }

    const res = await request(app)
      .post('/api/v1/user/register')
      .send(payload)

    const expectedResult = {
      success: false,
      error: `invalid email`
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(400)
  })
})