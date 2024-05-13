import express from 'express'
import request from 'supertest'
import app from '../../../app'
import Platform, { PlatformOutput } from '../../../database/models/platform.model'
import { useGenerators } from '../../../utils/test.utils'
import { PlatformUser } from '../../../database/models'
import jwt from 'jsonwebtoken'

jest.mock('sequelize')
jest.mock('ioredis')

const {
  genPlatform,
  genPlatformUser
} = useGenerators()

describe('AuthChecker', () => {
  beforeEach(() => {
    jest.resetAllMocks()

    express.request.session = undefined
  })

  it('should handle the success response when relation exists', async () => {
    // mock user logged in
    express.request.session = { userId: 1 }

    const platform = genPlatform()
    const platformUser = genPlatformUser()
    const token = 'token'

    Platform.findAll = jest.fn().mockResolvedValue([platform])
    PlatformUser.findAll = jest.fn().mockResolvedValue([platformUser])
    jwt.sign = jest.fn().mockReturnValue(token)

    const res = await request(app)
      .get(`/api/v1/user/auth-checker?platformUUID=${platform.id}`)

    const expectedResult = {
      success: true,
      data: JSON.parse(JSON.stringify({
        token
      }))
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(200)
  })

  it('should handle the success response when relation doesnt exists', async () => {
    // mock user logged in
    express.request.session = { userId: 1 }

    const platform = genPlatform()
    const platformUser = genPlatformUser()
    const token = 'token'

    Platform.findAll = jest.fn().mockResolvedValue([platform])
    PlatformUser.findAll = jest.fn().mockResolvedValue([])
    PlatformUser.create = jest.fn().mockResolvedValue(platformUser)

    jwt.sign = jest.fn().mockReturnValue(token)

    const res = await request(app)
      .get(`/api/v1/user/auth-checker?platformUUID=${platform.id}`)

    const expectedResult = {
      success: true,
      data: JSON.parse(JSON.stringify({
        token
      }))
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(200)
  })

  it('should handle error response when user is not logged in', async () => {
    const platformUUID = '1'

    const res = await request(app)
      .get(`/api/v1/user/auth-checker?platformUUID=${platformUUID}`)

    const expectedResult = {
      success: false,
      error: 'user is not logged in'
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(401)
  })

  it('should handle error response when platform not exists', async () => {
    // mock user logged in
    express.request.session = { userId: 1 }

    const platformUUID = '1'

    Platform.findAll = jest.fn().mockResolvedValue([])

    const res = await request(app)
      .get(`/api/v1/user/auth-checker?platformUUID=${platformUUID}`)

    const expectedResult = {
      success: false,
      error: `Platform not found with uuid ${platformUUID}`
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(400)
  })
})