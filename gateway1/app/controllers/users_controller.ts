import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
export default class UsersController {
  /**
   * Display a list of resource
   */
  async index() {
    const users = await User.query().preload('client')
    return users
  }

  /**
   * Display form to create a new record
   */
  async store({ request }: HttpContext) {
    const { name, email, password } = await request.validateUsing(createUserValidator)
    const user = await User.create({ email, password })
    await user.related('client').create({ name, email })
    return user
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const user = await User.findByOrFail('id', params.id)
      await user.load('client')
      return user
    } catch (error) {
      return response.status(400).json({ error: 'User not found' })
    }
  }

  /**
   * Edit individual record
   */

  async update({ params, request, auth, response }: HttpContext) {
    const wantedUser = await User.findBy('id', params.id)
    const user = auth.user!
    if (user.id !== wantedUser!.id) {
      return response.status(401).json({ error: 'Unauthorized' })
    }
    const { email, password } = await request.validateUsing(updateUserValidator)
    wantedUser!.merge({ email, password })
    await wantedUser!.save()
    return wantedUser
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findByOrFail('id', params.id)
      await user.delete()
      return response.status(203)
    } catch (error) {
      return response.status(400).json({ error: 'User not found' })
    }
  }
}
