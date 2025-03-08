import Product from '#models/product'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        name: 'Máscara de pedra',
        amount: 1240,
      },
      {
        name: 'Pedra de aja',
        amount: 15900,
      },
      {
        name: 'Flecha requiem',
        amount: 124000,
      },
    ])
  }
}