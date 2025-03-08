import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('client_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table
        .integer('gateway_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('gateways')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('external_id').nullable()
      table.string('status').notNullable().defaultTo('done')
      table.integer('amount').notNullable()
      table.integer('card_last_numbers').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
