import Product from '#models/product'
import { createProductValidator, updateProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'
const admittedRoles = ['admin', 'manager', 'finance']

export default class ProductsController {
  /**
   * Display a list of resource
   */
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    if (admittedRoles.includes(user.role)) {
      const products = await Product.query()
      return products
    } else {
      return response.status(401).json({ error: 'Unauthorized' })
    }
  }

  async store({ request, auth, response }: HttpContext) {
    const user = auth.user!
    if (admittedRoles.includes(user.role)) {
      const { name, amount } = await request.validateUsing(createProductValidator)
      const product = await Product.create({ name, amount })
      return product
    } else {
      return response.status(401).json({ error: 'Unauthorized' })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, auth, response }: HttpContext) {
    try {
      const user = auth.user!
      if (admittedRoles.includes(user.role)) {
        const product = await Product.findByOrFail('id', params.id)
        return product
      } else {
        return response.status(401).json({ error: 'Unauthorized' })
      }
    } catch (error) {
      return response.status(400).json({ error: 'Product not found' })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, auth, request, response }: HttpContext) {
    const user = auth.user!
    if (admittedRoles.includes(user.role)) {
      const product = await Product.findBy('id', params.id)
      const { name, amount } = await request.validateUsing(updateProductValidator)
      product!.merge({ name, amount })
      await product!.save()
      return product
    } else {
      return response.status(401).json({ error: 'Unauthorized' })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, auth, response }: HttpContext) {
    try {
      const user = auth.user!
      if (admittedRoles.includes(user.role)) {
        const product = await Product.findByOrFail('id', params.id)
        await product.delete()
        return response.status(203)
      } else {
        return response.status(401).json({ error: 'Unauthorized' })
      }
    } catch (error) {
      return response.status(400).json({ error: 'Product not found' })
    }
  }
}
