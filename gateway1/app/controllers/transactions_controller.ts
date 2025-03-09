import Transaction from '#models/transaction'
import Product from '#models/product'
import Client from '#models/client'
import Gateway from '#models/gateway'
import type { HttpContext } from '@adonisjs/core/http'
const admittedRoles = ['admin', 'finance']

export default class TransactionsController {
  /**
   * Display a list of resource
   */
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    if (admittedRoles.includes(user.role)) {
      const transaction = await Transaction.query()
      return transaction
    } else {
      return response.status(401).json({ error: 'Unauthorized' })
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { name, email, cardNumber, cvv, products } = await request.body()
    if (cvv === '100' || cvv === '200') {
      return response.status(400).json({ error: 'Invalid Card' })
    }
    var client = new Client()
    try {
      client = await Client.findByOrFail('email', email)
    } catch (error) {
      client = await Client.create({ name, email })
    }
    const cardLastNumbers = cardNumber.slice(-4)
    const transaction = await Transaction.create({
      cardLastNumbers,
      clientId: client.id,
      gatewayId: 1,
    })
    var value = 0
    try {
      for (const product of products) {
        const foundProduct = await Product.findByOrFail('id', product)
        value += foundProduct.amount
        await transaction.related('products').attach([foundProduct.id])
      }
      transaction.amount = value
      await transaction.save()
      return transaction
    } catch (error) {
      console.log(error)
      return response.status(404).json({ error: 'Product not found' })
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
