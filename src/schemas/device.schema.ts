import { TypeOf, object, string, array } from 'zod';

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

export const createDeviceSchema = object({
  ...payload
})
export const getDeviceSchema = object({
  ...params
})
export const updateDeviceSchema = object({
  ...params,
  ...payload
})
export const deleteDeviceSchema = object({
  ...params
})

export type CreateDeviceInput = TypeOf<typeof createDeviceSchema>;
export type GetDeviceInput = TypeOf<typeof getDeviceSchema>;
export type UpdateDeviceInput = TypeOf<typeof updateDeviceSchema>;
export type DeleteDeviceInput = TypeOf<typeof deleteDeviceSchema>;
