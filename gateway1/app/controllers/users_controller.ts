import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
const admittedRoles = ['admin', 'manager']

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    if (admittedRoles.includes(user.role)) {
      const users = await User.query().preload('client')
      return users
    } else {
      return response.status(401).json({ error: 'Unauthorized' })
    }
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
  async show({ params, response, auth }: HttpContext) {
    try {
      const user = auth.user!
      if (admittedRoles.includes(user.role)) {
        const wantedUser = await User.findByOrFail('id', params.id)
        await wantedUser.load('client')
        return wantedUser
      } else {
        return response.status(401).json({ error: 'Unauthorized' })
      }
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
    if (admittedRoles.includes(user.role) || user.id === wantedUser!.id) {
      const { email, password } = await request.validateUsing(updateUserValidator)
      wantedUser!.merge({ email, password })
      await wantedUser!.save()
      return wantedUser
    } else {
      return response.status(401).json({ error: 'Unauthorized' })
    }
  }

  async role({ params, request, auth, response }: HttpContext) {
    try {
      const wantedUser = await User.findBy('id', params.id)
      const user = auth.user!
      if (user.role === 'admin') {
        const { role } = request.body()
        wantedUser!.merge({ role })
        await wantedUser!.save()
        return { role }
      } else {
        return response.status(401).json({ error: 'Unauthorized' })
      }
    } catch (error) {
      return response.status(400).json({ error: 'User not found' })
    }
  }
  /**
   * Delete record
   */
  async destroy({ params, response, auth }: HttpContext) {
    try {
      const wantedUser = await User.findBy('id', params.id)
      const user = auth.user!
      if (admittedRoles.includes(user.role) || user.id === wantedUser!.id) {
        await wantedUser!.delete()
        return response.status(203)
      }
    } catch (error) {
      return response.status(400).json({ error: 'User not found' })
    }
  }
}
