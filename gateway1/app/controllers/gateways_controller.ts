import Gateway from '#models/gateway'
import { createGatewayValidator, updateGatewayValidator } from '#validators/gateway'
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
    const { name, priority } = await request.validateUsing(createGatewayValidator)
    const gateway = await Gateway.create({ name, priority })
    return gateway
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const gateway = await Gateway.findByOrFail('id', params.id)
      return gateway
    } catch (error) {
      return response.status(400).json('gateway not found')
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const gateway = await Gateway.findByOrFail('id', params.id)
      const { name, priority } = await request.validateUsing(updateGatewayValidator)
      gateway!.merge({ name, priority })
      await gateway!.save()
    } catch (error) {
      return response.status(400).json('gateway not found')
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const gateway = await Gateway.findByOrFail('id', params.id)
      await gateway!.delete()
      return response.status(203)
    } catch (error) {
      return response.status(400).json('gateway not found')
    }
  }
}
