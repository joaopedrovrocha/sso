import request from 'supertest'
import express from 'express'
import { useGenerators } from '../../../utils/test.utils'
import { Customer, User } from '../../../database/models'
import app from '../../../app'

jest.mock('sequelize')
jest.mock('ioredis')

const {
  genUser,
  genCustomer,
} = useGenerators()

describe('Me', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    express.request.session = undefined
  })

  it('should handle the success response', async () => {
    const user = genUser()
    const customer = genCustomer(undefined, user.id)

    express.request.session = { userId: user.id }
    User.findByPk = jest.fn().mockResolvedValue(user)
    Customer.findAll = jest.fn().mockResolvedValue([customer])

    const res = await request(app)
      .get('/api/v1/user/me')

    const { password, ...userResponse } = JSON.parse(JSON.stringify(user))

    const expectedResult = {
      success: true,
      data: {
        user: userResponse,
        customer: JSON.parse(JSON.stringify(customer))
      }
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(200)
  })

  it('should handle the error success', async () => {
    express.request.session = { userId: 1 }
    User.findByPk = jest.fn().mockResolvedValue(null)

    const res = await request(app)
      .get('/api/v1/user/me')

    const expectedResult = {
      success: false,
      error: 'User not found with id 1'
    }

    expect(res.body).toEqual(expectedResult)
    expect(res.status).toEqual(400)
  })
})