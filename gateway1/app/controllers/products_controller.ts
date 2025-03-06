import Product from '#models/product'
import { createProductValidator, updateProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  /**
   * Display a list of resource
   */
  async index() {
    const products = await Product.query()
    return products
  }

  async store({ request }: HttpContext) {
    const { name, amount } = await request.validateUsing(createProductValidator)
    const product = await Product.create({ name, amount })
    return product
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const product = await Product.findByOrFail('id', params.id)
      return product
    } catch (error) {
      return response.status(400).json({ error: 'Product not found' })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const product = await Product.findBy('id', params.id)
    const { name, amount } = await request.validateUsing(updateProductValidator)
    product!.merge({ name, amount })
    await product!.save()
    return product
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const product = await Product.findByOrFail('id', params.id)
      await product.delete()
      return response.status(203)
    } catch (error) {
      return response.status(400).json({ error: 'Product not found' })
    }
  }
}
