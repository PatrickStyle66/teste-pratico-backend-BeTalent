import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Display form to create a new record
   */
  async store({ request }: HttpContext) {
    const { email, password } = request.body()
    console.log(email, password)
    const user = await User.create({ email, password })
    return user
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */

  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
