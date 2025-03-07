import vine from '@vinejs/vine'
export const createGatewayValidator = vine.compile(
  vine.object({
    name: vine.string(),
    priority: vine.number(),
  })
)

export const updateGatewayValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    priority: vine.number().optional(),
  })
)
