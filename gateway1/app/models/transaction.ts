import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import Client from './client.js'
import { type HasOne, type BelongsTo, type ManyToMany } from '@adonisjs/lucid/types/relations'
import Gateway from './gateway.js'
import Product from './product.js'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare clientId: number

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @column()
  declare gatewayId: number

  @column()
  declare externalId: number | null

  @column()
  declare status: string

  @column()
  declare amount: number

  @column()
  declare cardLastNumbers: string

  @manyToMany(() => Product, {
    pivotTable: 'transaction_products',
  })
  declare products: ManyToMany<typeof Product>
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
