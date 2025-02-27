import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Transaction from './transaction.js'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from './product.js'

export default class TransactionProduct extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare transactionId: number

  @belongsTo(() => Transaction)
  declare transaction: BelongsTo<typeof Transaction>

  @column()
  declare productId: number

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @column()
  declare quantity: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
