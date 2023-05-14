import { TypeOf, object, string } from 'zod';

const params = {
  params: object({
    id: string({
      required_error: 'Id is required',
    }),
  }),
}

const payload = {
  body: object({
    name: string({
      required_error: 'Name is required',
    })
  })
}

export const createWarehouseSchema = object({
  ...payload
})

export const updateWarehouseSchema = object({
  ...params,
  ...payload
})

export const getWarehouseSchema = object({
  ...params
})

export const deleteWarehouseSchema = object({
  ...params
})

export type CreateWarehouseInput = TypeOf<typeof createWarehouseSchema>;
export type UpdateWarehouseInput = TypeOf<typeof updateWarehouseSchema>;
export type GetWarehouseInput = TypeOf<typeof getWarehouseSchema>;
export type DeleteWarehouseInput = TypeOf<typeof deleteWarehouseSchema>;