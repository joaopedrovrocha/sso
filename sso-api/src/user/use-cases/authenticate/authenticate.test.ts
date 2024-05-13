import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import request from 'supertest'
import app from '../../../app'
import { Platform, PlatformUser, User } from '../../../database/models'
import { useGenerators } from '../../../utils/test.utils'

const {
  genPlatform,
  genUser,
  genPlatformUser,
} = useGenerators()

jest.mock('sequelize')
jest.mock('ioredis')

describe('Authenticate', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should handle the success response when relation exists', async () => {
    const platform = genPlatform()
    const user = genUser()
    const platformUser = genPlatformUser(undefined, platform.id, user.id)

    const token = platformUser.validationToken

    const payload = {
      username: user.username,
      password: user.password,
      platformUUID: platform.uuid
    }

    User.findAll = jest.fn().mockResolvedValue([user])
    Platform.findAll = jest.fn().mockResolvedValue([platform])
    PlatformUser.findAll = jest.fn().mockResolvedValue([platformUser])
    PlatformUser.findByPk = jest.fn().mockResolvedValue(platformUser)
    PlatformUser.update = jest.fn().mockResolvedValue(platformUser)
    bcrypt.compareSync = jest.fn().mockReturnValue(true)
    jwt.sign = jest.fn().mockReturnValue(token)

    const res = await request(app)
      .post(`/api/v1/user/authenticate`)
      .send(payload)

    const expectedResult = {
      success: true,
      data: {
        token: token,
        userId: user.id,
        platformId: platform.id,
        redirectUrl: platform.redirectUrl,
        uuid: platform.uuid
      }
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(200)
  })

  it('should handle the success response when relation doesnt exists', async () => {
    const platform = genPlatform()
    const user = genUser()
    const platformUser = genPlatformUser(undefined, platform.id, user.id)

    const token = platformUser.validationToken

    const payload = {
      username: user.username,
      password: user.password,
      platformUUID: platform.uuid
    }

    User.findAll = jest.fn().mockResolvedValue([user])
    Platform.findAll = jest.fn().mockResolvedValue([platform])
    PlatformUser.findAll = jest.fn().mockResolvedValue([])
    PlatformUser.create = jest.fn().mockResolvedValue(platformUser)
    bcrypt.compareSync = jest.fn().mockReturnValue(true)
    jwt.sign = jest.fn().mockReturnValue(token)

    const res = await request(app)
      .post(`/api/v1/user/authenticate`)
      .send(payload)

    const expectedResult = {
      success: true,
      data: {
        token: token,
        userId: user.id,
        platformId: platform.id,
        redirectUrl: platform.redirectUrl,
        uuid: platform.uuid
      }
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(200)
  })

  it('should handle the error response when auth is invalid', async () => {
    const platform = genPlatform()
    const user = genUser()
    const platformUser = genPlatformUser(undefined, platform.id, user.id)

    const token = platformUser.validationToken

    const payload = {
      username: user.username,
      password: user.password,
      platformUUID: platform.uuid
    }

    User.findAll = jest.fn().mockResolvedValue([user])
    Platform.findAll = jest.fn().mockResolvedValue([platform])
    PlatformUser.findAll = jest.fn().mockResolvedValue([])
    PlatformUser.create = jest.fn().mockResolvedValue(platformUser)
    bcrypt.compareSync = jest.fn().mockReturnValue(false)
    jwt.sign = jest.fn().mockReturnValue(token)

    const res = await request(app)
      .post(`/api/v1/user/authenticate`)
      .send(payload)

    const expectedResult = {
      success: false,
      error: `AuthenticateService invalid password for ${user.username}`
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(401)
  })
})