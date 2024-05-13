import jwt from 'jsonwebtoken'
import request from 'supertest'
import app from '../../../app'
import { Platform, PlatformUser } from '../../../database/models'
import { useGenerators } from '../../../utils/test.utils'
import moment from 'moment'

const {
  genPlatformUser,
  genPlatform
} = useGenerators()

jest.mock('sequelize')
jest.mock('ioredis')

describe('Authorize', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should handle success response', async () => {
    const platform = genPlatform()
    const platformUser = genPlatformUser(undefined, platform.id)
    const token = 'token'

    platformUser.tokenExpiresAt = new Date(moment().add(1, 'hour').toISOString())

    const payload = { validationToken: platformUser.validationToken }

    PlatformUser.findAll = jest.fn().mockResolvedValue([platformUser])
    Platform.findByPk = jest.fn().mockResolvedValue(platform)
    jwt.sign = jest.fn().mockReturnValue(token)

    const res = await request(app)
      .post(`/api/v1/user/authorize`)
      .send(payload)

    const expectedResult = {
      success: true,
      data: {
        token,
        userId: platformUser.userId,
        platformId: platformUser.platformId,
        redirectUrl: platform.redirectUrl,
        uuid: platform.uuid
      }
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(200)
  })

  it('should handle error response when token expired', async () => {
    const platform = genPlatform()
    const platformUser = genPlatformUser(undefined, platform.id)
    const token = 'token'

    const payload = { validationToken: platformUser.validationToken }

    PlatformUser.findAll = jest.fn().mockResolvedValue([platformUser])
    Platform.findByPk = jest.fn().mockResolvedValue(platform)
    jwt.sign = jest.fn().mockReturnValue(token)

    const res = await request(app)
      .post(`/api/v1/user/authorize`)
      .send(payload)

    const expectedResult = {
      success: false,
      error: `AuthorizeService token expired`
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(400)
  })

  it('should handle error response when platform doesnt exists', async () => {
    const platform = genPlatform()
    const token = 'token'

    const payload = { validationToken: 'validationToken' }

    PlatformUser.findAll = jest.fn().mockResolvedValue([])
    Platform.findByPk = jest.fn().mockResolvedValue(platform)
    jwt.sign = jest.fn().mockReturnValue(token)

    const res = await request(app)
      .post(`/api/v1/user/authorize`)
      .send(payload)

    const expectedResult = {
      success: false,
      error: `AuthorizeService not found | TOKEN ${payload.validationToken}`
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(400)
  })
})