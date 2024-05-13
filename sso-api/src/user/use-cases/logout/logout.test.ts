import request from 'supertest'
import app from '../../../app'
import express from 'express'

jest.mock('sequelize')
jest.mock('ioredis')

describe('Logout', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    express.request.session = undefined
  })

  it('should handle the success response', async () => {
    express.request.session = {
      userId: 1,
      destroy: () => {
        express.request.session = undefined
      }
    }

    const res = await request(app)
      .post('/api/v1/user/logout')

    const expectedResult = {
      success: true,
      data: {
        isAuth: false
      }
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(200)
  })

  it('should handle the success response', async () => {
    express.request.session = {
      userId: 1
    }

    const res = await request(app)
      .post('/api/v1/user/logout')

    const expectedResult = {
      success: false,
      error: 'req.session.destroy is not a function'
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(400)
  })

  it('should handle the error response when user is not logged in', async () => {
    const res = await request(app)
      .post('/api/v1/user/logout')

    const expectedResult = {
      success: false,
      error: 'user is not logged in'
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(401)
  })
})