import request from 'supertest'
import app from '../../../app'
import Platform, { PlatformOutput } from '../../../database/models/platform.model'

jest.mock('ioredis')
jest.mock('sequelize')

describe('GetPlatform', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should handle the success response', async () => {
    const uuid = '1'
    const response: PlatformOutput = {
      id: 1,
      name: 'Test',
      url: 'url',
      logo: 'logo',
      uuid: '1',
      redirectUrl: 'redirectUrl',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date()
    }

    Platform.findAll = jest.fn().mockResolvedValue([response])

    const res = await request(app)
      .get(`/api/v1/platform/${uuid}`)

    const expectedResult = {
      success: true,
      data: JSON.parse(JSON.stringify(response))
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(200)
  })

  it('should handle the error response when platform not exists', async () => {
    const uuid = '1'
    const response: PlatformOutput[] = []

    Platform.findAll = jest.fn().mockResolvedValue(response)

    const res = await request(app)
      .get(`/api/v1/platform/${uuid}`)

    const expectedResult = {
      success: false,
      error: `Platform not found with uuid ${uuid}`
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(400)
  })
})