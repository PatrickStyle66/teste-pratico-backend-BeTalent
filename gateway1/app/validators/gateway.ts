import vine from '@vinejs/vine'
export const createGatewayValidator = vine.compile(
  vine.object({
    name: vine.string(),
    isActive: vine.boolean(),
    priority: vine.number(),
  })
)
