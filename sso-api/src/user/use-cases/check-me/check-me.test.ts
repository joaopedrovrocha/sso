import request from 'supertest'
import { useGenerators } from '../../../utils/test.utils'
import app from '../../../app'
import { User } from '../../../database/models'
import { CheckMeService } from './check-me.service'

jest.mock('sequelize')
jest.mock('ioredis')

const { genUser } = useGenerators()

describe('CheckMe', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should handle the success response is user', async () => {
    const user = genUser()

    const payload = {
      username: user.username
    }

    User.findAll = jest.fn().mockResolvedValue([user])

    const res = await request(app)
      .post('/api/v1/user/check-me')
      .send(payload)

    const expectedResult = {
      success: true,
      data: {
        isUser: true
      }
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(200)
  })

  it('should handle the success response is not user', async () => {
    const payload = {
      username: 'username@test.com'
    }

    User.findAll = jest.fn().mockResolvedValue([])

    const res = await request(app)
      .post('/api/v1/user/check-me')
      .send(payload)

    const expectedResult = {
      success: true,
      data: {
        isUser: false
      }
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(200)
  })

  it('should handle the error response when not body correct provided', async () => {
    const payload = {}

    User.findAll = jest.fn().mockResolvedValue([])

    const res = await request(app)
      .post('/api/v1/user/check-me')
      .send(payload)

    const expectedResult = {
      success: false,
      error: 'username is required'
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(400)
  })

  it('should handle the error response when not username is not an email', async () => {
    const payload = {
      username: 'username'
    }

    User.findAll = jest.fn().mockResolvedValue([])

    const res = await request(app)
      .post('/api/v1/user/check-me')
      .send(payload)

    const expectedResult = {
      success: false,
      error: 'invalid email'
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(400)
  })
})