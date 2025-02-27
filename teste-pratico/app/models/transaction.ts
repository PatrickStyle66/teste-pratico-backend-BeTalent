import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import Client from './client.js'
import { type HasOne, type BelongsTo } from '@adonisjs/lucid/types/relations'
import Gateway from './gateway.js'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare clientId: number

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @hasOne(() => Gateway)
  declare gateway_id: HasOne<typeof Gateway>

  @column()
  declare external_id: number | null

  @column()
  declare status: boolean

  @column()
  declare amount: number

  @column()
  declare card_last_numbers: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
