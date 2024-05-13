import request from 'supertest'
import app from '../../../app'
import Platform, { PlatformInput } from '../../../database/models/platform.model'

jest.mock('ioredis')
jest.mock('sequelize')

describe('CreatePlatform', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should handle the success response', async () => {
    const payload: PlatformInput = {
      redirectUrl: 'http://url.com',
      logo: 'logo',
      name: 'name',
      url: 'http://url.com',
      uuid: 'uuid'
    }

    const response = {
      id: 1,
      redirectUrl: 'http://url.com',
      logo: 'logo',
      name: 'name',
      url: 'http://url.com',
      uuid: 'uuid',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date()
    }

    Platform.create = jest.fn().mockResolvedValue(response)

    const res = await request(app)
      .post(`/api/v1/platform`)
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    const expectedResult = {
      success: true,
      data: JSON.parse(JSON.stringify(response))
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(200)
  })

  it('should handle the error response when missing properties', async () => {
    const payload: Partial<PlatformInput> = {
      logo: 'logo',
      name: 'name',
      url: 'http://url.com',
    }

    const res = await request(app)
      .post(`/api/v1/platform`)
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    const expectedResult = {
      success: false,
      error: `redirectUrl is required`
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(400)
  })

  it('should handle the error response when something wrong', async () => {
    const payload: Partial<PlatformInput> = {
      redirectUrl: 'http://url.com',
      logo: 'logo',
      name: 'name',
      url: 'http://url.com',
      uuid: 'uuid'
    }

    Platform.create = jest.fn().mockRejectedValue(new Error('error 500'))

    const res = await request(app)
      .post(`/api/v1/platform`)
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    const expectedResult = {
      success: false,
      error: `error 500`
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(400)
  })
})