import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        email: 'admin@gmail.com',
        password: '123456',
        role: 'admin',
      },
      {
        email: 'manager@gmail.com',
        password: '123456',
        role: 'manager',
      },
      {
        email: 'finance@gmail.com',
        password: '123456',
        role: 'finance',
      },
    ])
  }
}
