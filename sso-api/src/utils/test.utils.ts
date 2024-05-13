import { faker } from '@faker-js/faker'

function genPlatform(id?: number) {
  return {
    id: id ? id : faker.number.int(),
    name: faker.person.fullName(),
    url: faker.internet.url(),
    logo: faker.internet.url(),
    uuid: faker.string.uuid(),
    redirectUrl: faker.internet.url(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date()
  }
}

function genPlatformUser(id?: number, platformId?: number, userId?: number) {
  return {
    id: id ? id : faker.number.int(),
    platformId: platformId ? platformId : faker.number.int(),
    userId: userId ? userId : faker.number.int(),
    validationToken: faker.string.alphanumeric(),
    tokenExpiresAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  }
}

function genUser(id?: number) {
  return {
    id: id ? id : faker.number.int(),
    username: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  }
}

function genCustomer(id?: number, userId?: number) {
  return {
    id: id ? id : faker.number.int(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    phoneNumber: faker.phone.number(),
    userId: userId ? userId : faker.number.int(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  }
}

export function useGenerators() {
  return {
    genPlatform,
    genPlatformUser,
    genUser,
    genCustomer
  }
}