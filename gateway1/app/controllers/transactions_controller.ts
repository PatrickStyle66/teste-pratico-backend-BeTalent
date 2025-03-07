import Transaction from '#models/transaction'
import type { HttpContext } from '@adonisjs/core/http'
const admittedRoles = ['admin', 'finance']

export default class TransactionsController {
  /**
   * Display a list of resource
   */
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    if (admittedRoles.includes(user.role)) {
      const users = await Transaction.query().preload('client')
      return users
    } else {
      return response.status(401).json({ error: 'Unauthorized' })
    }
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

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