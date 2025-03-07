import Gateway from '#models/gateway'
import { createGatewayValidator } from '#validators/gateway'
import type { HttpContext } from '@adonisjs/core/http'

export default class GatewaysController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const gateways = await Gateway.query()
    return gateways
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const { name, isActive, priority } = await request.validateUsing(createGatewayValidator)
    const gateway = await Gateway.create({ name, isActive, priority })
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
