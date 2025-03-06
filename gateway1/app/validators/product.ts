import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string(),
    amount: vine.number(),
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    amount: vine.number().optional(),
  })
)
